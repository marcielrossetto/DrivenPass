export type ApplicationError = {
  name: string;
  message: string;
};

export function conflictError(message: string): ApplicationError {
  return { name: "ConflictError", message };
}

export function notFoundError(message: string): ApplicationError {
  return { name: "NotFoundError", message };
}

export function unauthorizedError(message = "Unauthorized"): ApplicationError {
  return { name: "UnauthorizedError", message };
}

export function invalidCredentialsError(): ApplicationError {
  return { name: "InvalidCredentialsError", message: "Email ou senha incorretos" };
}
