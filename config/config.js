const path = require("path");

// const MONGO_USERNAME = process.env.DB_USER || "root";
// const MONGO_PASSWORD = process.env.DB_PASS || "";
// const MONGO_HOSTNAME = process.env.DB_HOST || "localhost";
// const MONGO_PORT = process.env.DB_PORT || "27017";
// const DB_NAME = process.env.DB_NAME || "mydatabase";

// const DB_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${DB_NAME}`;

const MONGO_HOSTNAME = process.env.DB_HOST || "localhost";
const MONGO_PORT = process.env.DB_PORT || "27017";
const DB_NAME = process.env.DB_NAME || "mydatabase";

const DB_URL = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${DB_NAME}`;

// console.log('DB_URL', DB_URL)

const REDIS = {
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASS || "",
};

const JWT_SECRET = "long-random-password";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "http://front.dev.toimc.com:22500"
    : "http://localhost:8080";

const uploadPath =
  process.env.NODE_ENV === "production"
    ? "/app/public"
    : path.join(path.resolve(__dirname), "../../public");

const logPath =
  process.env.NODE_ENV === "production"
    ? "/tmp/log"
    : path.join(path.resolve(__dirname), "../../logs");

const adminEmail = ["1322928787@qq.com"];

const publicPath = [
  /^\/public/,
  /^\/login/,
  /^\/content/,
  /^\/user/,
  /^\/comments/,
];

const isDevMode = process.env.NODE_ENV !== "production";

const port = 3000;
const wsPort = 3001;

const AppID = "your-wx-appid";
const AppSecret = process.env.WX_SECRET || "your-wx-app-secret";

const SubIds = ["FSQZganmBgaRRoNNlelQ1Qm2u4gx6pVSt69EJfkLbPA"];

const mchid = "1565952921";

const serialNo = "random-serial-no";

const apiV3Key = process.env.API_V3 || "wx-api-v3-key";

const WebAppID = "wx-appid";
const WebSECRET = "wx-secret";
const APP_ID = "20230726001758571";
const APP_KEY = "5vQdPlRR3m3UJikcj5Ju";
const BASE_URL = "http://api.fanyi.baidu.com/api/trans/vip/translate";

module.exports = {
  environment: "dev",
  database: {
    dbName: "wxapp",
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
  },
  security: {
    secretKey: "abcdefg",
    // 过期时间 1小时
    expiresIn: 60 * 60,
  },
  wx: {
    appId: "wxd2e0c5da046bc12e",
    appSecret: "e4b11b262b491bc81ddce8e89fc2d972",
    loginUrl:
      "https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code",
  },
  DB_NAME,
  MONGO_HOSTNAME,
  DB_URL,
  REDIS,
  JWT_SECRET,
  baseUrl,
  uploadPath,
  adminEmail,
  publicPath,
  isDevMode,
  port,
  wsPort,
  AppID,
  AppSecret,
  SubIds,
  mchid,
  serialNo,
  apiV3Key,
  WebAppID,
  WebSECRET,
  logPath,
  APP_ID,
  APP_KEY,
  BASE_URL,
};
