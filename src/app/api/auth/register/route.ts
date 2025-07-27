import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";
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
    const validation = await validateRequest(registerSchema, request);

    if (!validation.success) {
      return createValidationErrorResponse(validation.errors);
    }

    const { email, password, name, phone, address } = validation.data;

    // Verificar se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return createValidationErrorResponse(["Email já está em uso"]);
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 12);

    // Criar usuário
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: "CUSTOMER", // Por padrão, novos usuários são clientes
        customer: {
          create: {
            phone,
            address,
          },
        },
      },
      include: {
        customer: true,
        admin: true,
      },
    });

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
      message: "Usuário registrado com sucesso",
    });
  } catch (error) {
    console.error("Erro no registro:", error);
    return createValidationErrorResponse(["Erro interno do servidor"]);
  }
}
