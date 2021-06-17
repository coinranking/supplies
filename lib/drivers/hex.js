const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Hex driver. Supports total and circulating
 * supply on own blockchain for own
 * HEX coin.
 *
 * @memberof Driver
 * @augments Driver
 */
class Hex extends Driver {
  constructor(options) {
    super(
      {
        timeout: 100, // 10 requests per second
        supports: {
          circulating: true,
        },
      },
      options,
    );
  }

  /** get total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const supply = await this.request('https://hexvisionpublicapi.azurewebsites.net/api/TotalSupply');

    return Number(supply);
  }

  /** get criculating supply for native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request('https://hexvisionpublicapi.azurewebsites.net/api/CirculatingSupply');

    return Number(circulating);
  }

  /** get supply
   *
   * @augments Driver.getSupply
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();
    const circulating = await this.fetchCirculatingSupply();

    return new Supply({
      total,
      circulating,
    });
  }
}

module.exports = Hex;
