const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * VeChainStats driver. Supports total, max
 * and circulating supply for native token
 * on own blockchain VeChain.
 *
 * @memberof Driver
 * @augments Driver
 */
class VeChainStats extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 request per second
      supports: {
        circulating: true,
        max: true,
        secret: true,
        blockchains: ['VeChain'],
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
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const { result } = await this.request(
      `https://vechainstats.com/pro/vechain-tokens-cg/?auth=${this.secret}&token=vet`,
    );
    const { total_supply: totalSupply } = result['0'];
    return Number(totalSupply);
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { result } = await this.request(
      `https://vechainstats.com/pro/vechain-tokens-cg/?auth=${this.secret}&token=vet`,
    );
    const { circulation } = result['0'];
    return Number(circulation);
  }

  /**
   * @augments Driver.fetchMaxSupply
   * @async
   */
  async fetchMaxSupply() {
    const { result } = await this.request(
      `https://vechainstats.com/pro/vechain-tokens-cg/?auth=${this.secret}&token=vet`,
    );
    const { max_supply: maxSupply } = result['0'];
    return Number(maxSupply);
  }

  /**
   * @augments Driver.getSupply
   * @async
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();
    const circulating = await this.fetchCirculatingSupply();
    const max = await this.fetchMaxSupply();

    return new Supply({
      total,
      circulating,
      max,
    });
  }
}

module.exports = VeChainStats;
