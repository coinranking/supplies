const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Hivedb driver. Supports total and circulating supply
 * for native token HIVE on HIVE blockchain.
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

  /** get total supply for native token
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

  /** get circulating supply for native token
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

module.exports = Hive;
