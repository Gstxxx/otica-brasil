import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { changePasswordSchema } from "@/lib/validations";
import {
  validateRequest,
  createValidationErrorResponse,
  createSuccessResponse,
} from "@/lib/validation-utils";
import { getAccessTokenFromCookies, verifyAccessToken } from "@/lib/jwt";
import bcrypt from "bcryptjs";

// Função auxiliar para processar a alteração de senha
async function processChangePassword(request: NextRequest) {
  // Verificar autenticação
  const accessToken = await getAccessTokenFromCookies();
  if (!accessToken) {
    return createValidationErrorResponse(["Token não encontrado"]);
  }

  const payload = await verifyAccessToken(accessToken);
  if (!payload) {
    return createValidationErrorResponse(["Token inválido"]);
  }

  // Validar dados da requisição
  const validation = await validateRequest(changePasswordSchema, request);
  if (!validation.success) {
    return createValidationErrorResponse(validation.errors);
  }

  const { currentPassword, newPassword } = validation.data;

  // Buscar usuário
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user) {
    return createValidationErrorResponse(["Usuário não encontrado"]);
  }

  // Verificar senha atual
  const isCurrentPasswordValid = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!isCurrentPasswordValid) {
    return createValidationErrorResponse(["Senha atual incorreta"]);
  }

  // Hash da nova senha
  const hashedNewPassword = await bcrypt.hash(newPassword, 12);

  // Atualizar senha
  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedNewPassword },
  });

  return createSuccessResponse(null, "Senha alterada com sucesso");
}

export async function POST(request: NextRequest) {
  try {
    return await processChangePassword(request);
  } catch (error) {
    console.error("Erro ao alterar senha:", error);
    return createValidationErrorResponse(["Erro interno do servidor"]);
  }
}
