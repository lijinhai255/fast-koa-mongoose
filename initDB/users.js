const { ObjectId } = require("mongoose").Types;
const Users = require("../module/User");

const users = [
  {
    _id: new ObjectId("5e78d19578c4d0c06e480a0b"),
    favs: 1,
    gender: "",
    roles: ["user"],
    pic: "http://admin.dev.toimc.com:22000/img/header.jpg",
    mobile: "15895932504",
    status: "0",
    regmark: "用户很懒，什么都没有留下~",
    location: "",
    isVip: "0",
    count: 1,
    name: "toimc_admin",
    username: "toimc_admin@toimc.com",
    password: "123456",
    created: new Date("2020-03-23T15:11:17.241Z"),
    openid: "",
    unionid: "",
    updated: new Date("2023-03-01T09:01:41.957Z"),
    score: 0,
  },
  {
    _id: new ObjectId("63ff3dc561155cf21b21ed02"),
    favs: 1,
    gender: "",
    roles: ["admin", "user"],
    pic: "/img/header.jpg",
    mobile: "13412341234",
    status: "0",
    regmark: "用户很懒，什么都没有留下~",
    location: "",
    isVip: "0",
    count: 0,
    score: 0,
    openid: "",
    unionid: "",
    name: "测试管理员用户",
    username: "test@toimc.com",
    password: "123456",
    created: new Date("2023-03-01T11:57:57.886Z"),
    updated: new Date("2023-03-01T11:57:57.886Z"),
  },
];

module.exports = async () => {
  try {
    for (const item of users) {
      const updateResult = await Users.updateOne(
        { _id: item._id },
        { $set: item },
        { upsert: true }
      );

      console.log(`Update result for ${item._id}:`, updateResult);
    }
    console.log("All users updated successfully");
  } catch (error) {
    console.error("Error updating users data", error);
  }
};
// If this is a standalone script, you might need to call the function
if (require.main === module) {
  module
    .exports()
    .then(() => console.log("Script completed"))
    .catch((err) => console.error("Script failed with error:", err));
}
