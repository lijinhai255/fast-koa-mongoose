const User = require("./testMongo");

const user = {
  name: "Brian",
  age: 18,
  emali: "imoocbrian@qq.com",
};
// 增

const add = async () => {
  const result = await User.create(user);
  console.log(result);
};
// add();

// 查找

const find = async () => {
  const result = await User.find();
  console.log(result);
};

find();
//改

const update = async () => {
  const result = await User.updateOne({ name: "Brian" }, { age: 20 });
  console.log(result);
};
// find();

// update();
// 删

const remove = async () => {
  const result = await User.deleteOne({ name: "Brian" });
  console.log(result);
};
remove();
