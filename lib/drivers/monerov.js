const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * MoneroV driver. Supports circulating
 * and max supply on own
 * blockchain MoneroV.
 *
 * @memberof Driver
 * @augments Driver
 */
class Monerov extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 request per second
      supports: {
        total: false,
        max: true,
        circulating: true,
        blockchains: ['MoneroV'],
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 27000000;
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const data = await this.request('https://explorer.monerov.online/api/emission_txt2');
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

module.exports = Monerov;
