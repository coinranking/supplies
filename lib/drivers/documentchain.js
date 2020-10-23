const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Documentchain driver. Supports max, total and
 * circulating supply for DMS token on Documentchain
 * blockchain.
 *
 * @augments Driver
 * @memberof Driver
 */
class Documentchain extends Driver {
  constructor(options) {
    super({
      timeout: 200, // 5 requests per second
      supports: {
        circulating: true,
        max: true,
        blockchains: ['Documentchain'],
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchMaxSupply
   * @async
   */
  async fetchMaxSupply() {
    const max = await this.request('https://explorer.dms.cash/circular-dms/?return=max');

    return Number(max);
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request('https://explorer.dms.cash/circular-dms/');

    return Number(total);
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request('https://explorer.dms.cash/circular-dms/?return=circulating');
    return Number(circulating);
  }

  /**
   * @augments Driver.getSupply
   * @async
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();
    const circulating = await this.fetchCirculatingSupply();
    const max = await this.fetchMaxSupply();

    return new Supply({
      max,
      total,
      circulating,
    });
  }
}

module.exports = Documentchain;
