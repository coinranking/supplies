const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Unlimited Fiscus Governance Coin driver. Supports max
 * and circulating supply on Ethereum
 * blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class UnlimitedFiscussFyi extends Driver {
  constructor(options) {
    super(
      {
        timeout: 100, // 10 requests per second
        supports: {
          total: false,
          circulating: true,
        },
      },
      options,
    );
  }

  /** get circulating supply
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { circulatingSupply: circulating } = await this.request('https://fiscus.fyi/api/v1/uFFYI/circulatingSupply');
    return Number(circulating) / 10 ** 18;
  }

  /** get supply
   *
   * @augments Driver.getSupply
   */
  async getSupply() {
    const circulating = await this.fetchCirculatingSupply();

    return new Supply({
      circulating,
    });
  }
}

module.exports = UnlimitedFiscussFyi;
