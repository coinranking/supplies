const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

/**
 * Xaya driver. Supports balance and total supply for chi token
 * on the Xaya blockchain.
 *
 * @augments Driver
 * @memberof Driver
 */
class Xaya extends Driver {
  constructor(options) {
    super({
      blockchain: 'Xaya',
      timeout: 100, // 10 requiest per second
      supports: {
        native: true,
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
    const {
      amount: { total },
    } = await this.request('https://explorer.xaya.io/api/gettxoutsetinfo');

    return Number(total);
  }

  /** get balance for specific wallet address
   *
   * @augments Driver.fetchBalance
   * @param {modifierParam} modifier {@link modifierParam}
   * @async
   */
  async fetchBalance(modifier) {
    const data = await this.request(
      `https://explorer.xaya.io/api/gettransactionsbyaddress/${modifier}`,
    );

    if (!data.length) {
      return 0;
    }

    const record = data.pop();
    return Number(record.credit);
  }

  /** get supply
   *
   * @augments Driver.getSupply
   * @param {modifierParam[]} modifiers {@link modifierParam}
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

module.exports = Xaya;
