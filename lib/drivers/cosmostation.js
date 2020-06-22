const Driver = require('../models/driver');
const Supply = require('../models/supply');

/** Cosmostation driver. Supports total and
 * circulating supply for native token COSMOS
 * on their blockchain Cosmos.
 *
 * @augments Driver
 * @memberof Driver
 */
class Cosmostation extends Driver {
  constructor(options) {
    super({
      blockchain: 'Cosmos',
      timeout: 100, // 10 requests per second
      supports: {
        circulating: true,
      },
      options,
    });
  }

  /** fetch total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const { total_supply_tokens: total } = await this.request('https://api.cosmostation.io/v1/status');
    return total / 10 ** 6;
  }

  /** fetch circulating supply for native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { total_circulating_tokens: total } = await this.request('https://api.cosmostation.io/v1/status');
    return total / 10 ** 6;
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

module.exports = Cosmostation;
