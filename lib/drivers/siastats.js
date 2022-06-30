const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * SiaStats driver. Supports total supply and balance
 * for specific wallet address for native token SC on
 * Sia blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class SiaStats extends Driver {
  constructor(options) {
    super(
      {
        timeout: 100, // 10 requests per second
        supports: {
          total: false,
          circulating: true,
          blockchains: ['Sia'],
        },
      },
      options,
    );
  }

  /**
   * get total supply for native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { coin_supply: supply } = await this.request('https://siastats.info/dbs/network_status.json');

    return Number(supply);
  }

  /**
   * get supply
   *
   * @augments Driver.getSupply
   */
  async getSupply() {
    const circulating = await this.fetchCirculatingSupply();

    return new Supply({
      circulating,
    });
  }
}

module.exports = SiaStats;
