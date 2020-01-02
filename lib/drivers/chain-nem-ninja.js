const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

/**
 * Chain Nem Ninja / Nembex driver.
 *
 * @memberof Drivers
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
   * @augments fetchTotalSupply
   */
  fetchTotalSupply() {
    return 8999999999;
  }

  /**
   * @augments fetchMaxSupply
   */
  fetchMaxSupply() {
    return 8999999999;
  }

  /**
   * @augments fetchBalance
   * @param {modifierParam} modifier {@link modifierParam}
   * @async
   */
  async fetchBalance(modifier) {
    const asset = await this.request(`http://chain.nem.ninja/api3/account?address=${modifier}`);
    const balance = asset.raw.balance[0].sum / 1000000;
    return balance;
  }

  /**
   * @augments Driver.getSupply
   * @param {coinParam} coin {@link coinParam}
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
