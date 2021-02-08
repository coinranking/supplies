const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Namebase driver. Supports max
 * supply and circulating supply
 * for native HNS token on Handshake blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Namebase extends Driver {
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

  /** get total supply for native token
   *
   * @augments Driver.fetchMaxSupply
   * @async
   */
  fetchMaxSupply() {
    return 2040000000;
  }

  /** get circulating supply
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { circulatingSupply } = await this.request('https://www.namebase.io/api/v0/ticker/supply?asset=HNS');
    return Number(circulatingSupply);
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

module.exports = Namebase;
