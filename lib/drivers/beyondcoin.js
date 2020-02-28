const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

/** Beyondcoin explorer. Supports total supply
 * and balance for specific address on
 *
 *
 * @memberof Driver
 * @augments Driver
 */
class Beyondcoin extends Driver {
  constructor(options) {
    super({
      blockchain: 'Beyondcoin',
      timeout: 100, // 10 requiest per second
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
      url: 'https://byndexplorer.com/ext/getmoneysupply',
      rejectUnauthorized: false,
    });
    return Number(total);
  }

  /** get balance for specific wallet address
   *
   * @augments Driver.fetchBalance
   * @param {modifierParam} modifier {@link modifierParam}
   * @async
   */
  async fetchBalance(modifier) {
    const balance = await this.request({
      url: `https://byndexplorer.com/ext/getbalance/${modifier}`,
      rejectUnauthorized: false,
    });

    return Number(balance);
  }

  /**
   * @augments Driver.getSupply
   * @param {modifierParam[]} modifiers {@link modifierParam}
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

module.exports = Beyondcoin;
