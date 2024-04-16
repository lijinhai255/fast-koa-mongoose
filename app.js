const Koa = require("koa");
const cors = require("@koa/cors");
const { run } = require("./middlewares/init");
const InitManger = require("./core/init");
const bodyParser = require("koa-bodyparser");
const catchError = require("./middlewares/exception");
const config = require("./config/config");

const app = new Koa();
// 使用配置
app.context.config = config;

app.use(
  bodyParser({
    jsonLimit: "10mb", // Increase the JSON body size limit
    formLimit: "10mb", // Increase the form body size limit
  })
);
app.use(catchError);
// 允许所有来源
app.use(cors());

InitManger.initCore(app);

// 启动服务器
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
  run();
});
