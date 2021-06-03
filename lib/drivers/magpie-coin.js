const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * MagpieCoin driver. Supports max
 * supply on own blockchain with native
 * MGPC coin.
 *
 * @memberof Driver
 * @augments Driver
 */
class MagpieCoin extends Driver {
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
    return 68948811840;
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request(
      'http://explorer.magpiecoin.org/ext/getmoneysupply',
    );

    return Number(total);
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const max = this.fetchMaxSupply();
    const total = await this.fetchTotalSupply();

    return new Supply({
      max,
      total,
    });
  }
}

module.exports = MagpieCoin;
