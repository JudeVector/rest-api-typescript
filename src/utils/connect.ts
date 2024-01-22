import mongoose from "mongoose";
import logger from "./logger";
import { getEnvVariable } from "./helper";

const connectDB = async () => {
  const dbUri = getEnvVariable("DB_URI");
  try {
    const conn = await mongoose.connect(dbUri);

    logger.info(`Databse Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error("Failed to connect to Database");
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
