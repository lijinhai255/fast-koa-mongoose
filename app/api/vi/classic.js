const Router = require("koa-router");

const { PositIntegerValidator } = require("../../../validators/validator");
const router = new Router({
  prefix: "/api",
});

// // 定义路由
router.get("/v1/classic/latest", (ctx, next) => {
  ctx.body = { key: "api 接口请求123456" }; // 这将覆盖之前中间件设置的 ctx.body
  next();
});
// 定义路由
router.post("/v1/:index/classic/latest", async (ctx) => {
  const { params } = ctx.request;
  const { header } = ctx.request;
  const { body } = ctx.request;
  const v = await new PositIntegerValidator().validate(ctx, {
    id: "index",
  });
  console.log(v);
  ctx.body = { key: "api 接口请求" }; // 这将覆盖之前中间件设置的 ctx.body
});

// post 请求请求体中的参数
// url参数请求
module.exports = router;
