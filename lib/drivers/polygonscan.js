const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');

/**
 * @memberof Driver
 * @augments Driver
 */
class Polygonscan extends Driver {
  constructor(options) {
    super({
      timeout: 300, // 5 request per second + margin otherwise we still hit the rate limit
      supports: {
        max: true,
        circulating: true,
        tokenCirculating: true,
        tokens: true,
        secret: true,
        blockchains: ['Polygon'],
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
    return 10000000000;
  }

  /**
   * get total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   */
  fetchTotalSupply() {
    return this.fetchMaxSupply();
  }

  /**
   * get circulating supply for native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { result: supply } = await this.request(`https://api.polygonscan.com/api?module=stats&action=maticsupply&apikey=${this.secret}`);
    return Number(supply) / 10 ** 18;
  }

  /**
   * @augments Driver.fetchTokenMaxSupply
   * @param {string} reference The unique identifier of a coin. Usually a smart contract address.
   * @param {number} decimals
   *   The amount of precision this coin uses.
   *   For most blockchains, this defaults to 18.
   * @async
   */
  async fetchTokenMaxSupply(reference, decimals = 18) {
    const { result: supply } = await this.request(`https://api.polygonscan.com/api?module=stats&action=tokensupply&contractaddress=${reference}&apikey=${this.secret}`);
    return Number(supply) / 10 ** decimals;
  }

  /**
   * @augments Driver.fetchTokenTotalSupply
   * @param {string} reference The unique identifier of a coin. Usually a smart contract address.
   * @param {number} decimals
   *   The amount of precision this coin uses.
   *   For most blockchains, this defaults to 18.
   * @async
   */
  async fetchTokenTotalSupply(reference, decimals = 18) {
    return this.fetchTokenMaxSupply(reference, decimals);
  }

  /**
   * @augments Driver.fetchTokenCirculatingSupply
   * @param {string} reference The unique identifier of a coin. Usually a smart contract address.
   * @param {number} decimals
   *   The amount of precision this coin uses.
   *   For most blockchains, this defaults to 18.
   * @async
   */
  async fetchTokenCirculatingSupply(reference, decimals = 18) {
    const { result: supply } = await this.request(`https://api.polygonscan.com/api?module=stats&action=tokenCsupply&contractaddress=${reference}&apikey=${this.secret}`);
    return Number(supply) / 10 ** decimals;
  }

  /**
   * @augments Driver.getSupply
   * @param {Coin} coin {@link Coin}
   */
  async getSupply(coin) {
    let max;
    let total;
    let circulating;

    if (typeof coin.reference === 'undefined') {
      max = this.fetchMaxSupply();
      total = this.fetchTotalSupply();
      circulating = await this.fetchCirculatingSupply();
    } else {
      max = await this.fetchTokenMaxSupply(coin.reference, coin.decimals);
      total = await this.fetchTokenTotalSupply(coin.reference, coin.decimals);
      circulating = await this.fetchTokenCirculatingSupply(coin.reference, coin.decimals);
    }

    return new Supply({
      max,
      total,
      circulating,
    });
  }
}

module.exports = Polygonscan;
