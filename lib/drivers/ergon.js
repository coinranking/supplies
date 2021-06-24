const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');
const SupplyModifier = require('../models/supply-modifier');
const Coin = require('../models/coin');

/**
 * Ergon driver. upports total supply
 * and balance for specific address for
 * native token XRG on their own blockchain Ergon.
 *
 * @augments Driver
 * @memberof Driver
 */
class Ergon extends Driver {
  constructor(options) {
    super(
      {
        timeout: 100, // 10 requests per second
        supports: {
          total: true,
          balances: true,
        },
      },
      options,
    );
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const supply = await this.request('https://explorer.ergon.network/ext/getmoneysupply');

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
      `https://explorer.ergon.network/ext/getbalance/${modifier}`,
    );
    return Number(balance);
  }

  /**
   * @augments Driver.getSupply
   * @param {Coin} coin {@link coin}
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

module.exports = Ergon;
