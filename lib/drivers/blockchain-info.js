const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * BlockchainInfo driver. Supports circulating and max supply for BTC.
 *
 * @memberof Driver
 * @augments Driver
 */
class BlockchainInfo extends Driver {
  constructor(options) {
    super({
      blockchain: 'Bitcoin',
      timeout: 100, // 10 requiest per second
      supports: {
        circulating: true,
        max: true,
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchTotalSupply
   */
  async fetchTotalSupply() {
    const total = await this.request('https://blockchain.info/q/totalbc');
    return Number(total / 100000000);
  }

  /**
   * @augments Driver.fetchCirculatingSupply
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
    const max = await this.fetchMaxSupply();

    return new Supply({
      total,
      circulating,
      max,
    });
  }
}

module.exports = BlockchainInfo;
