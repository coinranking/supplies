const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

/**
 * Hedera Hasgraph explorer. Supports total, max
 * and circulating supply, also balance supply
 * for specific wallet address for native token HBAR.
 *
 * @augments Driver
 * @memberof Driver
 */
class HederaHashgraph extends Driver {
  constructor(options) {
    super({
      blockchain: 'Hedera',
      timeout: 1000, // 1 requests per second
      supports: {
        max: true,
        balances: true,
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
    return Number('50000000000'); // it's fixed
  }

  /** get max supply for native token
   *
   * @augments Driver.fetchMaxSupply
   * @async
   */
  async fetchMaxSupply() {
    return Number('50000000000'); // it's fixed
  }

  /** get circulating supply for native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request({
      url: 'https://hash-hash.info/rest/stats/circulating-supply-no-decimal',
      accept: 'text/html',
    });

    return Number(circulating);
  }

  /** get balance for specific wallet address
   *
   * @augments Driver.fetchBalance
   * @param {modifierParam} modifier {@link modifierParam}
   * @async
   */
  async fetchBalance(modifier) {
    const { balance: { amount } } = await this.request(
      `https://api.kabuto.sh/v1/account/${modifier}`, // mirror server
    );

    return Number(amount) / 10 ** 8;
  }

  /**
   * @augments Driver.getSupply
   * @param {modifierParam[]} modifiers {@link modifierParam}
   */
  async getSupply({ modifiers }) {
    const total = await this.fetchTotalSupply();
    const max = await this.fetchMaxSupply();
    // const circulating = await this.fetchCirculatingSupply();

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
      max,
      // circulating,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = HederaHashgraph;
