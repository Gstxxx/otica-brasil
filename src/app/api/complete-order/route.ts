import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { completeCustomerRegistrationSchema } from "@/lib/validations";
import {
  validateRequest,
  createValidationErrorResponse,
  createSuccessResponse,
} from "@/lib/validation-utils";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import type { CompleteCustomerRegistrationInput } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer, selectedLenses, files } = body;

    // Validar dados do cliente
    const validation = await validateRequest(
      completeCustomerRegistrationSchema,
      customer
    );
    if (!validation.success) {
      return createValidationErrorResponse(validation.errors);
    }

    const customerData = validation.data;

    // Validar lentes selecionadas
    if (
      !selectedLenses ||
      !Array.isArray(selectedLenses) ||
      selectedLenses.length === 0
    ) {
      return createValidationErrorResponse([
        "Selecione pelo menos um tipo de lente",
      ]);
    }

    // Validar arquivos obrigatórios
    if (!files.glassesPhoto || !files.prescriptionPhoto) {
      return createValidationErrorResponse([
        "Foto dos óculos e prescrição são obrigatórias",
      ]);
    }

    // Verificar se o email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: customerData.email },
    });

    if (existingUser) {
      return createValidationErrorResponse([
        "Email já cadastrado. Faça login para continuar.",
      ]);
    }

    // Buscar tipos de lentes
    const lensTypes = await prisma.lensType.findMany({
      where: { id: { in: selectedLenses } },
    });

    if (lensTypes.length !== selectedLenses.length) {
      return createValidationErrorResponse([
        "Um ou mais tipos de lente não encontrados",
      ]);
    }

    // Calcular valor total
    const totalAmount = lensTypes.reduce((total, lens) => {
      return total + lens.basePrice.toNumber();
    }, 0);

    // Criar usuário, cliente e pedido em uma transação
    const result = await prisma.$transaction(async (tx) => {
      // Gerar senha temporária
      const tempPassword = crypto.randomBytes(8).toString("hex");
      const hashedPassword = await bcrypt.hash(tempPassword, 12);

      // 1. Criar usuário
      const user = await tx.user.create({
        data: {
          email: customerData.email,
          name: customerData.name,
          password: hashedPassword,
          role: "CUSTOMER",
        },
      });

      // 2. Criar cliente
      const customer = await tx.customer.create({
        data: {
          userId: user.id,
          phone: customerData.phone,
          address: customerData.address,
          cep: customerData.cep,
          city: customerData.city,
          state: customerData.state,
          birthDate: customerData.birthDate
            ? new Date(customerData.birthDate)
            : null,
        },
      });

      // 3. Criar pedido
      const order = await tx.order.create({
        data: {
          customerId: customer.id,
          totalAmount,
          status: "PENDING",
          notes: `Pedido criado via formulário web. Cliente: ${customerData.name}`,
        },
      });

      // 4. Criar itens do pedido
      const orderItems = await Promise.all(
        selectedLenses.map((lensTypeId) =>
          tx.orderItem.create({
            data: {
              orderId: order.id,
              lensTypeId,
              quantity: 1,
              price: lensTypes.find((l) => l.id === lensTypeId)!.basePrice,
            },
          })
        )
      );

      // 5. Criar tracking inicial
      await tx.tracking.create({
        data: {
          orderId: order.id,
          status: "ORDER_PLACED",
          description: "Pedido realizado com sucesso via formulário web",
        },
      });

      // 6. Criar anexos (simulado - em produção você faria upload real)
      const attachments = [];

      if (files.glassesPhoto) {
        attachments.push(
          tx.orderAttachment.create({
            data: {
              orderId: order.id,
              type: "GLASSES_PHOTO",
              fileName: files.glassesPhoto.name,
              fileUrl: `/uploads/glasses-${order.id}.jpg`, // Simulado
              fileSize: files.glassesPhoto.size,
              mimeType: files.glassesPhoto.type,
            },
          })
        );
      }

      if (files.prescriptionPhoto) {
        attachments.push(
          tx.orderAttachment.create({
            data: {
              orderId: order.id,
              type: "PRESCRIPTION_PHOTO",
              fileName: files.prescriptionPhoto.name,
              fileUrl: `/uploads/prescription-${order.id}.jpg`, // Simulado
              fileSize: files.prescriptionPhoto.size,
              mimeType: files.prescriptionPhoto.type,
            },
          })
        );
      }

      if (files.identityDocument) {
        attachments.push(
          tx.orderAttachment.create({
            data: {
              orderId: order.id,
              type: "IDENTITY_DOCUMENT",
              fileName: files.identityDocument.name,
              fileUrl: `/uploads/identity-${order.id}.jpg`, // Simulado
              fileSize: files.identityDocument.size,
              mimeType: files.identityDocument.type,
            },
          })
        );
      }

      await Promise.all(attachments);

      return {
        user,
        customer,
        order,
        orderItems,
        totalAmount: totalAmount,
        tempPassword,
      };
    });

    // Buscar dados completos do pedido
    const orderWithDetails = await prisma.order.findUnique({
      where: { id: result.order.id },
      include: {
        customer: {
          include: { user: true },
        },
        orderItems: {
          include: { lensType: true },
        },
        tracking: true,
        attachments: true,
      },
    });

    return createSuccessResponse({
      order: orderWithDetails,
      tempPassword: result.tempPassword,
      message:
        "Pedido criado com sucesso! Use a senha temporária fornecida para fazer login.",
    });
  } catch (error) {
    console.error("Erro ao criar pedido completo:", error);
    return createValidationErrorResponse(["Erro interno do servidor"]);
  }
}
