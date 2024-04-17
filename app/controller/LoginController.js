const { checkCode } = require("../../utils/index");
const { generateToken } = require("../../core/util");
class LoginController {
  // 用户登录
  async login(ctx) {
    console.log(ctx.request.body, "ctx.request.body");
    const body = ctx.request.body;
    const sid = body.sid;
    const code = body.code;
    const result = await checkCode(sid, code);
    console.log(result, "result-result");
    if (result) {
      ctx.body = {
        code: 200,
        msg: "图片验证码正确！",
        token: generateToken(sid, "60m"),
      };
      return;
    }
    ctx.body = {
      code: 401,
      msg: "图片验证码不正确,请检查！",
    };
    return;
  }
  // 解释鉴权
  async auth(ctx) {
    console.log(ctx, "ctx.request.body");
    ctx.body = {
      code: 200,
      msg: "鉴权成功！",
    };
  }
}

module.exports = new LoginController();
