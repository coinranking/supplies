const SupplyModifier = require('./supply-modifier');

/**
 * Supply model, returned from all drivers.
 *
 * @namespace Supply
 * @class
 * @property {object} options The parameters of the supply.
 * @property {number} options.total
 *   The amount of coins that is currently available on the blockchain, through either mining
 *   or pre-mined.
 * @property {number} options.circulating
 *   The total amount of coins, minus coins that are withold from the public. Coins can be withold
 *   by means of burning, escrowing or being pre-mined and undistributed. The circulating supply is
 *   fetched directly from a source or calculated by fetching modifiers, see options.modifiers in
 *   {@link Coin}.
 * @property {number} options.max
 *   In contrast to the total supply, the max supply is not only the currently available supply,
 *   but also the amount of coins that can be reached in the future. It's relevance differs per
 *   blockchain. E.g. Bitcoin has a fixed maximum supply of 21 million coins, upon which all it's
 *   coins are mined. Ethereum can also be mined, but for now there is an indefinite amount and
 *   thus no max supply. Other blockchains come pre-mined or might be completely mined already,
 *   which means the max supply equals the total supply.
 * @property {Array.<SupplyModifier>} options.modifiers
 *   Consists of a list of suply modifiers. See {@link SupplyModifier}.
 */
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
