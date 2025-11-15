// src/services/authService.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authRepository } from "../repositories/authRepository";
import {
  conflictError,
  invalidCredentialsError
} from "../utils/errors";


type SignUpParams = {
  email: string;
  password: string;
};

type SignInParams = SignUpParams;

async function signUp({ email, password }: SignUpParams) {
  const user = await authRepository.findByEmail(email);
  if (user) throw conflictError("Email já cadastrado");

  const hashedPassword = await bcrypt.hash(password, 10);

  await authRepository.create({
    email,
    password: hashedPassword,
  });
}

async function signIn({ email, password }: SignInParams) {
  const user = await authRepository.findByEmail(email);
  if (!user) throw invalidCredentialsError();

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw invalidCredentialsError();

  const secret = process.env.JWT_SECRET || "driven-pass-jwt-secret";

  const token = jwt.sign({ userId: user.id }, secret);

  return token;
}

export const authService = {
  signUp,
  signIn,
};
