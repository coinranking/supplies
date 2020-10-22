const Driver = require('../models/driver');
const Supply = require('../models/supply');

/** Cryptolocally driver. Supports fetching max
 * and circulating supply for GIV token on Ethereum
 * blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class CryptoLocally extends Driver {
  constructor(options) {
    super({
      timeout: 200, // 5 requests per second
      supports: {
        circulating: true,
        total: false,
        max: true,
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 999000000;
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request('https://cryptolocally.com/api/giv/circulatingsupply');

    return Number(circulating);
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const max = this.fetchMaxSupply();
    const circulating = await this.fetchCirculatingSupply();

    return new Supply({
      max,
      circulating,
    });
  }
}

module.exports = CryptoLocally;
