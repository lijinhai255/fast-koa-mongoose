const mongoose = require("../core/DBHelpler");

const TestShema = mongoose.Schema;

const testModel = new TestShema({
  cuid: { type: String, ref: "users" }, // 评论用户的ID
  content: { type: String },
  hands: { type: Number, default: 0 },
  status: { type: String, defaeult: "1" },
  isRead: { type: String, default: "0" },
});

const test = mongoose.model("test", testModel);

export default test;
