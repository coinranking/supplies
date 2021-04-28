const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Avalanche driver. Support
 * total and circualting supply for AVAX token on own blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Avalanche extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        circulating: true,
        max: true,
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchMaxSupply
   * @async
   */
  fetchMaxSupply() {
    return 720000000;
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const { totalSupply: total } = await this.request('https://avascan.info/api/v1/supply');

    return Number(total);
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { circulatingSupply: circulating } = await this.request('https://avascan.info/api/v1/supply');

    return Number(circulating);
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();
    const max = this.fetchMaxSupply();
    const circulating = await this.fetchCirculatingSupply();

    return new Supply({
      total,
      max,
      circulating,
    });
  }
}

module.exports = Avalanche;
