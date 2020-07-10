const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');
const SupplyModifier = require('../models/supply-modifier');
const { promisesMap } = require('../util');

/**
 * Chain Nem Ninja / Nembex driver.
 *
 * @memberof Driver
 * @augments Driver
 */
class ChainNemNinja extends Driver {
  constructor(options) {
    super({
      blockchain: 'Nem',
      timeout: 100, // 10 requests per second
      supports: {
        balances: true,
        max: true,
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchTotalSupply
   */
  fetchTotalSupply() {
    return 8999999999;
  }

  /**
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 8999999999;
  }

  /**
   * @augments Driver.fetchBalance
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchBalance(modifier) {
    const data = await this.request(`http://chain.nem.ninja/api3/account?address=${modifier}`);
    const balance = data.raw.balance[0].sum / 1000000;
    return balance;
  }

  /**
   * @augments Driver.getSupply
   * @param {Coin} coin {@link Coin}
   */
  async getSupply(coin) {
    const total = this.fetchTotalSupply();
    const max = this.fetchMaxSupply();
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
      max,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = ChainNemNinja;
