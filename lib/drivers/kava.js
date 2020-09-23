const Driver = require('../models/driver');
const Supply = require('../models/supply');

/** Kava driver. Support total
 * supply for Kava coin on Kava
 * blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Kava extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        total: true,
      },
      options,
    });
  }

  /** get total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const { result: total } = await this.request('https://kava3.data.kava.io/supply/total/ukava');

    return Number(total) / 10 ** 6;
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

module.exports = Kava;
