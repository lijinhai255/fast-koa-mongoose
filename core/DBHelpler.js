const mongoose = require("mongoose");
const config = require("../config/config");

// 连接到数据库
mongoose
  .connect(config.DB_URL)
  .then(() =>
    console.log(
      `MongoDB: ${config.DB_NAME}, DB_HOST: ${config.MONGO_HOSTNAME} connection opened!`
    )
  )
  .catch((err) => console.log("Mongoose connection error: " + err));

// 监听连接异常
mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error: " + err);
});

// 监听断开连接
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection disconnected");
});

module.exports = mongoose;
