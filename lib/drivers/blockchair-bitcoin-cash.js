const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');
const SupplyModifier = require('../models/supply-modifier');
const { promisesMap } = require('../util');

/**
 * Blockchair driver. Supports total suplpy and balance
 * for native token on Bitcoin Cash blockchain.
 *
 * @augments Driver
 * @memberof Driver
 */
class BlockchairBitcoinCash extends Driver {
  constructor(options) {
    super({
      blockchain: 'Bitcoin Cash',
      timeout: 200, // 5 requests per second
      supports: {
        native: true,
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
    const { data } = await this.request(
      'https://api.blockchair.com/bitcoin-cash/stats',
    );
    return data.circulation / 10 ** 8;
  }

  /** get balance value for specific wallet address
   *
   * @augments Driver.fetchBalance
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchBalance(modifier) {
    const { data } = await this.request(
      `https://api.blockchair.com/bitcoin-cash/dashboards/address/${modifier}`,
    );
    return data[modifier].address.balance / 10 ** 8;
  }

  /**
   * @augments Driver.getSupply
   * @param {Coin} coin {@link Coin}
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

module.exports = BlockchairBitcoinCash;
