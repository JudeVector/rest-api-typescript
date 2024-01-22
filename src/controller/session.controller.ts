import { Request, Response } from "express";
import config from "config";
import { createSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";
import { getEnvVariable } from "../utils/helper";

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the user's password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  // create a session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // Sign Access and Refresh tokens
  const accessToken = signJwt({ ...user, session: session._id }, "ACCESS_TOKEN_PRIVATE_KEY", {
    expiresIn: `${getEnvVariable("ACCESS_TOKEN_EXPIRES_IN")}`,
  });

  const refreshToken = signJwt({ ...user, session: session._id }, "REFRESH_TOKEN_PRIVATE_KEY", {
    expiresIn: `${getEnvVariable("REFRESH_TOKEN_EXPIRES_IN")}`,
  });

  // return access & refresh tokens

  return res.send({ accessToken, refreshToken });
}
