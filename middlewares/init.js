const {
  initRedis,
  setValue,
  getHValue,
  delValue,
} = require("../core/RedisConfig");

const run = async () => {
  // 初始化redis
  const data = await initRedis();
  setValue("lijinhai", { name: "admin", age: 18 });
  const value = await getHValue("lijinhai");
  console.log(value, "value-value");
  await delValue("lijinhai");
};

module.exports = { run };
