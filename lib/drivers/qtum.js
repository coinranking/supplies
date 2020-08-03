const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Qtum driver. Supports total, max
 * and circulating supply for native token
 * on own blockchain.
 *
 * @augments Driver
 * @memberof Driver
 */
class Qtum extends Driver {
  constructor(options) {
    super({
      timeout: 200, // 5 requests per second
      supports: {
        circulating: true,
        max: true,
        blockchains: ['Qtum'],
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const supply = await this.request('https://qtum.info/api/supply');
    return Number(supply);
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request(
      'https://qtum.info/api/circulating-supply',
    );
    return Number(circulating);
  }

  /**
   * @augments Driver.fetchMaxSupply
   * @async
   */
  async fetchMaxSupply() {
    const max = await this.request('https://qtum.info/api/total-max-supply');
    return Number(max);
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();
    const max = await this.fetchMaxSupply();

    const circulating = await this.fetchCirculatingSupply();

    return new Supply({
      total,
      circulating,
      max,
    });
  }
}

module.exports = Qtum;
