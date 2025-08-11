import { clearAuthCookies } from "@/lib/jwt";
import { createSuccessResponse } from "@/lib/validation-utils";

export async function POST() {
  try {
    // Limpar cookies de autenticação
    await clearAuthCookies();

    return createSuccessResponse({
      message: "Logout realizado com sucesso",
    });
  } catch (error) {
    console.error("Erro no logout:", error);
    return createSuccessResponse({
      message: "Logout realizado com sucesso",
    });
  }
}
