// src/utils/cryptrUtil.ts
import Cryptr from "cryptr";

const secret = process.env.CRYPTR_SECRET || "driven-pass-secret";

const cryptr = new Cryptr(secret);

export function encrypt(text: string): string {
  return cryptr.encrypt(text);
}

export function decrypt(text: string): string {
  return cryptr.decrypt(text);
}
