const Driver = require('../models/driver');
const Supply = require('../models/supply');

/** Ecomi driver. Supports total and max
 *  supply for OMI coin on GoChain blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Ecomi extends Driver {
  constructor(options) {
    super({
      supports: {
        max: true,
        circulating: false,
      },
      options,
    });
  }

  /** get max supply
   *
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 750000000000;
  }

  /** get total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const { supply } = await this.request('http://143.198.76.15/circulating');

    return Number(supply);
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();
    const max = this.fetchMaxSupply();

    return new Supply({
      max,
      total,
    });
  }
}

module.exports = Ecomi;
