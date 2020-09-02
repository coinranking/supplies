const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');
const SupplyModifier = require('../models/supply-modifier');
const { promisesMap } = require('../util');

/**
 * Kusama driver. Supports total supply
 * and balance for KSM tokens.
 *
 * @memberof Driver
 * @augments Driver
 */
class Kusama extends Driver {
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
    const total = await this.request('http://polkadot.pro:8080/?q=totalcoins');

    return Number(total);
  }

  /**
   * @augments Driver.fetchBalance
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchBalance(modifier) {
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

module.exports = Kusama;
