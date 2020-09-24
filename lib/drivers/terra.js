const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');
const SupplyModifier = require('../models/supply-modifier');
const { promisesMap } = require('../util');

/**
 * Terra explorer. Supports total supply
 * and balance for specific address
 * on Terra blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Terra extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
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
    const { result } = await this.request('https://lcd.terra.dev/supply/total');
    const record = result.find((item) => item.denom === 'uluna');

    if (!record) {
      return undefined;
    }

    return Number(record.amount) / 10 ** 6;
  }

  /**
   * @augments Driver.fetchBalance
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchBalance(modifier) {
    const { result } = await this.request(`https://lcd.terra.dev/bank/balances/${modifier}`);
    const record = result.find((item) => item.denom === 'uluna');

    if (!record) {
      return 0;
    }

    return Number(record.amount) / 10 ** 6;
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

module.exports = Terra;
