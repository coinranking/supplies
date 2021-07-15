const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Mina driver. Supports circulating
 * and total supply on own
 * blockchain Mina.
 *
 * @memberof Driver
 * @augments Driver
 */
class Mina extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 request per second
      supports: {
        total: true,
        circulating: true,
      },
      options,
    });
  }

  /** get total supply of the native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const { totalCurrency: total } = await this.request('https://api.minaexplorer.com/summary');

    return Number(total);
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { circulatingSupply: circulating } = await this.request('https://api.minaexplorer.com/summary');

    return Number(circulating);
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();
    const circulating = await this.fetchCirculatingSupply();

    return new Supply({
      circulating,
      total,
    });
  }
}

module.exports = Mina;
