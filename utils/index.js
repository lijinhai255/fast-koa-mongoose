const crypto = require("crypto");

function generateSign(query, salt) {
  const str = global.config.APP_ID + query + salt + global.config.APP_KEY;
  const md5 = crypto.createHash("md5");
  return md5.update(str).digest("hex");
}

module.exports = {
  generateSign,
};
