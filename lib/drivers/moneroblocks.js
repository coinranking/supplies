const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * MoneroBlocks driver. Supports total
 * and circulating supply on own
 * blockchain Monero.
 *
 * @memberof Driver
 * @augments Driver
 */
class MoneroBlocks extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        circulating: true,
        blockchains: ['Monero'],
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const data = await this.request('http://moneroblocks.info/api/get_stats/');
    return Number(data.total_emission) / 1000000000000;
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const data = await this.request('http://moneroblocks.info/api/get_stats/');
    return Number(data.total_emission) / 1000000000000;
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

module.exports = MoneroBlocks;
