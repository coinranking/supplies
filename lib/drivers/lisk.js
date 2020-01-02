const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

/**
 * Lisk driver.
 *
 * @memberof Drivers
 * @augments Driver
 */
class Lisk extends Driver {
  constructor(options) {
    super({
      blockchain: 'Lisk',
      supports: {
        balances: true,
      },
      options,
    });
  }

  /**
   * @augments fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const { data } = await this.request('https://node01.lisk.io/api/node/constants');

    return Number(data.supply) / (10 ** 8);
  }

  /**
   * @augments fetchBalance
   * @param {modifierParam} modifier {@link modifierParam}
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
   * @param {coinParam} coin {@link coinParam}
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
