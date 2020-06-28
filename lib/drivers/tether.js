const Driver = require('../models/driver');
const Supply = require('../models/supply');


/**
 * Tether driver. Supports fetching
 * total supply for native token.
 *
 * @memberof Driver
 * @augments Driver
 */
class Tether extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 request per second
      supports: {
        total: true,
        circulating: true,
        blockchains: ['Tether'],
      },
      options,
    });
  }

  /** fetch total supply of native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const { data: { usdt: { bank_balance: total } } } = await this.request('https://wallet.tether.to/transparency.json');

    return Number(total);
  }

  /** fetch circulating supply of native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { data: { usdt: { total_liabilities: circulating } } } = await this.request('https://wallet.tether.to/transparency.json');

    return Number(circulating);
  }

  /**
   * @augments Driver.getSupply
   * @async
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

module.exports = Tether;
