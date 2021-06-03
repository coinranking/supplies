const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Wownero driver. Supports max
 * and total supply for WOW native
 * coin on own blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Wownero extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        max: true,
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 184467440;
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const { data: { coinbase: total } } = await this.request('https://explore.wownero.com/api/emission');

    return Number(total) / 10 ** 11;
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();
    const max = this.fetchMaxSupply();

    return new Supply({
      total,
      max,
    });
  }
}

module.exports = Wownero;
