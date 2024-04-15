const Koa = require("koa");
const InitManger = require("./core/init");
const bodyParser = require("koa-bodyparser");
const catchError = require("./middlewares/exception");
const config = require("./config/config");

const app = new Koa();
// 使用配置
app.context.config = config;

app.use(bodyParser());
app.use(catchError);
InitManger.initCore(app);

// 启动服务器
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
