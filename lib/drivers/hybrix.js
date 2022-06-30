const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');

/**
 * Hybrix driver. Supports total and circulating supply
 * for tokens HIVE on HIVE blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Hybrix extends Driver {
  constructor(options) {
    super(
      {
        timeout: 100, // 10 requests per second
        supports: {
          native: true,
          total: true,
          circulating: true,
        },
      },
      options,
    );
  }

  /**
   * get total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request('https://api.hybrix.io/engine/hystat/maximumSupply');

    return Number(total);
  }

  /**
   * get circulating supply for native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request('https://api.hybrix.io/engine/hystat/circulatingSupply');

    return Number(circulating);
  }

  /**
   * get supply
   *
   * @augments Driver.getSupply
   * @param {Coin} coin {@link Coin}
   * @async
   */
  async getSupply({ blockchain }) {
    const total = await this.fetchTotalSupply(blockchain);
    const circulating = await this.fetchCirculatingSupply(blockchain);

    return new Supply({
      total,
      circulating,
    });
  }
}

module.exports = Hybrix;
