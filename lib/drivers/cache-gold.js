const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * CacheGold driver. Supports total supply
 * for CGT token ow Ethereum blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class CacheGold extends Driver {
  constructor(options) {
    super({
      timeout: 200, // 5 requests per second
      supports: {
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request(
      'https://contract.cache.gold/api/totalSupplyDec',
    );
    return Number(total);
  }

  /**
   * @augments Driver.getSupply
   * @async
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();

    return new Supply({
      total,
    });
  }
}

module.exports = CacheGold;
