const Koa = require("koa");
const cors = require("@koa/cors");
const JWT = require("koa-jwt");
const { run } = require("./middlewares/init");
const InitManger = require("./core/init");
const bodyParser = require("koa-bodyparser");
const catchError = require("./middlewares/exception");
const config = require("./config/config");
const compose = require("koa-compose");

const app = new Koa();
// 使用配置
app.context.config = config;
// 定义公共路径，不需要jwt鉴权
const jwt = JWT({ secret: config.JWT_SECRET }).unless({
  path: [/\/public/, /\/login/],
});
const middlewares = compose([
  catchError, // Catch errors from all subsequent middlewares
  cors(), // Handle CORS and preflight checks early
  bodyParser({
    jsonLimit: "10mb", // Increase the JSON body size limit
    formLimit: "10mb", // Increase the form body size limit
  }),
  jwt, // JWT should be applied after CORS and bodyParser
]);
app.use(middlewares);

InitManger.initCore(app);

// 启动服务器
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
  run();
});
