import connectDB from "./utils/connect";
import logger from "./utils/logger";
import { getEnvVariable } from "./utils/helper";
import createServer from "./utils/server";
import { startMetricServer } from "./utils/metrics";

const app = createServer();

const PORT = getEnvVariable("PORT");
const __BASE_URL = getEnvVariable("__BASE_URL");

app.listen(PORT, async () => {
  logger.info(`Server is listening at ${__BASE_URL}${PORT}`);

  await connectDB();

  startMetricServer();
});
