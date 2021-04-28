const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Wax driver. Supports circulating and  total supply for WAX token
 * on the own blockchain.
 *
 * @augments Driver
 * @memberof Driver
 */
class Wax extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        circulating: true,
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
    const total = await this.request('https://public-wax-on.wax.io/supply/?type=total');

    return Number(total);
  }

  /** get circulating supply for native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request('https://public-wax-on.wax.io/supply/?type=circulating');

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

module.exports = Wax;
