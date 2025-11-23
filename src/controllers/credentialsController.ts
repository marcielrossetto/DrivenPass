import { Request, Response } from "express";
import { credentialsService } from "../services/credentialsService";

export async function createCredential(req: Request, res: Response) {
  const { userId } = res.locals;
  const params = req.body;

  await credentialsService.createCredential(userId, params);
  return res.sendStatus(201);
}

export async function getCredentials(req: Request, res: Response) {
  const { userId } = res.locals;

  const credentials = await credentialsService.findAll(userId);
  return res.send(credentials);
}

export async function getCredentialById(req: Request, res: Response) {
  const { userId } = res.locals;
  const id = Number(req.params.id);

  const credential = await credentialsService.findById(userId, id);
  return res.send(credential);
}

export async function deleteCredential(req: Request, res: Response) {
  const { userId } = res.locals;
  const id = Number(req.params.id);

  await credentialsService.deleteById(userId, id);
  return res.sendStatus(204);
}

export async function eraseAll(req: Request, res: Response) {
  const { userId } = res.locals;

  await credentialsService.deleteAllByUserId(userId);
  return res.sendStatus(204);
}
