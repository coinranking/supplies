const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * TzStats driver. Supports total and
 * circulating supply, along with balance
 * for native token, on own blockchain
 * Tezos.
 *
 * @memberof Driver
 * @augments Driver
 */
class TzStats extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        circulating: true,
        blockchains: ['Tezos'],
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request('https://api.tzstats.com/tables/supply?time.gte=today&limit=1');
    return Number(total[0][4]);
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request('https://api.tzstats.com/tables/supply?time.gte=today&limit=1');
    return Number(circulating[0][9]);
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

module.exports = TzStats;
