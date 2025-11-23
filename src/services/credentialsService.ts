import { credentialsRepository } from "../repositories/credentialsRepository";
import { encrypt, decrypt } from "../utils/cryptrUtils";
import { conflictError, notFoundError, unauthorizedError } from "../utils/errors";

interface CreateCredentialParams {
  title: string;
  url: string;
  username: string;
  password: string;
}

async function createCredential(userId: number, params: CreateCredentialParams) {
  const existing = await credentialsRepository.findByTitleAndUserId(params.title, userId);
  if (existing) throw conflictError("Já existe uma credencial com esse título para este usuário");

  const encryptedPassword = encrypt(params.password);

  await credentialsRepository.create({
    ...params,
    password: encryptedPassword,
    userId
  });
}

async function findAll(userId: number) {
  const credentials = await credentialsRepository.findAll(userId);

  return credentials.map(cred => ({
    ...cred,
    password: decrypt(cred.password)
  }));
}

async function findById(userId: number, id: number) {
  const credential = await credentialsRepository.findById(id);
  if (!credential) throw notFoundError("Credencial não encontrada");

  if (credential.userId !== userId)
    throw unauthorizedError("Credencial não pertence ao usuário");

  return {
    ...credential,
    password: decrypt(credential.password)
  };
}

async function deleteById(userId: number, id: number) {
  const credential = await credentialsRepository.findById(id);
  if (!credential) throw notFoundError("Credencial não encontrada");

  if (credential.userId !== userId)
    throw unauthorizedError("Credencial não pertence ao usuário");

  await credentialsRepository.deleteById(id);
}

async function deleteAllByUserId(userId: number) {
  await credentialsRepository.deleteAllByUserId(userId);
}

export const credentialsService = {
  createCredential,
  findAll,
  findById,
  deleteById,
  deleteAllByUserId
};
