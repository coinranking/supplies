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
        circulating: true,
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
    const { result: total } = await this.request('https://kava4.data.kava.io/supply/total/ukava');

    return Number(total) / 10 ** 6;
  }

  /** get circulating supply
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request('https://kava4.data.kava.io/vesting/circulatingsupply');

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

module.exports = Kava;
