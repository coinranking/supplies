const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Celo driver. Support
 * circulating and max supply for CELO token on own blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Celo extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        max: true,
        total: false,
        circulating: true,
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchMaxSupply
   * @async
   */
  async fetchMaxSupply() {
    const { total_supply: max } = await this.request('https://thecelo.com/api/?method=celo_circulating');

    return Number(max);
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { circulating } = await this.request('https://thecelo.com/api/?method=celo_circulating');

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

module.exports = Celo;
