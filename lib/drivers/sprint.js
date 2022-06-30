const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');
const SupplyModifier = require('../models/supply-modifier');
const { promisesMap } = require('../util');

/**
 * Sprint driver. Supports total and max supply
 * , as well balance for SPRX coin, on own
 * blockchain Sprint.
 *
 * @augments Driver
 * @memberof Driver
 */
class Sprint extends Driver {
  constructor(options) {
    super({
      timeout: 1000, // 1 requests per second
      supports: {
        native: true,
        balances: true,
        max: true,
        blockchains: ['Sprint'],
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 100000000;
  }

  /**
   * get total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const supply = await this.request(
      'http://chain.sprintpay.net/ext/getmoneysupply',
    );

    return Number(supply);
  }

  /**
   * get balance for specific wallet address
   *
   * @augments Driver.fetchBalance
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchBalance(modifier) {
    const balance = await this.request(
      `http://chain.sprintpay.net/ext/getbalance/${modifier}`,
    );

    return Number(balance);
  }

  /**
   * @augments Driver.getSupply
   * @param {Coin} coin {@link Coin}
   */
  async getSupply({ modifiers }) {
    const total = await this.fetchTotalSupply();
    const max = this.fetchMaxSupply();

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
      max,
      circulating,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = Sprint;
