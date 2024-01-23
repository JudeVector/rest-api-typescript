import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");

  const refreshToken = get(req, "headers.x-refresh")?.toString();

  if (!accessToken) {
    return next();
  }

  try {
    const { decoded, expired } = verifyJwt(accessToken, "ACCESS_TOKEN_PUBLIC_KEY");

    if (decoded) {
      res.locals.user = decoded;
      return next();
    }

    if (expired && refreshToken) {
      const newAccessToken = await reIssueAccessToken({ refreshToken });
      console.log("newAccessToken: " + newAccessToken);

      if (newAccessToken) {
        res.setHeader("x-access-token", newAccessToken);
      }

      const result = verifyJwt(newAccessToken as string, "REFRESH_TOKEN_PUBLIC_KEY");

      res.locals.user = result.decoded;
      return next();
    }
  } catch (error) {
    console.error("Error verifying access token:", error);
  }

  return next();
};

export default deserializeUser;
