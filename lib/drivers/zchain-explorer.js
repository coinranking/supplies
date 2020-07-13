const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');
const SupplyModifier = require('../models/supply-modifier');
const Coin = require('../models/coin');

/**
 * Zchain driver. Supports total supply
 * and balance for native token, on own
 * blockchain Zcash.
 *
 * @memberof Driver
 * @augments Driver
 */
class ZchainExplorer extends Driver {
  constructor(options) {
    super({
      timeout: 200, // 5 requests per second
      supports: {
        balances: true,
        blockchains: ['Zcash'],
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const { totalAmount } = await this.request(
      'https://api.zcha.in/v2/mainnet/network',
    );
    return totalAmount;
  }

  /**
   * @augments Driver.fetchBalance
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchBalance(modifier) {
    const { balance } = await this.request(
      `https://api.zcha.in/v2/mainnet/accounts/${modifier}`,
    );
    return balance;
  }

  /**
   * @augments Driver.getSupply
   * @param {Coin} modifiers {@link Coin}
   * @async
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

module.exports = ZchainExplorer;
