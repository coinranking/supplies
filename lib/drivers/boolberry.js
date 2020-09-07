const Driver = require('../models/driver');
const Supply = require('../models/supply');

/** Boolberry driver. Supports total and
 * circulating supply for BBR token
 * on Boolberry blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Boolberry extends Driver {
  constructor(options) {
    super({
      timeout: 200, // 5 requests per second
      supports: {
        circulating: true,
        blockchains: ['Boolberry'],
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
      url: 'https://explorer.boolberry.com/api/total_supply',
      rejectUnauthorized: false,
    });

    return Number(total);
  }

  /** get circulating supply for native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request({
      url: 'https://explorer.boolberry.com/api/current_supply',
      rejectUnauthorized: false,
    });

    return Number(circulating);
  }

  /** get supply
   *
   * @augments Driver.getSupply
   * @async
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();
    const circulating = await this.fetchCirculatingSupply();

    return new Supply({
      total,
      circulating,
    });
  }
}

module.exports = Boolberry;
