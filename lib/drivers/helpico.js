const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');
const SupplyModifier = require('../models/supply-modifier');
const { promisesMap } = require('../util');

/**
 * Helpico driver. Supports total supply and balance
 * for specific wallet address for native token GMT on
 * Helpico blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Helpico extends Driver {
  constructor(options) {
    super(
      {
        timeout: 100, // 10 requiest per second
        supports: {
          balances: true,
          blockchains: ['Helpico'],
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
    const supply = await this.request('http://helpico.tech/ext/getmoneysupply');

    return Number(supply);
  }

  /** get balance for specific wallet address
   *
   * @augments Driver.fetchBalance
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchBalance(modifier) {
    const balance = await this.request(
      `http://helpico.tech/ext/getbalance/${modifier}`,
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

module.exports = Helpico;
