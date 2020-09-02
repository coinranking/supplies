const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');
const SupplyModifier = require('../models/supply-modifier');
const { promisesMap } = require('../util');

/**
 * Polkadot driver. Supports total supply
 * and balance for DOT tokens.
 *
 * @memberof Driver
 * @augments Driver
 */
class Polkadot extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        balances: true,
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const { data: { detail } } = await this.request('https://polkadot.subscan.io/api/scan/token');
    const { total_issuance: total, token_decimals: decimals } = detail.DOT;
    if (!total) {
      return undefined;
    }

    return Number(total) / 10 ** decimals;
  }

  /**
   * @augments Driver.fetchBalance
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchBalance(modifier) {
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

  /**
   * @augments Driver.getSupply
   * @param {Coin} coin {@link Coin}
   */
  async getSupply(coin) {
    const total = await this.fetchTotalSupply();

    const modifiersWithBalances = await promisesMap(
      coin.modifiers,
      async (modifier) => {
        const balance = await this.fetchBalance(modifier);
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

module.exports = Polkadot;
