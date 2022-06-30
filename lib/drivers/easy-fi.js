const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * EasyFi driver. Supports circulating and max
 * supply for easyfi coin on Ethereum blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class EasyFi extends Driver {
  constructor(options) {
    super({
      supports: {
        total: false,
        max: true,
        circulating: true,
        blockchains: ['Ethereum'],
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
    return 10000000;
  }

  /**
   * get circulating supply for native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { cmc: circulating } = await this.request('https://api.easyfi.network/api/cmc');

    return Number(circulating);
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

module.exports = EasyFi;
