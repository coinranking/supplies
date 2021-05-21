const Driver = require('../models/driver');
const Supply = require('../models/supply');
const SupplyModifier = require('../models/supply-modifier');
const Coin = require('../models/coin');
const { promisesMap } = require('../util');

/** CPCoin driver. Supports max, total
 * and circulating supply for native
 * CPC coin on own blockchain
 *
 * @augments Driver
 * @memberof Driver
 */
class CPCoin extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        max: true,
        circulating: true,
      },
      options,
    });
  }

  /**
   *
   * @augments Driver.fetchMaxSupply
   * @async
   */
  async fetchMaxSupply() {
    const max = await this.request('https://supply.cpcoin.io/totalsupply');

    return Number(max);
  }

  /** fetch total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request('https://explorer.cpcoin.io/assets/supply-circ.html');
    return Number(total);
  }

  /** get balance for specific wallet address
   *
   * @augments Driver.fetchBalance
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchBalance(modifier) {
    const { balanceTQT: balance } = await this.request(`https://forge.infinity-economics.org/api?requestType=getAccount&account=${modifier}`);

    return Number(balance) / 10 ** 8;
  }

  /**
   * @augments Driver.getSupply
   * @param {Coin} coin {@link Coin}
   */
  async getSupply({ modifiers }) {
    const max = await this.fetchMaxSupply();

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

module.exports = CPCoin;
