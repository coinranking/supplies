const Driver = require('../models/driver');
const Supply = require('../models/supply');
const SupplyModifier = require('../models/supply-modifier');
const Coin = require('../models/coin');
const { promisesMap } = require('../util');

/**
 * Rito driver. Supports circulating
 * and total supply on own
 * blockchain Rito.
 *
 * @memberof Driver
 * @augments Driver
 */
class Rito extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 request per second
      supports: {
        total: true,
        max: true,
        balances: true,
      },
      options,
    });
  }

  /**
   * get max supply for native toke
   *
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 2030907256;
  }

  /**
   * get total supply of the native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request('https://stats.ritocoin.org/api/supply');

    return Number(total);
  }

  /**
   * get balance for specific wallet address
   *
   * @augments Driver.fetchBalance
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchBalance(modifier) {
    const { balance } = await this.request(
      `https://insight.ritocoin.org/api/addr/${modifier}`,
    );

    return Number(balance);
  }

  /**
   * @augments Driver.getSupply
   * @param {Coin} coin {@link Coin}
   */
  async getSupply({ modifiers }) {
    const max = this.fetchMaxSupply();
    const total = await this.fetchTotalSupply();

    const modifiersWithBalances = await promisesMap(
      modifiers,
      async (modifier) => {
        const balance = await this.fetchBalance(modifier);
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
      max,
      total,
      circulating,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = Rito;
