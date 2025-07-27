import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import {
  validateRequest,
  createValidationErrorResponse,
  createSuccessResponse,
} from "@/lib/validation-utils";
import { getAccessTokenFromCookies, verifyAccessToken } from "@/lib/jwt";

const updateStatusSchema = z.object({
  status: z.enum([
    "PENDING",
    "CONFIRMED",
    "GLASSES_RECEIVED",
    "LENSES_IN_PRODUCTION",
    "READY_FOR_DELIVERY",
    "DELIVERED",
    "CANCELLED",
  ]),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verificar autenticação
    const accessToken = await getAccessTokenFromCookies();
    if (!accessToken) {
      return createValidationErrorResponse(["Token não encontrado"]);
    }
    const payload = await verifyAccessToken(accessToken);
    if (!payload) {
      return createValidationErrorResponse(["Token inválido"]);
    }

    // Verificar se é admin
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: { admin: true },
    });

    if (!user || !user.admin) {
      return createValidationErrorResponse([
        "Acesso negado. Apenas administradores podem atualizar status.",
      ]);
    }

    // Validar dados de entrada
    const validation = await validateRequest(updateStatusSchema, request);
    if (!validation.success) {
      return createValidationErrorResponse(validation.errors);
    }

    const { status } = validation.data;
    const { id: orderId } = await params;

    // Verificar se o pedido existe
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!existingOrder) {
      return createValidationErrorResponse(["Pedido não encontrado"]);
    }

    // Atualizar status do pedido
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: {
        customer: {
          include: {
            user: true,
          },
        },
        orderItems: {
          include: {
            lensType: true,
          },
        },
        tracking: true,
      },
    });

    // Adicionar entrada no tracking
    const statusDescriptions = {
      PENDING: "Pedido recebido e aguardando processamento",
      CONFIRMED: "Pedido confirmado",
      GLASSES_RECEIVED: "Óculos recebidos",
      LENSES_IN_PRODUCTION: "Lentes em produção",
      READY_FOR_DELIVERY: "Pronto para entrega",
      DELIVERED: "Pedido entregue",
      CANCELLED: "Pedido cancelado",
    };

    await prisma.tracking.create({
      data: {
        orderId: orderId,
        status: "ORDER_PLACED", // Usar TrackingStatus padrão
        description: statusDescriptions[status],
      },
    });

    return createSuccessResponse(
      {
        order: updatedOrder,
      },
      "Status do pedido atualizado com sucesso"
    );
  } catch (error) {
    console.error("Erro ao atualizar status do pedido:", error);
    return createValidationErrorResponse(["Erro interno do servidor"]);
  }
}
