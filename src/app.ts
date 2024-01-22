import express from "express";
import connectDB from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import { getEnvVariable } from "./utils/helper";

const app = express();

app.use(express.json());

const PORT = getEnvVariable("PORT");
const __BASE_URL = getEnvVariable("__BASE_URL");

app.listen(PORT, async () => {
  logger.info(`Server is listening at ${__BASE_URL}${PORT}`);

  await connectDB();

  routes(app);
});
