// src/controllers/authController.ts
import { Request, Response } from "express";
import { authService } from "../services/authService";

export async function signUp(req: Request, res: Response) {
  const { email, password } = req.body;

  await authService.signUp({ email, password });

  return res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body;

  const token = await authService.signIn({ email, password });

  return res.status(200).send({ token });
}
