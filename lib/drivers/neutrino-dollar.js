const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * NeutrinoDollar driver. Supports circulating  and
 * total supply for USDN token on Waves blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class NeutrinoDollar extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 request per second
      supports: {
        circulating: true,
        total: true,
        blockchains: ['WAVES'],
      },
      options,
    });
  }

  /** fetch circulating supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request('https://beta.neutrino.at/api/explorer/get_total_issued');

    return Number(total);
  }

  /** fetch circulating supply for native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request('https://beta.neutrino.at/api/explorer/get_circulating_supply');

    return Number(circulating);
  }

  /**
   * @augments Driver.getSupply
   * @async
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

module.exports = NeutrinoDollar;
