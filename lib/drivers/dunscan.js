const Driver = require('../models/driver');
const Supply = require('../models/supply');

/** DunScan explorer. Supports total and circulating
 *  supply for native token on
 *  DunScan blockchain
 *
 * @memberof Driver
 * @augments Driver
 */
class DunScan extends Driver {
  constructor(options) {
    super({
      blockchain: 'Dune Network',
      supports: {
        circulating: true,
      },
      options,
    });
  }

  /** get total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const { total_supply_ico: supply } = await this.request(
      'https://api6.dunscan.io/v4/supply',
    );

    return Number(supply) / 10 ** 7;
  }

  /** get circulating supply for native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { circulating_supply: circulating } = await this.request(
      'https://api6.dunscan.io/v4/supply',
    );

    return Number(circulating) / 10 ** 7;
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();
    const circulating = await this.fetchCirculatingSupply();

    return new Supply({
      total,
      circulating,
    });
  }
}

module.exports = DunScan;
