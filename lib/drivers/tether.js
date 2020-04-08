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
      blockchain: 'Tether',
      timeout: 100, // 10 requiest per second
      supports: {

      },
      options,
    });
  }

  /** fetch total supply of native token
   *
   * @augments Driver.fetchTotalSupply
   */
  async fetchTotalSupply() {
    const { data: { usdt: { bank_balance: total } } } = await this.request('https://wallet.tether.to/transparency.json');

    return Number(total);
  }

  /**
   *
   * @augments Driver.getSupply
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();

    return new Supply({
      total,

    });
  }
}

module.exports = Tether;
