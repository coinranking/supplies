const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

/**
 * Ether-1 driver. Supports total supply and balance
 * for native token ETHO on Ether-11 blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Ether1 extends Driver {
  constructor(options) {
    super({
      blockchain: 'Ether-1',
      supports: {
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
    const total = await this.request(
      'https://api.ether1.org/api.php?api=total_supply',
    );
    return Number(total);
  }

  /** get balance for specific wallet address
   *
   * @augments Driver.fetchBalance
   * @param {modifierParam} modifier {@link modifierParam}
   * @async
   */
  async fetchBalance(modifier) {
    const { result: balance } = await this.request(
      `https://explorer.ether1.org/api?module=account&action=balance&address=${modifier}`,
    );
    return Number(balance) / 10 ** 18;
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

module.exports = Ether1;
