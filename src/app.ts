import express from "express";
import config from "config";
import connectDB from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";

const app = express();

app.use(express.json());

const PORT = config.get<number>("port");
const __BASE_URL = config.get<string>("__BASE_URL");

app.listen(PORT, async () => {
  logger.info(`Server is listening at ${__BASE_URL}${PORT}`);

  await connectDB();

  routes(app);
});
