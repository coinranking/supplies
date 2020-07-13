const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');
const SupplyModifier = require('../models/supply-modifier');
const { promisesMap } = require('../util');

/**
 * Ravencoin driver. Supports total, max
 * and circulating supply for native coin
 * RVN on Ravencoin blockchain. Also supports
 * balance for specific wallet address.
 *
 * @memberof Driver
 * @augments Driver
 */
class Ravencoin extends Driver {
  constructor(options) {
    super({
      supports: {
        circulating: true,
        balances: true,
        blockchains: ['Ravencoin'],
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
    return Number('21000000000');
  }

  /** get max supply for native token
   *
   * @augments Driver.fetchMaxSupply
   * @async
   */
  async fetchMaxSupply() {
    return Number('21000000000');
  }

  /** get circulating supply
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const total = await this.request('https://ravencoin.network/api/supply');

    return Number(total);
  }

  /** get balance for specific wallet address
   *
   * @augments Driver.fetchBalance
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchBalance(modifier) {
    const balance = await this.request(
      `https://ravencoin.network/api/addr/${modifier}/balance`,
    );

    return Number(balance) / 10 ** 8;
  }

  /**
   * @augments Driver.getSupply
   * @param {Coin} coin {@link Coin}
   */
  async getSupply({ modifiers }) {
    const total = await this.fetchTotalSupply();
    const circulating = await this.fetchCirculatingSupply();

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

    return new Supply({
      total,
      circulating,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = Ravencoin;
