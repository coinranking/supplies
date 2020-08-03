const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Dogechain driver. Support
 * total and circulating supply for
 * native token.
 *
 * @memberof Driver
 * @augments Driver
 */
class DogeChain extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        circulating: true,
        blockchains: ['Dogecoin'],
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request('https://dogechain.info/chain/Dogecoin/q/totalbc');
    return Number(total);
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request('https://dogechain.info/chain/Dogecoin/q/totalbc');
    return Number(circulating);
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

module.exports = DogeChain;
