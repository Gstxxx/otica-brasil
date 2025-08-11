import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validations";
import {
  validateInput,
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
    const body = await request.json();
    const validation = await validateInput(loginSchema, body);

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
    const response = createSuccessResponse({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        customer: user.customer,
        admin: user.admin,
      },
      message: "Login realizado com sucesso",
    });

    // Definir cookies na resposta
    await setAuthCookies(accessToken, refreshToken);

    return response;
  } catch (error) {
    console.error("Erro no login:", error);
    return createValidationErrorResponse(["Erro interno do servidor"]);
  }
}
