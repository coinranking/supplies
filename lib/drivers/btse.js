const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Btse token base on Liquid blockchain. Supports total
 * and circulating supply for Btse token.
 *
 * @augments Driver
 * @memberof Driver
 */
class Btse extends Driver {
  constructor(options) {
    super({
      blockchain: 'Liquid',
      timeout: 200, // 5 requests per second
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
    const { data: { tokenIssued: total } } = await this.request({
      url: 'https://www.btse.com/api/tokentransparency',
      headers: {
        'User-Agent': 'PostmanRuntime/7.24.1', // tmp hack: without UserAgent definition url will not work
      },
    });

    return Number(total);
  }

  /** get circulating supply for native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { data: { circulatingSupply } } = await this.request({
      url: 'https://www.btse.com/api/tokentransparency',
      headers: {
        'User-Agent': 'PostmanRuntime/7.24.1', // tmp hack: without UserAgent definition url will not work
      },
    });

    return Number(circulatingSupply);
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

module.exports = Btse;
