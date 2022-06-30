const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * ElectricCash driver. Supports total and max
 * supply for ELCASH coin on own blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class ElectricCash extends Driver {
  constructor(options) {
    super({
      supports: {
        total: true,
        max: true,
      },
      options,
    });
  }

  /**
   * get max supply
   *
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 21000000;
  }

  /**
   * get total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request('https://api.electriccash.global/totalsupply');

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

module.exports = ElectricCash;
