import { prisma } from "@/lib/prisma";
import { getAccessTokenFromCookies, verifyAccessToken } from "@/lib/jwt";
import {
  createValidationErrorResponse,
  createSuccessResponse,
} from "@/lib/validation-utils";

export async function GET() {
  try {
    // Obter access token dos cookies
    const accessToken = await getAccessTokenFromCookies();

    if (!accessToken) {
      return createValidationErrorResponse(["Token não encontrado"]);
    }

    // Verificar access token
    const payload = await verifyAccessToken(accessToken);

    // Buscar usuário com dados relacionados
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        customer: true,
        admin: true,
      },
    });

    if (!user) {
      return createValidationErrorResponse(["Usuário não encontrado"]);
    }

    // Retornar dados do usuário (sem senha)
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      customer: user.customer,
      admin: user.admin,
    };

    console.log("🔍 API /me: Retornando dados do usuário:", userData);

    return createSuccessResponse({
      user: userData,
    });
  } catch (error) {
    console.error("Erro ao obter dados do usuário:", error);
    return createValidationErrorResponse(["Token inválido"]);
  }
}
