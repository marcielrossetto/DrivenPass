// src/middlewares/schemaValidatorMiddleware.ts
import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export function schemaValidatorMiddleware(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(422).send({
        message: "Validation error",
        details: error.details.map((d) => d.message),
      });
    }

    next();
  };
}
