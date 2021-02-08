const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Phantasma driver, SOUL token. Supports total
 * and circulating supply for SOUL token on
 * own blockchain
 *
 * @augments Driver
 * @memberof Driver
 */
class PhantasmaSOUL extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        total: true,
        circulating: true,
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request('https://phantasma.io/total_supply');

    return Number(total);
  }

  /**
   * @augments Driver.fetchBalance
   * @async
   */
  async fetchCirculatingSupply() {
    const { tokens } = await this.request('http://207.148.17.86:7078/api/getNexus');

    const record = tokens.find((item) => item.symbol === 'SOUL');

    if (!record) {
      return undefined;
    }

    const { decimals, currentSupply } = record;

    return Number(currentSupply) / 10 ** Number(decimals);
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

module.exports = PhantasmaSOUL;
