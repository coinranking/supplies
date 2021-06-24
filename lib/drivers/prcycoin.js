const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * PrcyCoin driver. Supports total supply
 * and balance for PRCY coin on
 * own blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class PrcyCoin extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        max: true,
        circulating: true,
      },
      options,
    });
  }

  /**
   * @augments Driver.fecthMaxSupply
   */
  fecthMaxSupply() {
    return 70000000;
  }

  /** total supply for native coin
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const supply = await this.request('https://explorer.prcycoin.com/ext/getmoneysupply');

    return Number(supply);
  }

  /** circulating supply for native coin
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request('https://api.prcycoin.com/api/getcirculatingsupply');

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

module.exports = PrcyCoin;
