const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * EnergyWeb driver.
 *
 * @augments Driver
 * @memberof Driver
 */
class EnergyWeb extends Driver {
  constructor(options) {
    super(
      {
        timeout: 100, // 10 requests per second
        supports: {
          max: true,
          circulating: true,
          blockchains: ['Energy Web Chain'],
        },
      },
      options,
    );
  }

  /**
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 100000000;
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const supply = await this.request('https://explorer.energyweb.org/api?module=stats&action=coinsupply');

    return Number(supply);
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request('https://supply.energyweb.org/');

    return Number(circulating);
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();
    const circulating = await this.fetchCirculatingSupply();
    const max = this.fetchMaxSupply();

    return new Supply({
      max,
      total,
      circulating,
    });
  }
}

module.exports = EnergyWeb;
