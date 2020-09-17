const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');
const SupplyModifier = require('../models/supply-modifier');
const { promisesMap } = require('../util');

/**
 * Subscan driver. Supports total supply
 * and balance for Polkadot and Kusama tokens.
 *
 * @memberof Driver
 * @augments Driver
 */
class Subscan extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        native: false,
        balances: true,
        blockchains: ['Polkadot', 'Kusama'],
      },
      options,
    });
  }

  async totalSupplyPolkadot() {
    const { data: { detail } } = await this.request('https://polkadot.subscan.io/api/scan/token');
    const { total_issuance: total, token_decimals: decimals } = detail.DOT;
    if (!total) {
      return undefined;
    }

    return Number(total) / 10 ** decimals;
  }

  async totalSupplyKusama() {
    const total = await this.request('http://polkadot.pro:8080/?q=totalcoins');

    return Number(total);
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   * @param {string} blockchain one of supported blockchains
   */
  async fetchTotalSupply(blockchain) {
    if (this.supportsBlockchain(blockchain) && this[`totalSupply${blockchain}`]) {
      return this[`totalSupply${blockchain}`]();
    }

    throw new Error(`The blockchain "${blockchain}" is not supported in this driver`);
  }

  async balancePolkadot(modifier) {
    const options = {
      url: 'https://polkadot.subscan.io/api/open/account',
      method: 'post',
      header: {
        'Content-Type': 'application/json',
      },
      body: {
        address: modifier,
      },
    };
    const { data: { balance } } = await this.request(options);

    return Number(balance);
  }

  async balanceKusama(modifier) {
    const options = {
      url: 'https://kusama.subscan.io/api/open/account',
      method: 'post',
      header: {
        'Content-Type': 'application/json',
      },
      body: {
        address: modifier,
      },
    };
    const { data: { balance } } = await this.request(options);

    return Number(balance);
  }

  /**
   * @augments Driver.fetchBalance
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @param {string} blockchain on of supported blockchains
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
    const circulating = modifiersWithBalances
      .reduce((current, modifier) => current - modifier.balance, total);

    return new Supply({
      total,
      circulating,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = Subscan;
