const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');
const SupplyModifier = require('../models/supply-modifier');
const { promisesMap } = require('../util');

/** Algorand driver. Supports total supply
 * and balance for specific wallet address
 * for native token on their blockchain
 * Algorand.
 *
 * @memberof Driver
 * @augments Driver
 */
class Algorand extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requiest per second
      supports: {
        balances: true,
        blockchains: ['Algorand'],
      },
      options,
    });
  }

  /** get total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const { totalSupply: supply } = await this.request(
      'https://api.algoexplorer.io/v1/status',
    );
    return Number(supply);
  }

  /** get balance for specific wallet address
   *
   * @augments Driver.fetchBalance
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchBalance(modifier) {
    const { balance } = await this.request(
      `https://api.algoexplorer.io/v1/account/${modifier}`,
    );
    return Number(balance) / 10 ** 6;
  }

  /** get supply
   *
   * @param {Coin} coin {@link Coin}
   */
  async getSupply({ modifiers }) {
    const total = await this.fetchTotalSupply();

    const modifiersWithBalances = await promisesMap(
      modifiers,
      async (modifier) => {
        const balance = await this.fetchBalance(modifier);
        return {
          reference: modifier,
          balance,
        };
      },
    );

    const circulating = modifiersWithBalances.reduce(
      (current, modifier) => current - modifier.balance,
      total,
    );

    return new Supply({
      total,
      circulating,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = Algorand;
