import { prisma } from "../config/database";

async function findByTitleAndUserId(title: string, userId: number) {
  return prisma.credential.findFirst({
    where: { title, userId }
  });
}

async function create(data: any) {
  return prisma.credential.create({ data });
}

async function findAll(userId: number) {
  return prisma.credential.findMany({
    where: { userId }
  });
}

async function findById(id: number) {
  return prisma.credential.findUnique({
    where: { id }
  });
}

async function deleteById(id: number) {
  return prisma.credential.delete({
    where: { id }
  });
}

async function deleteAllByUserId(userId: number) {
  return prisma.credential.deleteMany({
    where: { userId }
  });
}

export const credentialsRepository = {
  findByTitleAndUserId,
  create,
  findAll,
  findById,
  deleteById,
  deleteAllByUserId
};
