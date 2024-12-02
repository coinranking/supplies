const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Kylacoin driver. Supports fetching total, circulating and max supply for KCN coin, on it's own
 * blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Kylacoin extends Driver {
  constructor(options) {
    super({
      timeout: 200, // 5 requests per second
      supports: {
        circulating: true,
        total: true,
        max: true,
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchTotalSupply
   */
  async fetchTotalSupply() {
    const { result.total: total } = await this.request('https://api.kcnxp.com/supply');

    return Number(total);
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   */
  async fetchCirculatingSupply() {
    const { result.circulating: circulating } = await this.request('https://api.kcnxp.com/supply');

    return Number(circulating);
  }

  /**
   * @augments Driver.fetchMaxSupply
   */
  async fetchMaxSupply() {
    const { result.max: circulating } = await this.request('https://api.kcnxp.com/supply');

    return Number(max);
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

module.exports = Kylacoin;
