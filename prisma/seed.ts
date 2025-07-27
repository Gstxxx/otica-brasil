import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed do banco de dados...");

  // Criar tipos de lentes básicos
  const lensTypes = [
    {
      name: "Lente Monofocal",
      description:
        "Lente para correção de miopia, hipermetropia ou astigmatismo",
      basePrice: 150.0,
    },
    {
      name: "Lente Bifocal",
      description: "Lente com duas distâncias focais - longe e perto",
      basePrice: 250.0,
    },
    {
      name: "Lente Multifocal/Progressiva",
      description: "Lente progressiva para todas as distâncias",
      basePrice: 350.0,
    },
    {
      name: "Lente Transitions",
      description: "Lente fotocromática que escurece na luz solar",
      basePrice: 200.0,
    },
    {
      name: "Lente Antirreflexo",
      description: "Lente com tratamento antirreflexo para melhor visão",
      basePrice: 100.0,
    },
    {
      name: "Lente Blue Light",
      description: "Lente com filtro para luz azul de dispositivos eletrônicos",
      basePrice: 120.0,
    },
  ];

  for (const lensType of lensTypes) {
    await prisma.lensType.upsert({
      where: { name: lensType.name },
      update: {},
      create: lensType,
    });
  }

  console.log("✅ Tipos de lentes criados com sucesso!");

  // Criar um admin padrão
  const hashedPassword = await bcrypt.hash("admin123", 12);
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@otica.com" },
    update: {},
    create: {
      email: "admin@otica.com",
      name: "Administrador",
      password: hashedPassword,
      role: "ADMIN",
      admin: {
        create: {},
      },
    },
  });

  console.log("✅ Admin padrão criado:", adminUser.email);

  // Criar um cliente de teste
  const customerPassword = await bcrypt.hash("cliente123", 12);
  const customerUser = await prisma.user.upsert({
    where: { email: "cliente@teste.com" },
    update: {},
    create: {
      email: "cliente@teste.com",
      name: "Cliente Teste",
      password: customerPassword,
      role: "CUSTOMER",
      customer: {
        create: {
          phone: "(11) 99999-9999",
          address: "Rua Teste, 123",
          cep: "01234-567",
          city: "São Paulo",
          state: "SP",
        },
      },
    },
  });

  console.log("✅ Cliente de teste criado:", customerUser.email);

  console.log("🎉 Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro durante o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
