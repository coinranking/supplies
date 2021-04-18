const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * XCash driver. Support
 * total supply for XCASH token.
 *
 * @memberof Driver
 * @augments Driver
 */
class XCash extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        circulating: true,
        max: true,
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchMaxSupply
   * @async
   */
  async fetchMaxSupply() {
    const max = await this.request('https://explorer.x-cash.org/gettotalsupply');

    return Number(max);
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request('https://explorer.x-cash.org/getgeneratedsupply');

    return Number(total);
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request('https://explorer.x-cash.org/getcirculatingsupply');

    return Number(circulating);
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();
    const max = await this.fetchMaxSupply();
    const circulating = await this.fetchCirculatingSupply();

    return new Supply({
      total,
      max,
      circulating,
    });
  }
}

module.exports = XCash;
