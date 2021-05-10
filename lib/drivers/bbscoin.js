const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * BBScoin driver. Support
 * max and total supply for BBS token
 * on own blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Bbscoin extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        max: true,
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchMaxSupply
   * @async
   */
  fetchMaxSupply() {
    return 184470000000;
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request('http://mine.bbscoin.click/circulation/bbscoin/precision/');

    return Number(total);
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();
    const max = this.fetchMaxSupply();

    return new Supply({
      total,
      max,
    });
  }
}

module.exports = Bbscoin;
