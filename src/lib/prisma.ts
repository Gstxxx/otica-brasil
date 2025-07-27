import { PrismaClient } from "@prisma/client";

// Este trecho de código garante que apenas uma instância do PrismaClient seja criada durante o desenvolvimento,
// evitando problemas de "Too many connections" ao usar hot reload no Next.js ou em outros frameworks que recarregam módulos.
// Em produção, uma nova instância é criada normalmente, pois o código é executado apenas uma vez.

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Se já existir uma instância de Prisma no escopo global (útil em dev), reutiliza; senão, cria uma nova.
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// No ambiente de desenvolvimento, armazena a instância no escopo global para reutilização em recarregamentos.
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
