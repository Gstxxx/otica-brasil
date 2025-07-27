import { z } from "zod";
import { NextRequest } from "next/server";

/**
 * Valida um dado qualquer usando um schema Zod.
 * Passo a passo:
 * 1. Recebe um schema Zod e um dado desconhecido.
 * 2. Tenta validar o dado de forma assíncrona usando o método parseAsync do Zod.
 * 3. Se passar, retorna { success: true, data }.
 * 4. Se falhar, verifica se o erro é do tipo ZodError.
 *    - Se sim, extrai as mensagens de erro e retorna { success: false, errors }.
 *    - Se não, retorna um erro genérico de validação.
 */
export async function validateInput<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): Promise<{ success: true; data: T } | { success: false; errors: string[] }> {
  try {
    const validatedData = await schema.parseAsync(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Extrai todas as mensagens de erro do Zod
      const errors = (
        error as unknown as { errors: Array<{ message: string }> }
      ).errors.map((err) => err.message);
      return { success: false, errors };
    }
    // Caso o erro não seja do Zod, retorna erro genérico
    return { success: false, errors: ["Erro de validação desconhecido"] };
  }
}

/**
 * Valida o corpo de uma requisição Next.js usando um schema Zod.
 * Passo a passo:
 * 1. Recebe um schema Zod e um objeto NextRequest.
 * 2. Tenta extrair o JSON do corpo da requisição.
 * 3. Chama validateInput para validar o corpo extraído.
 * 4. Se houver erro ao extrair o JSON, retorna erro de processamento.
 */
export async function validateRequest<T>(
  schema: z.ZodSchema<T>,
  request: NextRequest
): Promise<{ success: true; data: T } | { success: false; errors: string[] }> {
  try {
    const body = await request.json();
    return await validateInput(schema, body);
  } catch (error) {
    return {
      success: false,
      errors: ["Erro ao processar dados da requisição"],
    };
  }
}

/**
 * Valida parâmetros de query string usando um schema Zod.
 * Passo a passo:
 * 1. Recebe um schema Zod e um objeto de query (chave-valor).
 * 2. Converte os valores do query para o formato esperado:
 *    - Se o valor for array e tiver só um item, transforma em string.
 *    - Se não, mantém o valor.
 * 3. Usa o schema para validar o objeto processado.
 * 4. Retorna sucesso ou lista de erros.
 */
export function validateQuery<T>(
  schema: z.ZodSchema<T>,
  query: Record<string, string | string[] | undefined>
): { success: true; data: T } | { success: false; errors: string[] } {
  try {
    const processedQuery: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(query)) {
      if (Array.isArray(value)) {
        processedQuery[key] = value.length === 1 ? value[0] : value;
      } else {
        processedQuery[key] = value;
      }
    }

    const validatedData = schema.parse(processedQuery);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = (
        error as unknown as { errors: Array<{ message: string }> }
      ).errors.map((err) => err.message);
      return { success: false, errors };
    }
    return { success: false, errors: ["Erro de validação desconhecido"] };
  }
}

/**
 * Cria uma resposta padronizada de erro de validação.
 * Passo a passo:
 * 1. Recebe um array de mensagens de erro.
 * 2. Retorna um JSON com success: false, os erros e uma mensagem padrão.
 * 3. Define o status HTTP como 400.
 */
export function createValidationErrorResponse(errors: string[]) {
  return Response.json(
    {
      success: false,
      errors,
      message: "Dados de entrada inválidos",
    },
    { status: 400 }
  );
}

/**
 * Cria uma resposta padronizada de sucesso.
 * Passo a passo:
 * 1. Recebe os dados e uma mensagem opcional.
 * 2. Retorna um JSON com success: true, os dados e a mensagem.
 * 3. Define o status HTTP como 200.
 */
export function createSuccessResponse<T>(data: T, message?: string) {
  return Response.json(
    {
      success: true,
      data,
      message: message || "Operação realizada com sucesso",
    },
    { status: 200 }
  );
}

/**
 * Valida se um ID está no formato CUID (25 caracteres, letras minúsculas e números).
 * Passo a passo:
 * 1. Recebe uma string de ID.
 * 2. Usa regex para verificar se bate com o padrão CUID.
 * 3. Retorna true se for válido, false caso contrário.
 */
export function validateEntityId(id: string): boolean {
  return /^[a-z0-9]{25}$/.test(id); // CUID format
}

/**
 * Remove espaços extras de uma string.
 * Passo a passo:
 * 1. Recebe uma string.
 * 2. Usa trim() para remover espaços nas pontas.
 * 3. Usa replace para trocar múltiplos espaços internos por um só.
 * 4. Retorna a string sanitizada.
 */
export function sanitizeString(input: string): string {
  return input.trim().replace(/\s+/g, " ");
}

/**
 * Valida se um email está no formato correto.
 * Passo a passo:
 * 1. Recebe uma string de email.
 * 2. Usa regex para verificar o padrão de email.
 * 3. Retorna true se for válido, false caso contrário.
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida se um telefone brasileiro está no formato correto.
 * Passo a passo:
 * 1. Recebe uma string de telefone.
 * 2. Usa regex para verificar se bate com os padrões nacionais (com ou sem DDD, com ou sem +55).
 * 3. Retorna true se for válido, false caso contrário.
 */
export function validateBrazilianPhone(phone: string): boolean {
  const phoneRegex = /^(\+55\s?)?(\(?\d{2}\)?\s?)?(\d{4,5}-?\d{4})$/;
  return phoneRegex.test(phone);
}

/**
 * Formata um telefone brasileiro para o padrão (XX) XXXXX-XXXX ou (XX) XXXX-XXXX.
 * Passo a passo:
 * 1. Remove todos os caracteres não numéricos do telefone.
 * 2. Se tiver 11 dígitos, formata como celular: (XX) XXXXX-XXXX.
 * 3. Se tiver 10 dígitos, formata como fixo: (XX) XXXX-XXXX.
 * 4. Se não bater com nenhum, retorna o telefone original.
 */
export function formatBrazilianPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(
      7
    )}`;
  }

  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(
      6
    )}`;
  }

  return phone;
}
