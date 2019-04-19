module.exports = class Coin {
  constructor(options) {
    this.reference = options.reference;
    this.name = options.name;
    this.symbol = options.symbol;
    this.decimals = options.decimals;
    this.modifiers = options.modifiers;
  }
};
