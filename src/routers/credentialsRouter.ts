import { Router } from "express";
import {
  createCredential,
  deleteCredential,
  eraseAll,
  getCredentialById,
  getCredentials
} from "../controllers/credentialsController";


import { tokenValidatorMiddleware } from "../middlewares/tokenValidatorMiddleware";
import { schemaValidatorMiddleware } from "../middlewares/schemaValidatorMiddleware";
import { credentialSchema } from "../schemas/credentialSchema";

const credentialsRouter = Router();

credentialsRouter.use(tokenValidatorMiddleware);

credentialsRouter.post(
  "/credentials",
  schemaValidatorMiddleware(credentialSchema),
  createCredential
);

credentialsRouter.get("/credentials", getCredentials);
credentialsRouter.get("/credentials/:id", getCredentialById);
credentialsRouter.delete("/credentials/:id", deleteCredential);
credentialsRouter.delete("/erase", eraseAll);

export default credentialsRouter;
