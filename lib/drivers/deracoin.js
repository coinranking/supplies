const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');
const SupplyModifier = require('../models/supply-modifier');
const Coin = require('../models/coin');

/**
 * Deracoin driver. supports max supply, total supply
 * and balance for specific address for
 * native token DRC on their own blockchain Deracoin.
 *
 * @augments Driver
 * @memberof Driver
 */
class Deracoin extends Driver {
  constructor(options) {
    super(
      {
        timeout: 100, // 10 requests per second
        supports: {
          max: true,
          total: true,
          balances: true,
        },
      },
      options,
    );
  }

  /**
   * @param Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 84000000;
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const supply = await this.request('http://deracoin-explorer.com:3001/ext/getmoneysupply');

    return Number(supply);
  }

  /**
   *
   * @augments Driver.fetchBalance
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchBalance(modifier) {
    const balance = await this.request(
      `http://deracoin-explorer.com:3001/ext/getbalance/${modifier}`,
    );
    return Number(balance);
  }

  /**
   * @augments Driver.getSupply
   * @param {Coin} coin {@link coin}
   */
  async getSupply({ modifiers }) {
    const max = this.fetchMaxSupply();
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
      max,
      total,
      circulating,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = Deracoin;
