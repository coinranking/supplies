const Driver = require('../models/driver');
const Supply = require('../models/supply');

/** DunScan explorer. Supports total supply
 * for native token on DunScan blockchain
 *
 * @memberof Driver
 * @augments Driver
 */
class DunScan extends Driver {
  constructor(options) {
    super({
      blockchain: 'Stash',
      supports: {},
      options,
    });
  }

  /** get total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const data = await this.request('https://api6.dunscan.io/v4/tokens');

    if (!data[0]) return 0;

    const { supply, decimals } = data[0];
    return Number(supply) / 10 ** Number(decimals);
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();

    return new Supply({
      total,
    });
  }
}

module.exports = DunScan;
