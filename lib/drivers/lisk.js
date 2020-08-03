const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');
const SupplyModifier = require('../models/supply-modifier');
const { promisesMap } = require('../util');

/**
 * Lisk driver. Supports total supply
 * and balance for native token.
 *
 * @memberof Driver
 * @augments Driver
 */
class Lisk extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        balances: true,
        blockchains: ['Lisk'],
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const { data } = await this.request('https://node01.lisk.io/api/node/constants');

    return Number(data.supply) / (10 ** 8);
  }

  /**
   * @augments Driver.fetchBalance
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchBalance(modifier) {
    const { data } = await this.request(`https://node01.lisk.io/api/accounts?address=${modifier}`);
    const [account] = data;
    const { balance } = account;

    return Number(balance) / (10 ** 8);
  }

  /**
   * @augments Driver.getSupply
   * @param {Coin} coin {@link Coin}
   */
  async getSupply(coin) {
    const total = await this.fetchTotalSupply();
    const modifiersWithBalances = await promisesMap(
      coin.modifiers,
      (modifier) => this
        .fetchBalance(modifier)
        .then((balance) => ({ reference: modifier, balance })),
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

module.exports = Lisk;
