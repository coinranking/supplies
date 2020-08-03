const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');
const SupplyModifier = require('../models/supply-modifier');
const { promisesMap } = require('../util');

/**
 * BridgeLto token base on LTO Network. Supports total
 * supply, circulating and balance for native token.
 *
 * @augments Driver
 * @memberof Driver
 */
class BridgeLto extends Driver {
  constructor(options) {
    super({
      timeout: 200, // 5 requests per second
      supports: {
        balances: true,
        blockchains: ['LTO Network'],
      },
      options,
    });
  }

  /** get total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request({
      url: 'https://bridge.lto.network/stats/total-supply',
      accept: 'text/html',
    });

    return Number(total);
  }

  /** get balance for specific wallet address
   *
   * @augments Driver.fetchBalance
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchBalance(modifier) {
    const { available } = await this.request(
      `https://nodes.lto.network/addresses/balance/details/${modifier}`,
    );

    return Number(available) / 10 ** 8;
  }

  /**
   * @augments Driver.getSupply
   * @param {Coin} coin {@link Coin}
   */
  async getSupply({ modifiers }) {
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
      circulating,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = BridgeLto;
