const Driver = require('../models/driver');
const Supply = require('../models/supply');

/** Beam driver.
 *
 * @memberof Driver
 * @augments Driver
 */
class Beam extends Driver {
  constructor(options) {
    super({
      timeout: 200, // 5 requests per second
      supports: {
        circulating: true,
        blockchains: ['BEAM'],
      },
      options,
    });
  }

  /** get total supply
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const { total_emission: total } = await this.request('https://mainnet-explorer.beam.mw/explorer/status/?format=json');
    return Number(total);
  }

  /** get circulating supply
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { total_coins_in_circulation: circulating } = await this.request('https://mainnet-explorer.beam.mw/explorer/status/?format=json');
    return Number(circulating);
  }

  /**
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

module.exports = Beam;
