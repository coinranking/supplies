const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Blockscan driver. Supports circulating
 * supply for Grin token.
 *
 * @augments Driver
 * @memberof Driver
 */
class Blockscan extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requiest per second
      supports: {
        total: false,
        circulating: true,
        blockchains: ['Grin'],
      },
      options,
    });
  }

  /** get circulating supply for token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
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
    const circulating = await this.fetchCirculatingSupply();

    return new Supply({
      circulating,
    });
  }
}

module.exports = Blockscan;
