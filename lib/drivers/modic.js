const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Modic driver. Supports circulating
 * and max supply on own
 * blockchain Modic.
 *
 * @memberof Driver
 * @augments Driver
 */
class Modic extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 request per second
      supports: {
        total: false,
        max: true,
        circulating: true,
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 70000000;
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const data = await this.request('https://exp.modic.fund/api/getcoinsupply/?legacy=1');

    return Number(data);
  }

  /**
   * @augments Driver.getSupply
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

module.exports = Modic;
