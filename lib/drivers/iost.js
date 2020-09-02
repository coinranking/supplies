const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');
const SupplyModifier = require('../models/supply-modifier');
const { promisesMap } = require('../util');

/** Iost explorer.
 *
 * @memberof Driver
 * @augments Driver
 */
class Iost extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        max: true,
        balances: true,
        blockchains: ['Iost'],
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 21000000;
  }

  /** get total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const { current_supply_float: total } = await this.request('https://api.iost.io/getTokenInfo/iost/true');
    return Number(total);
  }

  /** get balance for specific wallet address
   *
   * @augments Driver.fetchBalance
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchBalance(modifier) {
    const { balance } = await this.request(
      `https://api.iost.io/getAccount/${modifier}/true`,
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
      max,
      total,
      circulating,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = Iost;
