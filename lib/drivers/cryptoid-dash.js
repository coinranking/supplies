const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Cryptoid Dash driver.
 *
 * @class
 * @memberof Driver
 * @augments Driver
 */
class CryptoidDash extends Driver {
  constructor(options) {
    super({
      blockchain: 'Dash',
      timeout: 200, // 5 requests per second
      supports: {
        native: true,
        circulating: true,
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request('https://chainz.cryptoid.info/dash/api.dws?q=totalcoins');

    return Number(total);
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request('https://chainz.cryptoid.info/dash/api.dws?q=circulating');

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

module.exports = CryptoidDash;
