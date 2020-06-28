const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * PirateChain driver. Supports total and circulating
 * supply for native token ARRR on own blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class PirateChain extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        circulating: true,
        blockchains: ['PirateChain'],
      },
      options,
    });
  }

  /** total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    return Number(200000000);
  }

  /** circulating supply for native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { supply: circulating } = await this.request(
      'https://explorer.pirate.black/api/marketcap',
    );
    return Number(circulating);
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

module.exports = PirateChain;
