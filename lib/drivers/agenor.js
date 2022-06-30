const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');
const SupplyModifier = require('../models/supply-modifier');
const { promisesMap } = require('../util');

/**
 * Agenor driver. Supports max and
 * total supply, along with balance for
 * specific wallet address of
 * native AGE coin on own agenor blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Agenor extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 request per second
      supports: {
        balances: true,
        max: true,
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 100000000;
  }

  /**
   * get total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const supply = await this.request('https://agenor.network/ext/getmoneysupply');
    return Number(supply);
  }

  /**
   * get balance for specific wallet address
   *
   * @augments Driver.fetchBalance
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchBalance(modifier) {
    const balance = await this.request(
      `https://agenor.network/ext/getbalance/${modifier}`,
    );
    return Number(balance);
  }

  /**
   * get supply
   *
   * @param {Coin} coin {@link Coin}
   */
  async getSupply({ modifiers }) {
    const total = await this.fetchTotalSupply();
    const max = this.fetchMaxSupply();

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
      total,
      max,
      circulating,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = Agenor;
