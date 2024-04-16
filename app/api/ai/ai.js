const Router = require("koa-router");
const axios = require("axios");
const request = require("request");
const { generateSign } = require("../../../utils/index");
const AK = "dOZ6sXO2IwAWzkYHy3R176J2";
const SK = "1UiqMgLn9Gwn5DDRlgcCOmrGYkdknKBk";

async function main(dataObj) {
  var options = {
    method: "POST",
    url:
      "https://aip.baidubce.com/rest/2.0/ocr/v1/table?access_token=" +
      (await getAccessToken()),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    form: {
      cell_contents: "false",
      return_excel: "false",
      ...dataObj,
    },
  };

  return request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    return response.body;
  });
}

/**
 * 使用 AK，SK 生成鉴权签名（Access Token）
 * @return string 鉴权签名信息（Access Token）
 */
function getAccessToken() {
  var options = {
    method: "POST",
    url: "https://aip.baidubce.com/oauth/2.0/token?client_id=dOZ6sXO2IwAWzkYHy3R176J2&client_secret=1UiqMgLn9Gwn5DDRlgcCOmrGYkdknKBk&grant_type=client_credentials",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return new Promise((resolve, reject) => {
    request(options, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(response.body).access_token);
      }
    });
  });
}

const router = new Router({
  prefix: "/api/ai",
});
const translateText = async (text, from = "zh", to = "en") => {
  const salt = Date.now().toString();
  const sign = generateSign(text, salt);

  try {
    const response = await axios.get(global.config.BASE_URL, {
      params: {
        q: text,
        from: from,
        to: to,
        appid: global.config.APP_ID,
        salt: salt,
        sign: sign,
      },
    });
    console.log(response.data, {
      q: text,
      from: from,
      to: to,
      appid: global.config.APP_ID,
      salt: salt,
      sign: sign,
    });
    return response.data.trans_result[0]?.dst;
  } catch (error) {
    console.error("Translation error:", error.message);
    return null;
  }
};

// 定义路由
router.post("/getTable", async (ctx) => {
  //   console.log(ctx.request.body);
  const data = await main(ctx.request.body);
  ctx.body = data; // 这将覆盖之前中间件设置的 ctx.body
});
// 文本翻译
router.get("/textTranslate", async (ctx) => {
  console.log('"ctx.request.params"', ctx.params, ctx, "ctx.request.params");
  const data = await translateText(
    ctx.query.text,
    ctx.query.from,
    ctx.query.to
  );
  ctx.body = { data: data, code: 200 }; // 这将覆盖之前中间件设置的 ctx.body
  //   ctx.body = "12121"; // 这将覆盖之前中间件设置的 ctx.body
});
// post 请求请求体中的参数
// url参数请求
module.exports = router;
