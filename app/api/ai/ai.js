const Router = require("koa-router");
const axios = require("axios");
const request = require("request");
const { generateSign } = require("../../../utils/index");
const AK = "dOZ6sXO2IwAWzkYHy3R176J2";
const SK = "1UiqMgLn9Gwn5DDRlgcCOmrGYkdknKBk";

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
    return response.data.trans_result[0]?.dst;
  } catch (error) {
    console.error("Translation error:", error.message);
    return null;
  }
};

// 文本翻译
router.get("/textTranslate", async (ctx) => {
  if (ctx.query.text) {
    const data = await translateText(
      ctx.query.text,
      ctx.query.from,
      ctx.query.to
    );
    ctx.body = { data: data, code: 200 };
  }
  // 这将覆盖之前中间件设置的 ctx.body
  //   ctx.body = "12121"; // 这将覆盖之前中间件设置的 ctx.body
});

async function ocrTable(dataObj) {
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
    return response.body;
  });
}

const ocrImage = async (obj) => {
  try {
    const accessToken = await getAccessToken();
    const options = {
      method: "POST",
      url: `https://aip.baidubce.com/rest/2.0/ocr/v1/accurate?access_token=${accessToken}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      form: {
        detect_direction: "false",
        vertexes_location: "false",
        paragraph: "false",
        probability: "false",
        ...obj,
      },
    };

    // Using a library like Axios for HTTP requests
    const response = await axios({
      method: options.method,
      url: options.url,
      headers: options.headers,
      data: options.form,
    });

    return response.data; // Directly return the data from Axios promise
  } catch (error) {
    // Log error or handle it accordingly
    console.error("Failed to process OCR Image:", error);
    throw error; // Rethrow or handle as needed
  }
};

router.post("/ocrImage", async (ctx) => {
  const data = await ocrImage(ctx.request.body);
  ctx.body = { data, code: 200 };
});
// 定义路由
router.post("/getTable", async (ctx) => {
  const data = await ocrTable(ctx.request.body);
  ctx.body = data; // 这将覆盖之前中间件设置的 ctx.body
});
module.exports = router;
