const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');
const SupplyModifier = require('../models/supply-modifier');
const { promisesMap } = require('../util');

/** CryptoCore explorer. Supports max
 * and total supply, as well balances
 * for multi-blockchains.
 *
 * @memberof Driver
 * @augments Driver
 */
class CryptoCore extends Driver {
  constructor(options) {
    super({
      timeout: 1500, // their api request to be min 1sec differences between two requests
      supports: {
        native: false,
        max: true,
        balances: true,
        blockchains: ['OneWorldCoin'],
      },
      options,
    });
  }

  maxSupplyOneWorldCoin() {
    return 500000000;
  }

  /**
   * @augments Driver.fetchMaxSupply
   * @param {string} blockchain one of supported blockchains
   */
  fetchMaxSupply(blockchain) {
    if (this.supportsBlockchain(blockchain) && this[`maxSupply${blockchain}`]) {
      return this[`maxSupply${blockchain}`]();
    }

    throw new Error(`The blockchain "${blockchain}" is not supported in this driver`);
  }

  async totalSupplyOneWorldCoin() {
    const total = await this.request('https://owo.ccore.online/ext/getmoneysupply');

    return Number(total);
  }

  /** get total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @param {string} blockchain one of supported blockchains
   * @async
   */
  async fetchTotalSupply(blockchain) {
    if (this.supportsBlockchain(blockchain) && this[`totalSupply${blockchain}`]) {
      return this[`totalSupply${blockchain}`]();
    }

    throw new Error(`The blockchain "${blockchain}" is not supported in this driver`);
  }

  async balanceOneWorldCoin(modifier) {
    const balance = await this.request(`https://owo.ccore.online/ext/getbalance/${modifier}`);

    return Number(balance);
  }

  /** get balance for specific wallet address
   *
   * @augments Driver.fetchBalance
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @param {string} blockchain one of supported blockchains
   * @async
   */
  async fetchBalance(modifier, blockchain) {
    if (this.supportsBlockchain(blockchain) && this[`balance${blockchain}`]) {
      return this[`balance${blockchain}`](modifier);
    }

    throw new Error(`The blockchain "${blockchain}" is not supported in this driver`);
  }

  /**
   * @augments Driver.getSupply
   * @param {Coin} coin {@link Coin}
   */
  async getSupply({ modifiers, blockchain }) {
    const total = await this.fetchTotalSupply(blockchain);
    const max = this.fetchMaxSupply(blockchain);

    const modifiersWithBalances = await promisesMap(
      modifiers,
      async (modifier) => {
        const balance = await this.fetchBalance(modifier, blockchain);
        return {
          reference: modifier,
          balance,
        };
      },
    );

    const circulating = modifiersWithBalances.reduce(
      (current, modifier) => current - modifier.balance,
      total,
    );

    return new Supply({
      total,
      circulating,
      max,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = CryptoCore;
