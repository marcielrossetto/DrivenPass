// src/services/credentialsService.ts
import { credentialsRepository } from "../repositories/credentialsRepository";
import { encrypt, decrypt } from "../utils/cryptrUtils";
import { conflictError, notFoundError, unauthorizedError } from "../utils/errors";

type CreateCredentialParams = {
  title: string;
  url: string;
  username: string;
  password: string;
};

async function createCredential(userId: number, params: CreateCredentialParams) {
  const existing = await credentialsRepository.findByTitleAndUserId(
    params.title,
    userId
  );
  if (existing) throw conflictError("Você já tem uma credencial com esse título");

  const encryptedPassword = encrypt(params.password);

  await credentialsRepository.create({
    ...params,
    password: encryptedPassword,
    userId,
  });
}

async function getCredentials(userId: number) {
  const credentials = await credentialsRepository.findAllByUserId(userId);

  return credentials.map((c) => ({
    ...c,
    password: decrypt(c.password),
  }));
}

async function getCredentialById(userId: number, credentialId: number) {
  const credential = await credentialsRepository.findById(credentialId);
  if (!credential) throw notFoundError("Credencial não encontrada");
  if (credential.userId !== userId) throw unauthorizedError();

  return {
    ...credential,
    password: decrypt(credential.password),
  };
}

async function deleteCredential(userId: number, credentialId: number) {
  const credential = await credentialsRepository.findById(credentialId);
  if (!credential) throw notFoundError("Credencial não encontrada");
  if (credential.userId !== userId) throw unauthorizedError();

  await credentialsRepository.deleteById(credentialId);
}

async function eraseAll(userId: number) {
  await credentialsRepository.deleteAllByUserId(userId);
}

export const credentialsService = {
  createCredential,
  getCredentials,
  getCredentialById,
  deleteCredential,
  eraseAll,
};
