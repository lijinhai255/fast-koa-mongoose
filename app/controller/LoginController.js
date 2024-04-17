const { checkCode } = require("../../utils/index");
const bcrypt = require("bcryptjs");
const User = require("../../module/User");
const { generateToken } = require("../../core/util");
class LoginController {
  // 用户登录
  async login(ctx) {
    const body = ctx.request.body;
    const sid = body.sid;
    const code = body.code;
    const result = await checkCode(sid, code);
    // console.log(result, "result-result");
    if (result) {
      // 验证用户账号密码是否正确
      let checkUserPasswd = false;
      const user = await User.findOne({ username: body.username });
      // const passwordStr = await bcrypt.hash(user.password, 5);
      // console.log(passwordStr, "passwordStr-passwordStr");

      // console.log(user, "user-user", body.username);
      if (user === null) {
        ctx.body = {
          code: 404,
          msg: "用户名或者密码错误",
        };
        return;
      }
      // if (await bcrypt.compare(body.password, user.password)) {
      //   checkUserPasswd = true;
      // }
      if (body.password === user.password) {
        checkUserPasswd = true;
      }
      console.log(checkUserPasswd, "checkUserPasswd-checkUserPasswd");
      // mongoDB查库
      if (checkUserPasswd) {
        // 验证通过，返回Token数据
        const userObj = await addSign(user);
        let admins = JSON.parse(await getValue("admin"));
        if (admins && admins.includes(userObj._id.toString())) {
          !userObj.roles.includes("super_admin") &&
            userObj.roles.push("super_admin");
        }
        // await checkUserVipStatus(user)
        ctx.body = {
          code: 200,
          data: userObj,
          token: generateToken({ _id: user._id }, "60m"),
          refreshToken: generateToken({ _id: user._id }, "7d"),
        };
      } else {
        // 用户名 密码验证失败，返回提示
        ctx.body = {
          code: 404,
          msg: "用户名或者密码错误",
        };
      }
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
