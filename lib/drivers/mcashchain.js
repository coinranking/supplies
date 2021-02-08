const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * MCashScan driver. Support total
 * and circulating supply for MCASH
 * token on MCashchain blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class MCashChain extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        circulating: true,
        blockchains: ['MCashchain'],
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const { total_supply: total } = await this.request('https://api.mcashscan.io/api/system/balance');

    return Number(total) / 10 ** 8;
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { circulating_supply: circulating } = await this.request('https://api.mcashscan.io/api/system/balance');

    return Number(circulating) / 10 ** 8;
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

module.exports = MCashChain;
