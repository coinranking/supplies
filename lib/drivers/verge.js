const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');
const SupplyModifier = require('../models/supply-modifier');
const { promisesMap } = require('../util');

/**
 * Verge driver. Supports total supply and balance
 * for specific wallet address for native token XVG on
 * Verge blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Verge extends Driver {
  constructor(options) {
    super(
      {
        timeout: 100, // 10 requests per second
        supports: {
          balances: true,
          blockchains: ['Verge'],
        },
      },
      options,
    );
  }

  /** get total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const { data: { moneysupply: supply } } = await this.request('https://verge-blockchain.info/api/moneysupply');

    return Number(supply);
  }

  /** get balance for specific wallet address
   *
   * @augments Driver.fetchBalance
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchBalance(modifier) {
    const { data: { balance } } = await this.request(
      `https://verge-blockchain.info/api/balance/${modifier}`,
    );
    return Number(balance);
  }

  /** get supply
   *
   * @augments Driver.getSupply
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

module.exports = Verge;
