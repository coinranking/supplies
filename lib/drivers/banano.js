const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Banano driver. Supports total and
 * circulating supply for native coin
 * BAN on own blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Banano extends Driver {
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
    const { total } = await this.request('https://api.creeper.banano.cc/supply');

    return Number(total);
  }

  /** get circulating supply for native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { circulating } = await this.request('https://api.creeper.banano.cc/supply');

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

module.exports = Banano;
