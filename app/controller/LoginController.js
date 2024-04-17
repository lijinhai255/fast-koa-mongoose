const { checkCode } = require("../utils/utils");
class LoginController {
  // 用户登录
  async login(ctx) {
    const body = ctx.request.body;
    const sid = body.sid;
    const code = body.code;
    const result = await checkCode(sid, code);
    if (result) {
      return;
    }
    ctx.body = {
      code: 401,
      msg: "图片验证码不正确,请检查！",
    };
  }
}

module.exports = LoginController;
