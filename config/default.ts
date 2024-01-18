require("dotenv").config();

const config = {
  port: process.env.PORT || 1337,
  dbUri: process.env.DB_URI,
  saltWorkFactor: process.env.SALT_WORK_FACTOR || 10,
};

export default config;
