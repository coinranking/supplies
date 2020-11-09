const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * FileCoin driver. Supports max
 * and circulating supply
 * on own blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class FileCoin extends Driver {
  constructor(options) {
    super(
      {
        timeout: 100, // 10 requests per second
        supports: {
          total: false,
          max: true,
          circulating: true,
        },
      },
      options,
    );
  }

  /** get max supply
   *
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return Number(2000000000);
  }

  /** get circulating supply
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request('https://api.node.glif.io/statecirculatingsupply/fil');

    if (!circulating) throw new Error('Circulating supply is null');

    return Number(circulating);
  }

  /** get supply
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

module.exports = FileCoin;
