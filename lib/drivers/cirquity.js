const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Cirquity driver. Supports total and
 * max supply for CIRQ token on
 * Cirquity blockchain.
 *
 * @augments Driver
 * @memberof Driver
 */
class Cirquity extends Driver {
  constructor(options) {
    super({
      timeout: 200, // 5 requests per second
      supports: {
        max: true,
        blockchains: ['Cirquity'],
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 1000000000000;
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request('https://explorer.cirquity.com/api/supply');
    const supply = total.replace(/,/g, '');

    return Number(supply);
  }

  /**
   * @augments Driver.getSupply
   * @async
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

module.exports = Cirquity;
