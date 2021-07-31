const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * CloverFinance driver. Support total and circulating supply.
 *
 * @memberof Driver
 * @augments Driver
 */
class CloverFinance extends Driver {
  constructor(options) {
    super({
      timeout: 200, // 5 requests per second
      supports: {},
      options,
    });
  }

  /** get total supply
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request('https://tx-api.clover.finance/api/clv/totalSupply');
    return Number(total);
  }

  /** get total supply
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request('https://tx-api.clover.finance/api/clv/circulatingSupply');
    return Number(circulating);
  }

  /**
   * @augments Driver.getSupply
   * @async
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

module.exports = CloverFinance;
