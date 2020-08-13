const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');
const SupplyModifier = require('../models/supply-modifier');
const { promisesMap } = require('../util');

/** Adamant driver. Supports max and
 * total supply, along with balance for
 * specific wallet address of
 * native token AMD on Adamant blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Adamant extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 request per second
      supports: {
        balances: true,
        max: true,
        blockchains: ['Adamant'],
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 200000000;
  }

  /** get total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const supply = await this.request('https://explorer.adamant.im/api/totalSupply');
    return Number(supply);
  }

  /** get balance for specific wallet address
   *
   * @augments Driver.fetchBalance
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchBalance(modifier) {
    const { account: { balance } } = await this.request(
      `https://endless.adamant.im/api/accounts?address=${modifier}`,
    );
    return Number(balance) / 10 ** 8;
  }

  /** get supply
   *
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

module.exports = Adamant;
