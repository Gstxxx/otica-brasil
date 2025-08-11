import { prisma } from "@/lib/prisma";
import {
  getRefreshTokenFromCookies,
  verifyRefreshToken,
  createAccessToken,
  createRefreshToken,
  setAuthCookies,
  generateTokenId,
} from "@/lib/jwt";
import {
  createValidationErrorResponse,
  createSuccessResponse,
} from "@/lib/validation-utils";

export async function POST() {
  try {
    // Obter refresh token dos cookies
    const refreshToken = await getRefreshTokenFromCookies();

    if (!refreshToken) {
      return createValidationErrorResponse(["Refresh token não encontrado"]);
    }

    // Verificar refresh token
    const refreshPayload = await verifyRefreshToken(refreshToken);

    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { id: refreshPayload.userId },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return createValidationErrorResponse(["Usuário não encontrado"]);
    }

    // Gerar novos tokens
    const newAccessToken = await createAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const newRefreshToken = await createRefreshToken({
      userId: user.id,
      tokenId: generateTokenId(),
    });

    // Definir novos cookies
    await setAuthCookies(newAccessToken, newRefreshToken);

    return createSuccessResponse({
      message: "Tokens renovados com sucesso",
    });
  } catch (error) {
    console.error("Erro ao renovar tokens:", error);
    return createValidationErrorResponse(["Token inválido"]);
  }
}
