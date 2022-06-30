const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * PlanetFinance driver. Supports max,
 * total and circulating supply for
 * AQUA coin on own blockchain.
 *
 * @augments Driver
 * @memberof Driver
 */
class PlanetFinance extends Driver {
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
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 100000;
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request('https://api.planetfinance.io/totalSupply');

    return Number(total);
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request('https://api.planetfinance.io/circulatingSupply');

    return Number(circulating);
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const max = this.fetchMaxSupply();
    const total = await this.fetchTotalSupply();
    const circulating = await this.fetchCirculatingSupply();

    return new Supply({
      max,
      total,
      circulating,
    });
  }
}

module.exports = PlanetFinance;
