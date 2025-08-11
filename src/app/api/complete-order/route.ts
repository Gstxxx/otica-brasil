import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { completeCustomerRegistrationSchema } from "@/lib/validations";
import {
  validateInput,
  createValidationErrorResponse,
  createSuccessResponse,
} from "@/lib/validation-utils";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import type { CompleteCustomerRegistrationInput } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("=== DEBUG: Body recebido ===");
    console.log(JSON.stringify(body, null, 2));
    const { customer, selectedLenses, files } = body;

    // Validar dados do cliente
    console.log("=== DEBUG: Validando customer ===");
    console.log(JSON.stringify(customer, null, 2));
    const validation = await validateInput(
      completeCustomerRegistrationSchema,
      customer
    );
    console.log("=== DEBUG: Resultado da validação ===");
    console.log(JSON.stringify(validation, null, 2));
    if (!validation.success) {
      console.log("=== DEBUG: Validação falhou ===");
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

    // Validar arquivos obrigatórios (agora são objetos com URL)
    if (!files?.glassesPhoto?.url || !files?.prescriptionPhoto?.url) {
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
    console.log("=== DEBUG: Buscando lentes ===");
    console.log("IDs solicitados:", selectedLenses);
    const lensTypes = await prisma.lensType.findMany({
      where: { id: { in: selectedLenses } },
    });
    console.log(
      "Lentes encontradas:",
      lensTypes.map((l) => ({ id: l.id, name: l.name }))
    );

    if (lensTypes.length !== selectedLenses.length) {
      console.log("=== DEBUG: Lentes não encontradas ===");
      const foundIds = lensTypes.map((l) => l.id);
      const missingIds = selectedLenses.filter((id) => !foundIds.includes(id));
      console.log("IDs não encontrados:", missingIds);
      return createValidationErrorResponse([
        `Um ou mais tipos de lente não encontrados: ${missingIds.join(", ")}`,
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

      // 6. Criar anexos com URLs reais dos arquivos
      const attachments = [];

      if (files?.glassesPhoto?.url) {
        attachments.push(
          tx.orderAttachment.create({
            data: {
              orderId: order.id,
              type: "GLASSES_PHOTO",
              fileName: files.glassesPhoto.originalName || "glasses.jpg",
              fileUrl: files.glassesPhoto.url,
              fileSize: files.glassesPhoto.size || 0,
              mimeType: files.glassesPhoto.type || "image/jpeg",
            },
          })
        );
      }

      if (files?.prescriptionPhoto?.url) {
        attachments.push(
          tx.orderAttachment.create({
            data: {
              orderId: order.id,
              type: "PRESCRIPTION_PHOTO",
              fileName:
                files.prescriptionPhoto.originalName || "prescription.jpg",
              fileUrl: files.prescriptionPhoto.url,
              fileSize: files.prescriptionPhoto.size || 0,
              mimeType: files.prescriptionPhoto.type || "image/jpeg",
            },
          })
        );
      }

      if (files?.identityDocument?.url) {
        attachments.push(
          tx.orderAttachment.create({
            data: {
              orderId: order.id,
              type: "IDENTITY_DOCUMENT",
              fileName: files.identityDocument.originalName || "identity.jpg",
              fileUrl: files.identityDocument.url,
              fileSize: files.identityDocument.size || 0,
              mimeType: files.identityDocument.type || "image/jpeg",
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
