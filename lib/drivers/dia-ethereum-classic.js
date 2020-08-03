const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * DiaEthereumClassic driver. Supports total supply
 * for native token based on Ethereum blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class DiaEthereumClassic extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 request per second
      supports: {
        native: true,
        total: false,
        circulating: true,
        blockchains: ['Ethereum Classic'],
      },
      options,
    });
  }

  /** get total supply for
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { CirculatingSupply: circulating } = await this.request(
      'https://api.diadata.org/v1/supply/ETC',
    );
    return Number(circulating);
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const circulating = await this.fetchCirculatingSupply();

    return new Supply({
      circulating,
    });
  }
}

module.exports = DiaEthereumClassic;
