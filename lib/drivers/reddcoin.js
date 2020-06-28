const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Reddcoin driver. Supports
 * circulating supply for native
 * token on own blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Reddcoin extends Driver {
  constructor(options) {
    super({
      supports: {
        circulating: true,
        total: false,
        blockchains: ['Reddcoin'],
      },
      options,
    });
  }

  /** get circulating supply for native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { info: { moneysupply: circulating } } = await this.request('https://live.reddcoin.com/api/status?q=getInfo');

    return Number(circulating);
  }

  /**
   * @augments Driver.getSupply
   * @async
   */
  async getSupply() {
    const circulating = await this.fetchCirculatingSupply();

    return new Supply({
      circulating,
    });
  }
}

module.exports = Reddcoin;
