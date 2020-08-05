const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Ampleforth driver. Supports total supply for native
 * token AML.
 *
 * @memberof Driver
 * @augments Driver
 */
class Ampleforth extends Driver {
  constructor(options) {
    super(
      {
        timeout: 100, // 10 request per second
        supports: {
          total: false,
          circulating: true,
        },
      },
      options,
    );
  }

  /** get total supply for native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const supply = await this.request('https://service-api.fragments.org/circulating-supply');

    return Number(supply);
  }

  /** get supply
   *
   * @augments Driver.getSupply
   */
  async getSupply() {
    const circulating = await this.fetchCirculatingSupply();

    return new Supply({
      circulating,
    });
  }
}

module.exports = Ampleforth;
