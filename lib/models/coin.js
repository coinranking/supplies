const CoinModifier = require('./coin-modifier');

class Coin {
  constructor(options) {
    this.reference = options.reference;
    this.name = options.name;
    this.symbol = options.symbol;
    this.blockchain = options.blockchain;
    this.decimals = options.decimals;
    this.maxSupply = options.maxSupply;
    this.totalSupply = options.totalSupply;
    this.circulatingSupply = options.circulatingSupply;
    if (options.modifiers) {
      this.modifiers = options.modifiers.map((modifier) => new CoinModifier(modifier));
    }
  }
}

module.exports = Coin;
