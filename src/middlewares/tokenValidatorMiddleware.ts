// src/middlewares/tokenValidatorMiddleware.ts
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { unauthorizedError } from "../utils/errors";

export type JWTPayload = {
  userId: number;
};

export function tokenValidatorMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.header("Authorization");
  if (!authHeader) throw unauthorizedError();

  const token = authHeader.replace("Bearer ", "");

  try {
    const secret = process.env.JWT_SECRET || "driven-pass-jwt-secret";
    const payload = jwt.verify(token, secret) as JWTPayload;

    res.locals.userId = payload.userId;

    next();
  } catch {
    throw unauthorizedError();
  }
}
