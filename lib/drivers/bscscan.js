const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * @augments Driver
 * @memberof Driver
 */
class BscScan extends Driver {
  constructor(options) {
    super({
      timeout: 200, // 5 requests per second
      supports: {
        balances: true,
      },
      options,
    });
  }

  /** get total supply for BEP20-token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const { result: total } = await this.request(
      'https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=0xe9e7cea3dedca5984780bafc599bd69add087d56',
    );

    return Number(total) / 10 ** 18;
  }

  /** get circulating supply for BEP20-token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { result: circulating } = await this.request('https://api.bscscan.com/api?module=stats&action=tokenCsupply&contractaddress=0xe9e7cea3dedca5984780bafc599bd69add087d56');

    return Number(circulating) / 10 ** 18;
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

module.exports = BscScan;
