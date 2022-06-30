const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Iridium driver. Supports total  and max supply on own
 * blockchain Iridium.
 *
 * @memberof Driver
 * @augments Driver
 */
class Iridium extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 request per second
      supports: {
        total: true,
        max: true,
      },
      options,
    });
  }

  /**
   * get max supply for native token
   *
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 25000000;
  }

  /**
   * get total supply of the native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request('https://explorer.ird.cash/issued');

    return Number(total);
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const max = this.fetchMaxSupply();
    const total = await this.fetchTotalSupply();

    return new Supply({
      max,
      total,
    });
  }
}

module.exports = Iridium;
