/**
 * Coin model provided to drivers that support multiple coins.
 *
 * @class
 * @property {object} options The parameters of the coin.
 * @property {string} options.reference
 *   The unique identifier of a coin. Usually a smart contract address.
 * @property {string} options.name The name of the coin.
 * @property {string} options.symbol
 *   The symbol of the coin. Most of the time three characters long. E.g. BTC.
 * @property {string} options.decimals
 *   The amount of precision this coin uses. For most blockchains, this defaults to 18.
 * @property {Array} options.modifiers
 *   List of addresses of which the balance should be substracted from the supply to get
 *   the circulating supply. E.g. for ethereum the balance of address
 *   0x0000000000000000000000000000000000000000 is substracted, because tokens are sent
 *   there to get 'burned'.
 */
class Coin {
  constructor(options) {
    this.reference = options.reference;
    this.name = options.name;
    this.symbol = options.symbol;
    this.decimals = options.decimals;
    this.modifiers = options.modifiers || [];
  }
}

module.exports = Coin;
