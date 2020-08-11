const Driver = require('../models/driver');
const Supply = require('../models/supply');

/** Elrond driver. Supports circulating and max
 *  supply for native token ERD on
 *  Elrond blockchain
 *
 * @memberof Driver
 * @augments Driver
 */
class Elrond extends Driver {
  constructor(options) {
    super({
      supports: {
        total: false,
        max: true,
        circulating: true,
        blockchains: ['Elrond'],
      },
      options,
    });
  }

  /** get max supply
   *
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 20000000000;
  }

  /** get circulating supply for native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request('https://api.elrond.com/circulating-supply');

    return Number(circulating);
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const circulating = await this.fetchCirculatingSupply();
    const max = this.fetchMaxSupply();

    return new Supply({
      max,
      circulating,
    });
  }
}

module.exports = Elrond;
