import { NextRequest } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import {
  createSuccessResponse,
  createValidationErrorResponse,
} from "@/lib/validation-utils";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type") as string; // glasses, prescription, identity

    if (!file) {
      return createValidationErrorResponse(["Nenhum arquivo enviado"]);
    }

    if (!type) {
      return createValidationErrorResponse([
        "Tipo de arquivo não especificado",
      ]);
    }

    // Validar tipo de arquivo
    if (!file.type.startsWith("image/")) {
      return createValidationErrorResponse(["Apenas imagens são permitidas"]);
    }

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return createValidationErrorResponse([
        "Arquivo muito grande. Máximo 5MB",
      ]);
    }

    // Gerar nome único para o arquivo
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split(".").pop() || "jpg";
    const fileName = `${type}_${timestamp}_${randomString}.${extension}`;

    // Caminho para salvar o arquivo
    const uploadDir = join(process.cwd(), "public", "images");
    const filePath = join(uploadDir, fileName);

    // Garantir que o diretório existe
    await mkdir(uploadDir, { recursive: true });

    // Converter File para Buffer e salvar
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Retornar URL do arquivo
    const fileUrl = `/images/${fileName}`;

    return createSuccessResponse(
      {
        url: fileUrl,
        fileName: fileName,
        originalName: file.name,
        size: file.size,
        type: file.type,
      },
      "Arquivo enviado com sucesso"
    );
  } catch (error) {
    console.error("Erro no upload:", error);
    return createValidationErrorResponse(["Erro interno do servidor"]);
  }
}
