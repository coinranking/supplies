const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Fiscus Governance Coin driver. Supports max
 * and circulating supply on Ethereum
 * blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class FiscussFyi extends Driver {
  constructor(options) {
    super(
      {
        timeout: 100, // 10 requests per second
        supports: {
          max: true,
          total: false,
          circulating: true,
        },
      },
      options,
    );
  }

  fetchMaxSupply() {
    return Number(60000);
  }

  /**
   * get circulating supply
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { circulatingSupply: circulating } = await this.request('https://fiscus.fyi/api/v1/FFYI/circulatingSupply');
    return Number(circulating) / 10 ** 18;
  }

  /**
   * get supply
   *
   * @augments Driver.getSupply
   */
  async getSupply() {
    const max = this.fetchMaxSupply();
    const circulating = await this.fetchCirculatingSupply();

    return new Supply({
      circulating,
      max,
    });
  }
}

module.exports = FiscussFyi;
