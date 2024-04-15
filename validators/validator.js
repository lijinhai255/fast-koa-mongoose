const { LinValidator, Rule } = require("../core/lin-validator-v2");

class PositIntegerValidator extends LinValidator {
  constructor() {
    super();
    this.id = [new Rule("isInt", "id 必须是整数", { min: 1 })];
  }
}

module.exports = {
  PositIntegerValidator,
};
