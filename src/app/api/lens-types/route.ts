import { prisma } from "@/lib/prisma";
import {
  createSuccessResponse,
  createValidationErrorResponse,
} from "@/lib/validation-utils";

export async function GET() {
  try {
    // Buscar tipos de lentes ativos
    const lensTypes = await prisma.lensType.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return createSuccessResponse({
      lensTypes,
      total: lensTypes.length,
    });
  } catch (error) {
    console.error("Erro ao buscar tipos de lentes:", error);
    return createValidationErrorResponse(["Erro interno do servidor"]);
  }
}
