// src/schemas/credentialSchema.ts
import Joi from "joi";

export const credentialSchema = Joi.object({
  title: Joi.string().min(1).required(),
  url: Joi.string().uri().required(),
  username: Joi.string().min(1).required(),
  password: Joi.string().min(1).required(),
});
