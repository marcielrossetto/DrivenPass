// prisma/seed.ts
import "dotenv/config";
import bcrypt from "bcrypt";
import { prisma } from "./config/database";

async function main() {
  const email = "demo@drivenpass.com";
  const password = "123456";

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
    },
  });

  console.log("✅ Usuário seed criado:", email, "senha:", password);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
