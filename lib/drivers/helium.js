const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');
const SupplyModifier = require('../models/supply-modifier');
const { promisesMap } = require('../util');

/**
 * Helium driver. Supports total supply,
 * max supply and balance on own blockchain
 * for native HNT token.
 *
 * @memberof Driver
 * @augments Driver
 */
class Helium extends Driver {
  constructor(options) {
    super(
      {
        timeout: 100, // 10 requests per second
        supports: {
          max: true,
          balances: true,
        },
      },
      options,
    );
  }

  /**
   * get max supply for native token
   *
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 223000000;
  }

  /**
   * get total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const supply = await this.request('https://api.helium.io/v1/stats/token_supply?format=raw');

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
    const { data: { balance } } = await this.request(
      `https://api.helium.io/v1/accounts/${modifier}`,
    );
    return Number(balance);
  }

  /**
   * get supply
   *
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
      total,
      max,
      circulating,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = Helium;
