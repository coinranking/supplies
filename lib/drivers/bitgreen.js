const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * BitGreen driver. Supports circulating supply
 * and max supply for native BITG coin
 * on BitGreen blockchain.
 *
 * @augments Driver
 * @memberof Driver
 */
class BitGreen extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 request per second
      supports: {
        total: false,
        max: true,
        circulating: true,
        blockchains: ['BitGreen'],
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 21000000;
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request('https://explorer.bitg.org/ext/getmoneysupply');

    return Number(circulating);
  }

  /**
   * @augments Driver.getSupply
   * @async
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

module.exports = BitGreen;
