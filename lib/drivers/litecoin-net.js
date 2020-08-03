const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * LitecoinNet driver.
 *
 * @memberof Driver
 * @augments Driver
 */
class LitecoinNet extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 request per second
      supports: {
        circulating: true,
        max: true,
        blockchains: ['Litecoin'],
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request('http://explorer.litecoin.net/chain/Litecoin/q/totalbc');
    return Number(total);
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request('http://explorer.litecoin.net/chain/Litecoin/q/totalbc');
    return Number(circulating);
  }

  /**
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 84000000;
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();
    const circulating = await this.fetchCirculatingSupply();
    const max = this.fetchMaxSupply();

    return new Supply({
      total,
      circulating,
      max,
    });
  }
}

module.exports = LitecoinNet;
