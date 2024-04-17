const mongoose = require("../core/DBHelpler");
const { getTempName } = require("../utils/utils");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, index: { unique: true }, sparse: true },
    password: { type: String },
    name: { type: String },
    // created: { type: Date },
    // updated: { type: Date },
    favs: { type: Number, default: 100 },
    gender: { type: String, default: "" },
    roles: { type: Array, default: ["user"] },
    pic: { type: String, default: "/img/header.jpg" },
    mobile: { type: String, match: /^1[3-9](\d{9})$/, default: "" },
    status: { type: String, default: "0" },
    regmark: { type: String, default: "" },
    location: { type: String, default: "" },
    isVip: { type: String, default: "0" },
    expire: { type: Date },
    count: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
    openid: { type: String, default: "" },
    unionid: { type: String, default: "" }, // 对于开放平台的
  },
  { timestamps: { createdAt: "created", updatedAt: "updated" } }
);

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
