const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');
const SupplyModifier = require('../models/supply-modifier');
const Coin = require('../models/coin');

/**
 * BinanceDex driver. Supports fetching total supply
 * and balances for the native token (BNB) as well as
 * for tokens launched on the Binance Chain blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class BinanceDex extends Driver {
  constructor(options) {
    super({
      timeout: 200, // 5 requests per second
      supports: {
        balances: true,
        tokens: true,
        blockchains: ['BinanceChain'],
      },
      options,
    });
  }

  /**
   * get total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const data = await this.request('https://dex.binance.org/api/v1/tokens?limit=999999999');
    const record = data.find((item) => item.symbol === 'BNB');

    return record ? Number(record.total_supply) : 0;
  }

  /**
   * get total supply for specific contract address
   *
   * @augments Driver.fetchTokenTotalSupply
   * @param {string} reference The unique identifier of a coin. Usually a smart contract address.
   * @async
   */
  async fetchTokenTotalSupply(reference) {
    const data = await this.request('https://dex.binance.org/api/v1/tokens?limit=999999999');

    const record = data.find((item) => item.symbol === reference);
    return record ? Number(record.total_supply) : 0;
  }

  /**
   * get balance for specific wallet address
   *
   * @augments Driver.fetchBalance
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchBalance(modifier) {
    const { balances } = await this.request(
      `https://dex.binance.org/api/v1/account/${modifier}`,
    );

    const record = balances.find((item) => item.symbol === 'BNB');

    return record ? Number(record.free) + Number(record.frozen) + Number(record.locked) : 0;
  }

  /**
   * get balance for specific wallet and contract address
   *
   * @param {string} reference The unique identifier of a coin. Usually a smart contract address.
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchTokenBalance(reference, modifier) {
    const { balances } = await this.request(
      `https://dex.binance.org/api/v1/account/${modifier}`,
    );

    const record = balances.find((item) => item.symbol === reference);

    return record
      ? Number(record.free)
          + Number(record.frozen)
          + Number(record.locked)
      : 0;
  }

  /**
   * @augments Driver.getSupply
   * @param {Coin} coin {@link Coin}
   */
  async getSupply({ reference, modifiers }) {
    let total;
    if (typeof reference === 'undefined') {
      total = await this.fetchTotalSupply();
    } else {
      total = await this.fetchTokenTotalSupply(reference);
    }

    const modifiersWithBalances = await promisesMap(
      modifiers,
      async (modifier) => {
        if (typeof reference === 'undefined') {
          const balance = await this.fetchBalance(modifier);
          return {
            reference: modifier,
            balance,
          };
        }

        const balance = await this.fetchTokenBalance(reference, modifier);
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

module.exports = BinanceDex;
