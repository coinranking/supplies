const Driver = require('../models/driver');
const Supply = require('../models/supply');

/** Hathor driver. Supports fetching total supply
 * and circulating supply for HTR coin, on it's
 * own blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Hathor extends Driver {
  constructor(options) {
    super({
      timeout: 200, // 5 requests per second
      supports: {
        circulating: true,
        total: true,
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   */
  async fetchTotalSupply() {
    const { total_supply: total } = await this.request('https://api.economics.hathor.network/status');

    return Number(total.replace(/,/g, ''));
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   */
  async fetchCirculatingSupply() {
    const { circulating_supply: circulating } = await this.request('https://api.economics.hathor.network/status');

    return Number(circulating.replace(/,/g, ''));
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();
    const circulating = await this.fetchCirculatingSupply();

    return new Supply({
      total,
      circulating,
    });
  }
}

module.exports = Hathor;
