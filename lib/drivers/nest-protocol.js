const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * NestProtocol driver. Supports circulating supply
 * for token NEST on Ethereum blockchain.
 *
 * @augments Driver
 * @memberof Driver
 */
class NestProtocol extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        total: false,
        circulating: true,
        max: true,
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 10000000000;
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request({
      url: 'https://nestprotocol.org/nestapi/circulation',
      rejectUnauthorized: false,
    });
    return Number(circulating);
  }

  /**
   * @augments Driver.getSupply
   * @async
   */
  async getSupply() {
    const circulating = await this.fetchCirculatingSupply();
    const max = this.fetchMaxSupply();

    return new Supply({
      max,
      circulating,
    });
  }
}

module.exports = NestProtocol;
