const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * ReefFinance driver. Supports
 * max and total supply native
 * token on Polkadot blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class ReefFinance extends Driver {
  constructor(options) {
    super({
      supports: {
        max: true,
        total: false,
        circulating: true,
      },
      options,
    });
  }

  /**
   * get max supply for native token
   *
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 20000000000;
  }

  /**
   * get total supply for native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const total = await this.request('https://node-api.reef.finance/api/supply');

    return Number(total);
  }

  /**
   * @augments Driver.getSupply
   * @async
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

module.exports = ReefFinance;
