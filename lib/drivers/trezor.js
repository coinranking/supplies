const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');
const SupplyModifier = require('../models/supply-modifier');
const Coin = require('../models/coin');

/**
 * Trezor driver. Support total supply
 * and circulating supply for BTM coin
 * on Bytom blockchain.
 *
 * @augments Driver
 * @memberof Driver
 */
class Trezor extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        native: false,
        balances: true,
        blockchains: ['Polis'],
      },
      options,
    });
  }

  async totalSupplyPolis() {
    const total = await this.request('https://blockbook.polispay.org/api/totalsupply/');

    return Number(total);
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @param {string} blockchain on of supported blockchains
   * @async
   */
  async fetchTotalSupply(blockchain) {
    if (this.supportsBlockchain(blockchain) && this[`totalSupply${blockchain}`]) {
      return this[`totalSupply${blockchain}`]();
    }

    throw new Error(`The blockchain "${blockchain}" is not supported in this driver`);
  }

  async balancePolis(modifier) {
    const { balance } = await this.request(`https://blockbook.polispay.org/api/v2/address/${modifier}`);

    return Number(balance) / 10 ** 8;
  }

  /**
   * @augments Driver.fetchBalance
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @param {string} blockchain on of supported blockchains
   * @async
   */
  async fetchBalance(modifier, blockchain) {
    if (this.supportsBlockchain(blockchain) && this[`balance${blockchain}`]) {
      return this[`balance${blockchain}`](modifier);
    }

    throw new Error(`The blockchain "${blockchain}" is not supported in this driver`);
  }

  /**
   * @augments Driver.getSupply
   * @param {Coin} coin {@link Coin}
   * @async
   */
  async getSupply({ modifiers, blockchain }) {
    const total = await this.fetchTotalSupply(blockchain);

    const modifiersWithBalances = await promisesMap(
      modifiers,
      async (modifier) => {
        const balance = await this.fetchBalance(modifier, blockchain);

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
      circulating,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = Trezor;
