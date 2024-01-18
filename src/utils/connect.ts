import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

const connectDB = async () => {
  const dbUri = config.get<string>("dbUri");
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
