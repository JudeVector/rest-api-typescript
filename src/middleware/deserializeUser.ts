import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");

  const refreshToken = get(req, "headers.x-refresh");

  if (!accessToken) {
    return next();
  }

  try {
    const { decoded, expired } = verifyJwt(accessToken, "ACCESS_TOKEN_PUBLIC_KEY");

    if (decoded) {
      res.locals.user = decoded;
    }

    if (expired && refreshToken) {
      const newAcessToken = await reIssueAccessToken({ refreshToken });

      if (newAcessToken) {
        res.setHeader("x-access-token", newAcessToken);
      }
    }
  } catch (error) {
    console.error("Error verifying access token:", error);
  }

  return next();
};

export default deserializeUser;
