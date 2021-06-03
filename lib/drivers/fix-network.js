const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Fix network driver. Supports max and
 * total supply for own FIX coin
 * on own blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class FixNetwork extends Driver {
  constructor(options) {
    super(
      {
        timeout: 100, // 10 requests per second
        supports: {
          max: true,
        },
      },
      options,
    );
  }

  /**
   * @augments Driver.fetchMaxSupply
   * @returns {number}
   */
  fetchMaxSupply() {
    return Number(100000000000);
  }

  /** get circulating supply
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request('https://chain.review/api/db/fix/getmoneysupply');
    return Number(total);
  }

  /** get supply
   *
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

module.exports = FixNetwork;
