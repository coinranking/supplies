const Driver = require('../models/driver');
const Supply = require('../models/supply');

/** Fanaticos cash driver. Supports max and
 * total supply for FCH token
 *
 * @memberof Driver
 * @augments Driver
 */
class FanaticosCash extends Driver {
  constructor(options) {
    super({
      supports: {
        max: true,
        blockchains: ['Ethereum'],
      },
      options,
    });
  }

  fetchMaxSupply() {
    return 21000000;
  }

  /** get total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const supply = await this.request('https://explorer.fanaticoscriptos.com/ext/getmoneysupply');

    return Number(supply);
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();
    const max = this.fetchMaxSupply();

    return new Supply({
      total,
      max,
    });
  }
}

module.exports = FanaticosCash;
