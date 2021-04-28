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
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const { circulating: total } = await this.request('https://thecelo.com/api/?method=celo_circulating');

    return Number(total);
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { circulating_without_reserve_team: circulating } = await this.request('https://thecelo.com/api/?method=celo_circulating');

    return Number(circulating);
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const max = await this.fetchMaxSupply();
    const total = await this.fetchTotalSupply();
    const circulating = await this.fetchCirculatingSupply();

    return new Supply({
      max,
      total,
      circulating,
    });
  }
}

module.exports = Celo;
