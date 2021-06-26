const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Altura driver. Supports total, max and circulating
 * supply for native ALU coin on own blockchain Altura.
 *
 * @memberof Driver
 * @augments Driver
 */
class Altura extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 request per second
      supports: {
        total: true,
        max: true,
        circulating: true,
      },
      options,
    });
  }

  /** get max supply for native token
   *
   * @param Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 1000000000;
  }

  /** get total supply of the native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request('https://www.alturanft.com/api/totalcoins');

    return Number(total);
  }

  /** get circulating supply of the native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request('https://www.alturanft.com/api/circulatingcoins');

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

module.exports = Altura;
