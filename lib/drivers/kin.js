const Driver = require('../models/driver');
const Supply = require('../models/supply');

/** Kin driver. Support circulating and
 * max supply for Kin on Kin
 * blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Kin extends Driver {
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

  /** get max supply
   *
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 10000000000000;
  }

  /** get circulating supply
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request('https://stats.kininfrastructure.com/kin-in-circulation/');

    return Number(circulating);
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const max = this.fetchMaxSupply();
    const circulating = await this.fetchCirculatingSupply();

    return new Supply({
      max,
      circulating,
    });
  }
}

module.exports = Kin;
