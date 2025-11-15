// src/config/database.ts
import pkg from "@prisma/client";

const { PrismaClient } = pkg;

export const prisma = new PrismaClient();
