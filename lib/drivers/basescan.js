const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');
const SupplyModifier = require('../models/supply-modifier');
const { promisesMap } = require('../util');

/**
 * Basescan driver. Supports circulating and total supply for basechain
 *
 * @augments Driver
 * @memberof Driver
 */
class Basescan extends Driver {
  constructor(options) {
    super({
      timeout: 200, // 5 requests per second
      supports: {
        native: false,
        balances: true,
        nativeBalances: false,
        tokens: true,
        decimals: true, // Should this be required?
        secret: true, // Should this be required?
        blockchains: ['Base'],
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
   * @augments Driver.fetchTokenTotalSupply
   * @param {string} reference The unique identifier of a coin. Usually a smart contract address.
   * @param {number} decimals
   *   The amount of precision this coin uses.
   *   For most blockchains, this defaults to 18.
   * @async
   */
  async fetchTokenTotalSupply(reference, decimals = 18) {
    const { result: total } = await this.request(`https://api.basescan.org/api?module=stats&action=tokensupply&contractaddress=${reference}&apikey=${this.secret}`);

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
    const { result: balance } = await this.request(`https://api.basescan.org/api?module=account&action=tokenbalance&contractaddress=${reference}&address=${modifier}&tag=latest&apikey=${this.secret}`);

    if (decimals === null || decimals === undefined) {
      return balance / (10 ** 18);
    }

    return balance / (10 ** decimals);
  }

  /**
   * @augments Driver.getSupply
   * @param {Coin} coin {@link Coin}
   */
  async getSupply(coin) {
    const total = await this.fetchTokenTotalSupply(coin.reference, coin.decimals);

    const modifiersWithBalances = await promisesMap(
      coin.modifiers,
      async (modifier) => {
        if (typeof coin.reference === 'undefined') {
          const balance = await this.fetchBalance(modifier);
          return {
            reference: modifier,
            balance,
          };
        }
        const balance = await this.fetchTokenBalance(coin.reference, modifier, coin.decimals);
        return {
          reference: modifier,
          balance,
        };
      },
    );
    const circulating = modifiersWithBalances
      .reduce((current, modifier) => current - modifier.balance, total);

    return new Supply({
      total,
      circulating,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = Basescan;
