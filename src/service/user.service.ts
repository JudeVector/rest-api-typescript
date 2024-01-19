import UserModel, { UserInput } from "../models/user.model";
import { omit } from "lodash";

const createUser = async (input: UserInput) => {
  try {
    const user = await UserModel.create(input);

    return omit(user.toJSON(), "password");
  } catch (error: any) {
    throw new Error(error);
  }
};

export default createUser;
