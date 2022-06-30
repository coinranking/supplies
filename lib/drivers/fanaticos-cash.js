const Driver = require('../models/driver');
const Supply = require('../models/supply');
const SupplyModifier = require('../models/supply-modifier');
const Coin = require('../models/coin');
const { promisesMap } = require('../util');

/**
 * Fanaticos cash driver. Supports max and
 * total supply  along with balance
 * for FCH token on Fanatics Cash blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class FanaticosCash extends Driver {
  constructor(options) {
    super({
      supports: {
        max: true,
        balances: true,
        blockchains: ['Fanatics Cash'],
      },
      options,
    });
  }

  fetchMaxSupply() {
    return 21000000;
  }

  /**
   * get total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const supply = await this.request('https://explorer.fanaticoscriptos.com/ext/getmoneysupply');

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
    const balance = await this.request(`https://explorer.fanaticoscriptos.com/ext/getbalance/${modifier}`);
    return Number(balance);
  }

  /**
   * @augments Driver.getSupply
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
      modifiers: modifiersWithBalances,
      circulating,
    });
  }
}

module.exports = FanaticosCash;
