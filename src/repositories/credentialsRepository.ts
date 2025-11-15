// src/repositories/credentialsRepository.ts
import { prisma } from "../config/database";
import { Credential } from "@prisma/client";

export type CreateCredentialData = Omit<Credential, "id" | "createdAt">;

async function findByTitleAndUserId(title: string, userId: number) {
  return prisma.credential.findFirst({
    where: { title, userId },
  });
}

async function create(data: CreateCredentialData) {
  return prisma.credential.create({ data });
}

async function findAllByUserId(userId: number) {
  return prisma.credential.findMany({ where: { userId } });
}

async function findById(id: number) {
  return prisma.credential.findUnique({ where: { id } });
}

async function deleteById(id: number) {
  return prisma.credential.delete({ where: { id } });
}

async function deleteAllByUserId(userId: number) {
  return prisma.credential.deleteMany({ where: { userId } });
}

export const credentialsRepository = {
  findByTitleAndUserId,
  create,
  findAllByUserId,
  findById,
  deleteById,
  deleteAllByUserId,
};
