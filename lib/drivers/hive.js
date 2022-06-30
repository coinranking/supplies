const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');

/**
 * Hivedb driver. Supports total and circulating supply
 * for tokens HIVE on HIVE blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Hive extends Driver {
  constructor(options) {
    super(
      {
        timeout: 100, // 10 requests per second
        supports: {
          circulating: true,
          blockchains: ['Hive'],
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
    const data = await this.request('https://hive-db.com/api/props');
    const record = data[0];

    if (record) {
      return Number(record.virtual_supply);
    }

    return Number(0);
  }

  /**
   * get circulating supply for native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const data = await this.request('https://hive-db.com/api/props');
    const record = data[0];

    if (record) {
      return Number(record.current_supply);
    }

    return Number(0);
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

module.exports = Hive;
