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
      blockchain: 'Grin',
      timeout: 100, // 10 requiest per second
      supports: {
        total: false,
        circulating: true,
      },
      options,
    });
  }

  /** get circulating supply for token
   *
   * @augments Driver.fetchCirculatingSupply
   */
  async fetchCirculatingSupply() {
    const { result } = await this.request(
      'https://api-grin.blockscan.com/v1/api?module=stats&action=grinsupply',
    );

    return Number(result);
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const circulating = await this.fetchCirculatingSupply();

    return new Supply({
      circulating,
    });
  }
}

module.exports = Blockscan;
