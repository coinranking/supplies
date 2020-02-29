const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

/** Blockstack driver.
 *
 */
class Blockstack extends Driver {
  constructor(options) {
    super({
      blockchain: 'Blockstack',
      timeout: 200, // 5 requests per second
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
    const { unlockedSupply: total } = await this.request('https://blockstack-explorer-api.herokuapp.com/api/home');
    return Number(total);
  }

  /** get max supply for native token
   *
   * @augments Driver.fetchMaxSupply
   * @async
   */
  async fetchMaxSupply() {
    let { totalStacks: max } = await this.request('https://blockstack-explorer-api.herokuapp.com/api/home');
    max = max.replace(/,/g, '');
    return Number(max);
  }

  /** get balance for specific wallet address
   *
   * @augments Driver.fetchBalance
   * @param {modifierParam} modifier {@link modifierParam}
   * @async
   */
  async fetchBalance(modifier) {
    const { balance } = await this.request(`https://core.blockstack.org/v1/accounts/${modifier}/STACKS/balance`);
    return Number(balance);
  }


  /** get supply
   *
   * @augments Driver.getSupply
   * @param {modifierParam[]} modifiers {@link modifierParam}
   * @async
   */
  async getSupply({ modifiers }) {
    const total = await this.fetchTotalSupply();
    const max = await this.fetchMaxSupply();

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

    const circulating = modifiersWithBalances
      .reduce((current, modifier) => current - modifier.balance, total);

    return new Supply({
      total,
      max,
      circulating,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = Blockstack;
