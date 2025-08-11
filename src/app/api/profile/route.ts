import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { updateProfileSchema } from "@/lib/validations";
import {
  validateRequest,
  createValidationErrorResponse,
  createSuccessResponse,
} from "@/lib/validation-utils";
import { getAccessTokenFromCookies, verifyAccessToken } from "@/lib/jwt";

export async function PUT(request: NextRequest) {
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

    // Validar dados de entrada
    const validation = await validateRequest(updateProfileSchema, request);
    if (!validation.success) {
      return createValidationErrorResponse(validation.errors);
    }

    const { name, phone, address, cep, city, state, birthDate } =
      validation.data;

    // Atualizar usuário e perfil do cliente
    const updatedUser = await prisma.user.update({
      where: { id: payload.userId },
      data: {
        name,
        customer: {
          upsert: {
            create: {
              phone,
              address,
              cep,
              city,
              state,
              birthDate: birthDate ? new Date(birthDate) : null,
            },
            update: {
              phone,
              address,
              cep,
              city,
              state,
              birthDate: birthDate ? new Date(birthDate) : null,
            },
          },
        },
      },
      include: {
        customer: true,
        admin: true,
      },
    });

    return createSuccessResponse(
      {
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          name: updatedUser.name,
          role: updatedUser.role,
          customer: updatedUser.customer,
          admin: updatedUser.admin,
        },
      },
      "Perfil atualizado com sucesso"
    );
  } catch (error) {
    // Corrige possíveis erros de referência a File (ex: ReferenceError: File is not defined)
    if (
      error instanceof ReferenceError &&
      typeof (error as any).message === "string" &&
      (error as any).message.includes("File is not defined")
    ) {
      console.error("Erro de referência a File:", error);
      return createValidationErrorResponse([
        "Erro interno: recurso de arquivo não suportado neste endpoint.",
      ]);
    }
    console.error("Erro ao atualizar perfil:", error);
    return createValidationErrorResponse(["Erro interno do servidor"]);
  }
}
