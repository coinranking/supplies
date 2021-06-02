const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Chia driver. Supports total and circulating supply
 * for XCH coin on own blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Chia extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        circulating: true,
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const { xch: total } = await this.request('https://xchscan.com/api/total-supply');

    return Number(total);
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { xch: circulating } = await this.request('https://xchscan.com/api/circulating-supply');

    return Number(circulating);
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const circulating = await this.fetchCirculatingSupply();
    const total = await this.fetchTotalSupply();

    return new Supply({
      total,
      circulating,
    });
  }
}

module.exports = Chia;
