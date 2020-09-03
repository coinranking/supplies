const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');
const SupplyModifier = require('../models/supply-modifier');
const { promisesMap } = require('../util');

/** OneWorldCoin explorer.
 *
 * @memberof Driver
 * @augments Driver
 */
class OneWorldCoin extends Driver {
  constructor(options) {
    super({
      timeout: 1500, // their api request to be min 1sec differences between two requests
      supports: {
        max: true,
        balances: true,
        blockchains: ['Quark'],
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 500000000;
  }

  /** get total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request('https://owo.ccore.online/ext/getmoneysupply');

    return Number(total);
  }

  /** get balance for specific wallet address
   *
   * @augments Driver.fetchBalance
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchBalance(modifier) {
    const balance = await this.request(`https://owo.ccore.online/ext/getbalance/${modifier}`);

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
      circulating,
      max,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = OneWorldCoin;
