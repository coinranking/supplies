const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * BlockchainInfo driver. Supports circulating and max supply for BTC
 * using Bitcoin blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class BlockchainInfo extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        circulating: true,
        max: true,
        blockchains: ['Bitcoin'],
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request('https://blockchain.info/q/totalbc');
    return Number(total / 100000000);
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request('https://blockchain.info/q/totalbc');
    return Number(circulating / 100000000);
  }

  /**
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 21000000;
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();
    const circulating = await this.fetchCirculatingSupply();
    const max = this.fetchMaxSupply();

    return new Supply({
      total,
      circulating,
      max,
    });
  }
}

module.exports = BlockchainInfo;
