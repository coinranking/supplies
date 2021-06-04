const Driver = require('../models/driver');
const Supply = require('../models/supply');
const SupplyModifier = require('../models/supply-modifier');
const Coin = require('../models/coin');
const { promisesMap } = require('../util');

/**
 * MagpieCoin driver. Supports max
 * supply on own blockchain with native
 * MGPC coin.
 *
 * @memberof Driver
 * @augments Driver
 */
class MagpieCoin extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        max: true,
        balances: true,
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 68948811840;
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request(
      'http://explorer.magpiecoin.org/ext/getmoneysupply',
    );

    return Number(total);
  }

  /** get balance for specific wallet address
   *
   * @augments Driver.fetchBalance
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchBalance(modifier) {
    const balance = await this.request(
      `http://explorer.magpiecoin.org/ext/getbalance/${modifier}`,
    );
    return Number(balance);
  }

  /**
   * @augments Driver.getSupply
   * @param {Coin} coin {@link Coin}
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

module.exports = MagpieCoin;
