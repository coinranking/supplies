const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');
const SupplyModifier = require('../models/supply-modifier');
const { promisesMap } = require('../util');

/**
 * @augments Driver
 * @memberof Driver
 */
class BscScan extends Driver {
  constructor(options) {
    super({
      timeout: 333, // 4 requests per second
      supports: {
        tokens: true,
        circulating: true,
        native: false,
        balances: true,
        decimals: true, // Should this be required?
        secret: true, // Should this be required?
        blockchains: ['Binance Smart Chain'],
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
   * get total supply for BEP20-token
   *
   * @augments Driver.fetchTokenTotalSupply
   * @param {string} reference The unique identifier of a coin. Usually a smart contract address.
   * @param {number} decimals
   *   The amount of precision this coin uses.
   *   For most blockchains, this defaults to 18.
   * @async
   */
  async fetchTokenTotalSupply(reference, decimals) {
    const { result: total } = await this.request(`https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${reference}&apikey=${this.secret}`);

    if (decimals === null || decimals === undefined) {
      return total / (10 ** 18);
    }

    return total / (10 ** decimals);
  }

  /**
   * @augments Driver.fetchTokenCirculatingSupply
   * @param {string} reference The unique identifier of a coin. Usually a smart contract address.
   * @param {number} decimals
   *   The amount of precision this coin uses.
   *   For most blockchains, this defaults to 18.
   * @async
   */
  async fetchTokenCirculatingSupply(reference, decimals) {
    const { result: total } = await this.request(`https://api.bscscan.com/api?module=stats&action=tokenCsupply&contractaddress=${reference}&apikey=${this.secret}`);

    if (decimals === null || decimals === undefined) {
      return total / (10 ** 18);
    }

    return total / (10 ** decimals);
  }

  /**
   * @augments Driver.fetchTokenBalance
   * @param {string} reference The unique identifier of a coin. Usually a smart contract address.
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @param {number} decimals
   *   The amount of precision this coin uses.
   *   For most blockchains, this defaults to 18.
   * @async
   */
  async fetchTokenBalance(reference, modifier, decimals) {
    const { result: balance } = await this.request(`https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${reference}&address=${modifier}&tag=latest&apikey=${this.secret}`);

    if (decimals === null || decimals === undefined) {
      return balance / (10 ** 18);
    }

    return balance / (10 ** decimals);
  }

  /**
   * @augments Driver.getSupply
   * @param {Coin} coin {@link Coin}
   */
  async getSupply({ reference, modifiers, decimals }) {
    const total = await this.fetchTokenTotalSupply(reference, decimals);

    let circulating;
    if (modifiers && modifiers.length) {
      const modifiersWithBalances = await promisesMap(
        modifiers,
        async (modifier) => {
          const balance = await this.fetchTokenBalance(reference, modifier, decimals);
          return {
            reference: modifier,
            balance,
          };
        },
      );
      circulating = modifiersWithBalances
        .reduce((current, modifier) => current - modifier.balance, total);
    } else {
      circulating = await this.fetchTokenCirculatingSupply(reference, decimals);
    }
    return new Supply({
      total,
      circulating,
    });
  }
}

module.exports = BscScan;
