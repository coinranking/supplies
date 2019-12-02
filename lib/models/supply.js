const SupplyModifier = require('./supply-modifier');

class Supply {
  constructor(options) {
    this.total = options.total;
    this.circulating = options.circulating;
    this.max = options.max;
    if (options.modifiers) {
      this.modifiers = options.modifiers.map((modifier) => new SupplyModifier(modifier));
    }
  }
}

module.exports = Supply;
