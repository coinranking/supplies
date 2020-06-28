const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

/**
 * Zilliqa driver. Supports total supply
 * and balance for native token, on own
 * blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Zilliqa extends Driver {
  constructor(options) {
    super({
      timeout: 334, // 3 requests per second
      supports: {
        balances: true,
        secret: true,
        blockchains: ['Zilliga'],
      },
      options,
    });
  }

  /**
   *
   * @returns {string} API Key
   */
  get secret() {
    if (!this._secret) {
      throw new Error('API key is required');
    }
    return this._secret;
  }

  /**
   *
   * @param {string} secret API Key
   */
  set secret(secret) {
    this._secret = secret;
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    return Number(21000000000);
  }

  /**
   * @augments Driver.fetchBalance
   * @async
   */
  async fetchBalance(modifier) {
    const data = await this.request({
      url: `https://api.viewblock.io/v1/zilliqa/addresses/${modifier}`,
      headers: {
        'X-APIKEY': this.secret,
      },
    });
    return Number(data[0].balance) / 1000000000000;
  }

  /**
   * @augments Driver.getSupply
   * @param {modifierParam} modifier {@link modifierParam}
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

    const circulating = modifiersWithBalances
      .reduce((current, modifier) => current - modifier.balance, total);

    return new Supply({
      total,
      circulating,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = Zilliqa;
