// src/middlewares/errorHandlerMiddleware.ts
import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "../utils/errors";
import { ValidationError } from "joi";

export function errorHandlerMiddleware(
  err: ApplicationError | ValidationError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  if ("isJoi" in err) {
    return res.status(422).send({
      message: "Validation error",
      details: (err as ValidationError).details.map((d) => d.message),
    });
  }

  switch (err.name) {
    case "ConflictError":
      return res.status(409).send({ message: err.message });
    case "NotFoundError":
      return res.status(404).send({ message: err.message });
    case "UnauthorizedError":
      return res.status(401).send({ message: err.message });
    case "InvalidCredentialsError":
      return res.status(401).send({ message: err.message });
    default:
      return res.status(500).send({ message: "Internal server error" });
  }
}
