const Router = require("koa-router");
const svgCaptcha = require("svg-captcha");
const { setValue } = require("../../../core/RedisConfig");
const router = new Router({
  prefix: "/api/tomic",
});

// 定义路由
router.get("/public/getCaptcha", (ctx) => {
  const body = ctx.query;
  const newCaptca = svgCaptcha.create({
    size: 4,
    ignoreChars: "0oO1ilLI",
    color: true,
    noise: Math.floor(Math.random() * 5),
    width: 150,
    height: 38,
  });
  if (typeof body.sid === "undefined") {
    ctx.body = {
      code: 500,
      msg: "参数不全！",
    };
    return;
  }
  // 保存图片验证码数据，设置超时时间，单位: s
  // 设置图片验证码超时10分钟
  setValue(body.sid, newCaptca.text, 10 * 60);
  ctx.body = {
    code: 200,
    data: newCaptca.data,
  };
});

//登录接口
router.post("/public/login", (ctx) => {
  const body = ctx.request.body;
  if (!body.username) {
    ctx.body = {
      code: 500,
      msg: "参数不全！",
    };
    return;
  }
});
// post 请求请求体中的参数
// url参数请求
module.exports = router;
