const Driver = require('../models/driver');
const Supply = require('../models/supply');

/** Haven driver. Supports total supply
 * for native coin XHV on own blockchain Haven.
 *
 * @memberof Driver
 * @augments Driver
 */
class Haven extends Driver {
  constructor(options) {
    super({
      timeout: 200, // 5 requests per second
      supports: {
        total: true,
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   */
  async fetchTotalSupply() {
    const { data: { coinbase: total } } = await this.request('https://explorer.havenprotocol.org/api/emission');

    return Number(total) / 10 ** 12;
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

module.exports = Haven;
