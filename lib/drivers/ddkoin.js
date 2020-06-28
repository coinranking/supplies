const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * DDkoin driver. supports total, max and
 * circulating supply, on own blockchain.
 *
 * @augments Driver
 * @memberof Driver
 */
class Ddkoin extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requiest per second
      supports: {
        circulating: true,
        max: true,
        websockets: true,
        blockchains: ['DDKoin'],
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const data = await this.socket('waitOn', 'ws://68.183.235.184:7008', 'UPDATE_BLOCKCHAIN_INFO');

    return data.circulatingSupply / (10 ** 8);
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const data = await this.socket('waitOn', 'ws://68.183.235.184:7008', 'UPDATE_BLOCKCHAIN_INFO');

    return data.circulatingSupply / (10 ** 8);
  }

  /**
   * @augments Driver.fetchMaxSupply
   * @async
   */
  async fetchMaxSupply() {
    const data = await this.socket('waitOn', 'ws://68.183.235.184:7008', 'UPDATE_BLOCKCHAIN_INFO');

    return data.totalSupply / (10 ** 8);
  }

  /**
   * @augments Driver.getSupply
   * @async
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();
    const circulating = await this.fetchCirculatingSupply();
    const max = await this.fetchMaxSupply();

    return new Supply({
      total,
      circulating,
      max,
    });
  }
}

module.exports = Ddkoin;
