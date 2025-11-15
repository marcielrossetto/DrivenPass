// src/repositories/authRepository.ts
import { prisma } from "../config/database";
import { User } from "@prisma/client";

export type CreateUserData = Omit<User, "id" | "createdAt">;

async function findByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

async function create(data: CreateUserData) {
  return prisma.user.create({ data });
}

async function findById(id: number) {
  return prisma.user.findUnique({ where: { id } });
}

export const authRepository = {
  findByEmail,
  create,
  findById,
};
