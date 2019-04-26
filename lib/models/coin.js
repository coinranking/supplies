class CoinModifier {
  constructor(options) {
    this.description = options.description;
    this.reference = options.reference;
  }
}

class Coin {
  constructor(options) {
    this.reference = options.reference;
    this.name = options.name;
    this.symbol = options.symbol;
    this.blockchain = options.blockchain;
    this.decimals = options.decimals;
    this.maxSupply = options.maxSupply;
    if (options.modifiers) {
      this.modifiers = options.modifiers.map(modifier => new CoinModifier(modifier));
    }
  }
}

module.exports = Coin;
