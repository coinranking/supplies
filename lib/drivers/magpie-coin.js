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
        total: false,
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
   * @augments Driver.getSupply
   */
  async getSupply() {
    const max = this.fetchMaxSupply();

    return new Supply({
      max,
    });
  }
}

module.exports = MagpieCoin;
