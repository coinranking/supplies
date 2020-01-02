const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

/**
 * Cardano explorer driver.
 *
 * @memberof Driver
 * @augments Driver
 */
class CardanoExplorer extends Driver {
  constructor(options) {
    super({
      blockchain: 'Cardano',
      timeout: 200, // 5 requests per second
      supports: {
        balances: true,
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchTotalSupply
   */
  async fetchTotalSupply() {
    const asset = await this.request('https://cardanoexplorer.com/api/genesis/summary/');
    const redeemed = parseInt(asset.Right.cgsRedeemedAmountTotal.getCoin, 10);
    const unredeemed = parseInt(asset.Right.cgsNonRedeemedAmountTotal.getCoin, 10);

    return (redeemed + unredeemed) / 1000000;
  }

  /**
   * @augments Driver.fetchBalance
   * @param {modifierParam} modifier {@link modifierParam}
   * @async
   */
  async fetchBalance(modifier) {
    const asset = await this.request(`https://cardanoexplorer.com/api/addresses/summary/${modifier}`);
    const balance = asset.Right.caBalance.getCoin / 1000000;

    if (asset.Right.caBalance.getCoin < 0) {
      return 0;
    }

    return balance;
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

module.exports = CardanoExplorer;
