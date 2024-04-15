const mongoose = require("../core/DBHelpler");

const Schema = mongoose.Schema;

const testSchmea = new Schema({
  name: { type: String },
  age: { type: String, defaeult: "1" },
  emali: { type: String },
});

const testModel = mongoose.model("test", testSchmea);

module.exports = testModel;
