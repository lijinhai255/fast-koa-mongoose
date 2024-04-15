const Router = require("koa-router");

const router = new Router({
  prefix: "/api",
});

// 定义路由
router.get("/api12", (ctx) => {
  ctx.body = { key: "api 接口请求" }; // 这将覆盖之前中间件设置的 ctx.body
});

// post 请求请求体中的参数
// url参数请求
module.exports = router;
