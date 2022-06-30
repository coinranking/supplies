const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * CPCoin driver. Supports max, total
 * and circulating supply for native
 * CPC coin on own blockchain
 *
 * @augments Driver
 * @memberof Driver
 */
class CPCoin extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        total: true,
        circulating: true,
      },
      options,
    });
  }

  /**
   * fetch total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request('https://supply.cpcoin.io/totalsupply');
    return Number(total);
  }

  /**
   * fetch circulating supply for native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request('https://explorer.cpcoin.io/assets/supply-circ.html');
    return Number(circulating);
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

module.exports = CPCoin;
