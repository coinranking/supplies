const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * V-System driver. Supports total supply
 * and balance for specific address for
 * native token VSYS on their own blockchain
 * V.system.
 *
 * @memberof Driver
 * @augments Driver
 */
class Vsystem extends Driver {
  constructor(options) {
    super({
      blockchain: 'V.System',
      timeout: 100, // 10 requiest per second
      supports: {
        native: true,
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
    const {
      data: { TotalSupply: total },
    } = await this.request('https://explorer.v.systems/api/supply');
    return Number(total);
  }

  /** get circulating supply for native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const {
      data: { CirculationSupply: circulating },
    } = await this.request('https://explorer.v.systems/api/supply');
    return Number(circulating);
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

module.exports = Vsystem;
