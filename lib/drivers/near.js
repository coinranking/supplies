const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Near driver. Supports max and circulating supply
 * for NEAR coin on own blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Near extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        total: false,
        max: true,
        circulating: true,
        blockchains: ['Handshake'],
      },
      options,
    });
  }

  /**
   * get total supply for native token
   *
   * @augments Driver.fetchMaxSupply
   * @async
   */
  fetchMaxSupply() {
    return 1000000000;
  }

  /**
   * get circulating supply
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { circulating_supply_in_yoctonear: circulating } = await this.request('https://explorer.near.org/api/circulating-supply');
    return Number(circulating) / 10 ** 24;
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

module.exports = Near;
