// src/controllers/credentialsController.ts
import { Request, Response } from "express";
import { credentialsService } from "../services/credentialsService";

export async function createCredential(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  await credentialsService.createCredential(userId, req.body);
  return res.sendStatus(201);
}

export async function getCredentials(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const credentials = await credentialsService.getCredentials(userId);
  return res.status(200).send(credentials);
}

export async function getCredentialById(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const id = Number(req.params.id);

  const credential = await credentialsService.getCredentialById(userId, id);
  return res.status(200).send(credential);
}

export async function deleteCredential(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const id = Number(req.params.id);

  await credentialsService.deleteCredential(userId, id);
  return res.sendStatus(204);
}

export async function eraseAll(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  await credentialsService.eraseAll(userId);
  return res.sendStatus(204);
}
