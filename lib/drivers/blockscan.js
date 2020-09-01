const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Blockscan driver. Supports total
 * supply for Grin token.
 *
 * @augments Driver
 * @memberof Driver
 */
class Blockscan extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        total: true,
        blockchains: ['Grin'],
      },
      options,
    });
  }

  /** Get total supply for Grin
   *
   * @augments Driver.fetchTotalSupply
   */
  async fetchTotalSupply() {
    const { result } = await this.request(
      'https://api-grin.blockscan.com/v1/api?module=stats&action=grinsupply',
    );

    return Number(result);
  }

  /**
   * @augments Driver.getSupply
   * @async
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();

    return new Supply({
      total,
    });
  }
}

module.exports = Blockscan;
