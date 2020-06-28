const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

/**
 * Ergo driver. Supports total supply and
 * balance for native token on own
 * blockchain.
 *
 * @augments Driver
 * @memberof Driver
 */
class ErgoExplorer extends Driver {
  constructor(options) {
    super(
      {
        timeout: 100, // 10 request per second
        supports: {
          balances: true,
          blockchains: ['Ergo'],
        },
      },
      options,
    );
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const { supply } = await this.request('https://api.ergoplatform.com/info');

    return Number(supply) / 10 ** 9;
  }

  /**
   *
   * @augments Driver.fetchBalance
   * @param {modifierParam} modifier {@link modifierParam}
   * @async
   */
  async fetchBalance(modifier) {
    const {
      transactions: { totalBalance },
    } = await this.request(
      `https://api.ergoplatform.com/addresses/${modifier}`,
    );
    return Number(totalBalance);
  }

  /**
   * @augments Driver.getSupply
   * @param {modifierParam[]} modifiers {@link modifierParam}
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

module.exports = ErgoExplorer;
