class SupplyModifier {
  constructor(options) {
    this.description = options.description;
    this.reference = options.reference;
    this.balance = options.balance;
  }
}

module.exports = class Supply {
  constructor(options) {
    this.total = options.total;
    this.circulating = options.circulating;
    this.max = options.max;
    if (options.modifiers) {
      this.modifiers = options.modifiers.map(modifier => new SupplyModifier(modifier));
    }
  }
};
