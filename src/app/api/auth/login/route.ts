import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validations";
import {
  validateRequest,
  createValidationErrorResponse,
  createSuccessResponse,
} from "@/lib/validation-utils";
import {
  createAccessToken,
  createRefreshToken,
  setAuthCookies,
  generateTokenId,
} from "@/lib/jwt";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const validation = await validateRequest(loginSchema, request);

    if (!validation.success) {
      return createValidationErrorResponse(validation.errors);
    }

    const { email, password } = validation.data;

    // Buscar usuário pelo email
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        customer: true,
        admin: true,
      },
    });

    if (!user) {
      return createValidationErrorResponse(["Email ou senha inválidos"]);
    }

    // Verificar senha usando bcrypt
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return createValidationErrorResponse(["Email ou senha inválidos"]);
    }

    // Gerar tokens
    const accessToken = await createAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = await createRefreshToken({
      userId: user.id,
      tokenId: generateTokenId(),
    });

    // Definir cookies
    await setAuthCookies(accessToken, refreshToken);

    // Retornar dados do usuário (sem senha)
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      customer: user.customer,
      admin: user.admin,
    };

    return createSuccessResponse({
      user: userData,
      message: "Login realizado com sucesso",
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return createValidationErrorResponse(["Erro interno do servidor"]);
  }
}
