import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserInput {
  email: string;
  name: string;
  password: string;
}

// Define the structure of user document, extending mongoose.Document and UserInput
export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Middleware executed before saving a user document
userSchema.pre("save", async function (next) {
  let user = this as UserDocument;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = bcrypt.genSaltSync(config.get<number>("saltWorkFactor") || 10);

  try {
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return next();
  } catch (error: any) {
    console.error(`Error hashing password: ${error}`);
    return next(error);
  }
});

// Method to compare a candidate password with the hashed password stored in the database
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as UserDocument;

  try {
    return await bcrypt.compare(candidatePassword, user.password);
  } catch (error) {
    console.error(`Error comparing passwords: ${error}`);
    return false;
  }
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
