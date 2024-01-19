require("dotenv").config();

const config = {
  port: process.env.PORT || 1337,
  dbUri: process.env.DB_URI,
  saltWorkFactor: 10,
  __BASE_URL: process.env.__BASE_URL || "http://127.0.0.1:",
};

export default config;
