const crypto = require("crypto");
const { getValue } = require("../core/RedisConfig");
function generateSign(query, salt) {
  const str = global.config.APP_ID + query + salt + global.config.APP_KEY;
  const md5 = crypto.createHash("md5");
  return md5.update(str).digest("hex");
}

const checkCode = async (key, value) => {
  const redisData = await getValue(key);

  if (redisData != null) {
    if (redisData.toLowerCase() === value.toLowerCase()) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
const rand = (len = 8) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";
  for (let i = 0; i < len; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
const getTempName = () => {
  return "toimc_" + rand() + "@toimc.com";
};
module.exports = {
  generateSign,
  checkCode,
  rand,
  getTempName,
};
