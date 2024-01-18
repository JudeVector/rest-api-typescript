import express from "express";
import config from "config";
import connectDB from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";

const app = express();

const PORT = config.get<number>("port");

app.listen(PORT, async () => {
  logger.info(`Serving is listening at http://127.0.0.1:${PORT}`);

  await connectDB();

  routes(app);
});
