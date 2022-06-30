const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Jiviz explorer. Supports
 * total and circulating supply for
 * token (JVZ) on own blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Jiviz extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        total: false,
        max: true,
        circulating: true,
      },
      options,
    });
  }

  /**
   * get max supply
   *
   * @augments Driver.fetchMaxSupply
   * @async
   */
  async fetchMaxSupply() {
    const { Total_Max_Supply: max } = await this.request('https://jivizcoin.com/getcirculationsupplies');

    return Number(max);
  }

  /**
   * get circulating supply
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { Circulating_Supply: circulating } = await this.request('https://jivizcoin.com/getcirculationsupplies');

    return Number(circulating);
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const circulating = await this.fetchCirculatingSupply();
    const max = await this.fetchMaxSupply();

    return new Supply({
      circulating,
      max,
    });
  }
}

module.exports = Jiviz;
