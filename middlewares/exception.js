const { HttpException } = require("../core/http-exception");

const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    // console.log(error, "error");
    // 开发环境
    const isHttpException = error instanceof HttpException;
    const isDev = global.config.environment === "dev";
    // console.log(isDev && !isHttpException, "isDev && !isHttpException");
    if (isDev && !isHttpException) {
      console.log(error.status);
      if (error.status === 401) {
        ctx.status = 401;
        ctx.body = {
          code: 401,
          msg: "Protected resource, use Authorization header to get access\n",
        };
      } else {
        ctx.status = error.status || 500;
        ctx.body = Object.assign(
          {
            code: error.code || 500,
            msg: error.message,
          },
          process.env.NODE_ENV === "development" ? { stack: error.stack } : {}
        );
      }
      // throw error;
      return;
    }
    // 生成环境
    if (isHttpException) {
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`,
      };
      ctx.status = error.code;
    } else {
      ctx.body = {
        msg: "未知错误！",
        error_code: 9999,
        request: `${ctx.method} ${ctx.path}`,
      };
      ctx.status = 500;
    }
  }
};

module.exports = catchError;
