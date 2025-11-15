// src/routers/index.ts
import { Router } from "express";
import authRouter from "./authRouter";
import credentialsRouter from "./credentialsRouter";

const router = Router();

router.get("/health", (_req, res) => res.send("OK!"));
router.use(authRouter);
router.use(credentialsRouter);

export default router;
