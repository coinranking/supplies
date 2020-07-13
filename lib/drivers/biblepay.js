const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');
const SupplyModifier = require('../models/supply-modifier');
const Coin = require('../models/coin');

/**
 * BiblePay driver. Support total support
 * and balance for native token BBP, using
 * own blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class BiblePay extends Driver {
  constructor(options) {
    super({
      timeout: 200, // 5 requests per second
      supports: {
        balances: true,
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
    const total = await this.request({
      url: 'http://explorer.biblepay.org/ext/getmoneysupply',
      accept: 'text/html',
    });
    return Number(total);
  }

  /** get balance for specific wallet address
   *
   * @augments Driver.fetchBalance
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchBalance(modifier) {
    const balance = await this.request({
      url: `http://explorer.biblepay.org/ext/getbalance/${modifier}`,
      accept: 'text/html',
    });

    return Number(balance);
  }

  /**
   * @augments Driver.getSupply
   * @param {Coin} modifiers {@link Coin}
   * @async
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

    const circulating = modifiersWithBalances
      .reduce((current, modifier) => current - modifier.balance, total);

    return new Supply({
      total,
      circulating,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = BiblePay;
