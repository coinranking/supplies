const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Bitcoinrh explorer. Supports total, max and circulating supply
 * for native coin Bitcoin Rhodium.
 *
 * @memberof Driver
 * @augments Driver
 */
class Bitcoinrh extends Driver {
  constructor(options) {
    super({
      timeout: 200, // 5 requests per second
      supports: {
        max: true,
        circulating: true,
      },
      options,
    });
  }

  /** get total supply
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request({
      url: 'https://explorer.bitcoinrh.org/api/data/gettotalsupply?moneyUnit=0',
      rejectUnauthorized: false,
    });

    return Number(total);
  }

  /** get max supply
   *
   * @augments Driver.fetchMaxSupply
   * @async
   */
  async fetchMaxSupply() {
    const max = await this.request({
      url: 'https://explorer.bitcoinrh.org/api/data/getmaxsupply?moneyUnit=0',
      rejectUnauthorized: false,
    });

    return Number(max);
  }

  /** get circulating supply
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request({
      url:
        'https://explorer.bitcoinrh.org/api/data/getcirculationsupply?moneyUnit=0',
      rejectUnauthorized: false,
    });

    return Number(circulating);
  }

  /**
   * @augments Driver.getSupply
   * @async
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();
    const max = await this.fetchMaxSupply();
    const circulating = await this.fetchCirculatingSupply();

    return new Supply({
      total,
      circulating,
      max,
    });
  }
}

module.exports = Bitcoinrh;
