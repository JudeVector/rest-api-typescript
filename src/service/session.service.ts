import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { get } from "lodash";
import { findUser } from "./user.service";
import { getEnvVariable } from "../utils/helper";

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
}

export const findSessions = async (query: FilterQuery<SessionDocument>) => {
  return await SessionModel.find(query).lean();
};

export const updateSessions = async (
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) => {
  return SessionModel.updateOne(query, update);
};

export const reIssueAccessToken = async ({ refreshToken }: { refreshToken: string }) => {
  const { decoded } = verifyJwt(refreshToken, "REFRESH_TOKEN_PUBLIC_KEY");

  if (!decoded || !get(decoded, "_id")) return false;

  const session = await SessionModel.findById(get(decoded, "_id"));

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = signJwt({ ...user, session: session._id }, "ACCESS_TOKEN_PRIVATE_KEY", {
    expiresIn: `${getEnvVariable("ACCESS_TOKEN_EXPIRES_IN")}`,
  });

  return accessToken;
};
