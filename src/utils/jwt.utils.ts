import jwt, { SignOptions } from "jsonwebtoken";
import { getEnvVariable } from "./helper";

export const signJwt = (
  payload: Object,
  keyName: "ACCESS_TOKEN_PRIVATE_KEY" | "REFRESH_TOKEN_PRIVATE_KEY",
  options: SignOptions
) => {
  const privateKey = Buffer.from(getEnvVariable(keyName), "base64").toString("ascii");
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJwt = (
  token: string,
  keyName: "ACCESS_TOKEN_PUBLIC_KEY" | "REFRESH_TOKEN_PUBLIC_KEY"
) => {
  try {
    const publicKey = Buffer.from(getEnvVariable(keyName), "base64").toString("ascii");
    const decoded = jwt.verify(token, publicKey);

    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    console.log(error);
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
};
