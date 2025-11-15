// src/routers/authRouter.ts
import { Router } from "express";
import { signIn, signUp } from "../controllers/authController";
import { schemaValidatorMiddleware } from "../middlewares/schemaValidatorMiddleware";
import { signInSchema, signUpSchema } from "../schemas/authSchema";

const authRouter = Router();

authRouter.post("/sign-up", schemaValidatorMiddleware(signUpSchema), signUp);
authRouter.post("/sign-in", schemaValidatorMiddleware(signInSchema), signIn);

export default authRouter;
