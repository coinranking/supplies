const Driver = require('../models/driver');
const Supply = require('../models/supply');

/** Ryo explorer. Supports circulating supply
 * for native token Ryo.
 *
 * @augments Driver
 * @memberof Driver
 */
class RyoExplorer extends Driver {
  constructor(options) {
    super({
      blockchain: 'Ryo',
      timeout: 200, // 5 requests per second
      supports: {
        circulating: true,
        total: true,
        max: true,
      },
      options,
    });
  }

  /** fetch total supply for native token.
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const {
      data: { coinbase },
    } = await this.request('https://explorer.ryo-currency.com/api/emission');
    return Number(coinbase) / 10 ** 9;
  }

  /** fetch circulating supply for native token.
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const {
      data: { coinbase },
    } = await this.request('https://explorer.ryo-currency.com/api/emission');
    return Number(coinbase) / 10 ** 9;
  }

  /**
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 88188888;
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();
    const circulating = await this.fetchCirculatingSupply();
    const max = await this.fetchMaxSupply();

    return new Supply({
      total,
      circulating,
      max,
    });
  }
}

module.exports = RyoExplorer;
