const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Nimiq driver. Supports
 *
 * @augments Driver
 * @memberof Driver
 */
class Nimiq extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        circulating: true,
        secret: true,
        max: true,
        blockchains: ['Nimiq'],
      },
      options,
    });
  }

  get secret() {
    if (!this._secret) {
      throw new Error('API key is required');
    }
    return this._secret;
  }

  set secret(secret) {
    this._secret = secret;
  }

  /**
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 21000000000;
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const { existing_supply: supply } = await this.request(`https://api.nimiqx.com/supply/?api_key=${this.secret}`);
    return Number(supply);
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { circulating_supply: circulating } = await this.request(`https://api.nimiqx.com/supply/?api_key=${this.secret}`);
    return Number(circulating);
  }

  /**
   * @augments Driver.getSupply
   * @async
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();
    const circulating = await this.fetchCirculatingSupply();
    const max = this.fetchMaxSupply();

    return new Supply({
      total,
      circulating,
      max,
    });
  }
}

module.exports = Nimiq;
