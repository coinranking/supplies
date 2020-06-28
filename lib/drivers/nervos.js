const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Nervos driver. Supports total
 * and circulating supply for native token
 * on own blockchain.
 *
 * @augments Driver
 * @memberof Driver
 */
class Nervos extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        circulating: true,
        blockchains: ['Nervos'],
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const supply = await this.request(
      'https://api.explorer.nervos.org/api/v1/market_data/total_supply',
    );
    return Number(supply);
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request(
      'https://api.explorer.nervos.org/api/v1/market_data/circulating_supply',
    );
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

module.exports = Nervos;
