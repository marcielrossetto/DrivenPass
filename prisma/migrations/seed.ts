import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = bcrypt.hashSync("123456", 10);

  await prisma.user.create({
    data: {
      email: "admin@admin.com",
      password: hashedPassword
    }
  });

  console.log("Seed executado com sucesso!");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
