const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Nash driver. Supports max
 * supply and circulating supply
 * for NEX token on NEO blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Nash extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        total: false,
        max: true,
        circulating: true,
      },
      options,
    });
  }

  /**
   * get total supply for native token
   *
   * @augments Driver.fetchMaxSupply
   * @async
   */
  fetchMaxSupply() {
    return 50000000;
  }

  /**
   * get circulating supply
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulatingSupply = await this.request('https://app.nash.io/api/nex_data/circulating_supply');
    return Number(circulatingSupply);
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const max = this.fetchMaxSupply();
    const circulating = await this.fetchCirculatingSupply();

    return new Supply({
      max,
      circulating,
    });
  }
}

module.exports = Nash;
