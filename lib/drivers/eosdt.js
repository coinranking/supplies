const Driver = require('../models/driver');
const Supply = require('../models/supply');

/** Eosdt driver. Supports max and
 * circulating supply for EOSDT
 * token on EOS blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Eosdt extends Driver {
  constructor(options) {
    super({
      supports: {
        total: false,
        max: true,
        circulating: true,
        blockchains: ['EOS'],
      },
      options,
    });
  }

  /** get max supply
   *
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 170000000;
  }

  /** get circulating supply for native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { currencies } = await this.request('https://statistics.eosdt.com/api/supply/actual');
    const record = currencies.find((item) => item.name === 'EOSDT');

    if (!record) {
      return undefined;
    }

    return Number(record.supply);
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

module.exports = Eosdt;
