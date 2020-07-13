const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');
const SupplyModifier = require('../models/supply-modifier');

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
    const supply = await this.request('https://api.ergoplatform.com/api/v0/info/supply');

    return Number(supply);
  }

  /**
   *
   * @augments Driver.fetchBalance
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchBalance(modifier) {
    const {
      transactions: { totalBalance },
    } = await this.request(
      `https://api.ergoplatform.com/addresses/${modifier}`,
    );
    return Number(totalBalance) / 10 ** 9;
  }

  /**
   * @augments Driver.getSupply
   * @param {Coin} modifiers {@link coin}
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
