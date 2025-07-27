import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createOrderSchema } from "@/lib/validations";
import {
  validateRequest,
  createValidationErrorResponse,
  createSuccessResponse,
} from "@/lib/validation-utils";
import type { CreateOrderInput } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const validation = await validateRequest(createOrderSchema, request);

    if (!validation.success) {
      return createValidationErrorResponse(validation.errors);
    }

    const { customerId, lensTypeIds, notes } = validation.data;

    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      include: { user: true },
    });

    if (!customer) {
      return createValidationErrorResponse(["Cliente não encontrado"]);
    }

    const lensTypes = await prisma.lensType.findMany({
      where: { id: { in: lensTypeIds } },
    });

    if (lensTypes.length !== lensTypeIds.length) {
      return createValidationErrorResponse([
        "Um ou mais tipos de lente não encontrados",
      ]);
    }

    // Calcular valor total
    const totalAmount = lensTypes.reduce((total, lens) => {
      return total + lens.basePrice.toNumber();
    }, 0);

    // Criar pedido com transação
    const order = await prisma.$transaction(async (tx) => {
      // Criar o pedido
      const newOrder = await tx.order.create({
        data: {
          customerId,
          totalAmount,
          notes,
          status: "PENDING",
        },
      });

      // Criar itens do pedido
      const orderItems = await Promise.all(
        lensTypeIds.map((lensTypeId) =>
          tx.orderItem.create({
            data: {
              orderId: newOrder.id,
              lensTypeId,
              quantity: 1,
              price: lensTypes.find((l) => l.id === lensTypeId)!.basePrice,
            },
          })
        )
      );

      // Criar primeiro tracking
      await tx.tracking.create({
        data: {
          orderId: newOrder.id,
          status: "ORDER_PLACED",
          description: "Pedido realizado com sucesso",
        },
      });

      return newOrder;
    });

    // Buscar pedido completo para retorno
    const orderWithDetails = await prisma.order.findUnique({
      where: { id: order.id },
      include: {
        customer: {
          include: { user: true },
        },
        orderItems: {
          include: { lensType: true },
        },
        tracking: true,
      },
    });

    return createSuccessResponse(orderWithDetails, "Pedido criado com sucesso");
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    return createValidationErrorResponse(["Erro interno do servidor"]);
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parâmetros de busca
    const status = searchParams.get("status");
    const customerId = searchParams.get("customerId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // Construir filtros
    const where: Record<string, unknown> = {};

    if (status) {
      where.status = status;
    }

    if (customerId) {
      where.customerId = customerId;
    }

    // Buscar pedidos
    const orders = await prisma.order.findMany({
      where,
      include: {
        customer: {
          include: { user: true },
        },
        orderItems: {
          include: { lensType: true },
        },
        tracking: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Contar total
    const total = await prisma.order.count({ where });

    return createSuccessResponse({
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    return createValidationErrorResponse(["Erro interno do servidor"]);
  }
}
