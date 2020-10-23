const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * SteemDollars driver. Supports circulating supply
 * for tokens STEEM on STEEM blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class SteemDollars extends Driver {
  constructor(options) {
    super(
      {
        timeout: 100, // 10 requests per second
        supports: {
          total: false,
          circulating: true,
        },
      },
      options,
    );
  }

  /** get circulating supply for native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const data = await this.request({
      url: 'https://steemdb.io/api/props',
      rejectUnauthorized: false,
    });
    const record = data[0];

    if (record) {
      return Number(record.current_sbd_supply);
    }

    return Number(0);
  }

  /** get supply
   *
   * @augments Driver.getSupply
   * @async
   */
  async getSupply() {
    const circulating = await this.fetchCirculatingSupply();

    return new Supply({
      circulating,
    });
  }
}

module.exports = SteemDollars;
