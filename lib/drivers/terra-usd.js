const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Terra explorer. Supports total supply, circulating supply
 * and balance for specific address
 * on Terra blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class TerraUSD extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        circulating: true,
      },
      options,
    });
  }

  /** get total supply for usd coin
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request('http://fcd.terra.dev/v1/totalsupply/ust');

    return Number(total);
  }

  /** get circulating supply for usd coin
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request('http://fcd.terra.dev/v1/circulatingsupply/ust');

    console.log('cir', circulating);
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

module.exports = TerraUSD;
