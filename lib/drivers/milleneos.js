const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

/**
 * MillenEOS driver. Supports circulating and total supply for EOS and
 * tokens on the EOS blockchain.
 *
 * @augments Driver
 * @memberof Driver
 */
class MillenEos extends Driver {
  constructor(options) {
    super({
      timeout: 200, // 5 requests per second
      supports: {
        balances: true,
        max: true,
        tokens: true,
        secret: true, // Should this be required?
        blockchains: ['EOS'],
      },
      options,
    });
  }

  get secret() {
    if (!this._secret) {
      throw new Error('API key is required');
    }
    return this._secret;
  }

  set secret(secret) {
    this._secret = secret;
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const tokens = await this.request({
      url: 'https://api.milleneos.com/tokens',
      rejectUnauthorized: false,
      headers: {
        Authorization: `Bearer ${this.secret}`,
      },
    });

    const { supply } = tokens.find((token) => (
      token.currency === 'EOS'
      && token.code === 'eosio.token'
    ));

    return Number(supply);
  }

  /**
   * @augments Driver.fetchBalance
   * @param {modifierParam} modifier {@link modifierParam}
   * @async
   */
  async fetchBalance(modifier) {
    const { balance: { total } } = await this.request({
      url: `https://api.milleneos.com/account/${modifier}`,
      rejectUnauthorized: false,
      headers: {
        Authorization: `Bearer ${this.secret}`,
      },
    });

    return Number(total);
  }

  /**
   * @augments Driver.fetchMaxSupply
   * @async
   */
  async fetchMaxSupply() {
    const tokens = await this.request({
      url: 'https://api.milleneos.com/tokens',
      rejectUnauthorized: false,
      headers: {
        Authorization: `Bearer ${this.secret}`,
      },
    });

    const { maxSupply } = tokens.find((token) => (
      token.currency === 'EOS'
      && token.code === 'eosio.token'
    ));

    return Number(maxSupply);
  }

  /**
   * @augments Driver.fetchTokenTotalSupply
   * @param {referenceParam} reference {@link referenceParam}
   * @async
   */
  async fetchTokenTotalSupply(reference) {
    const { supply } = await this.request({
      url: `https://api.milleneos.com/token?symbol=${reference}`,
      rejectUnauthorized: false,
      headers: {
        Authorization: `Bearer ${this.secret}`,
      },
    });

    return Number(supply);
  }

  /**
   * @augments Driver.fetchTokenBalance
   * @param {referenceParam} reference {@link referenceParam}
   * @param {modifierParam} modifier {@link modifierParam}
   * @async
   */
  async fetchTokenBalance(reference, modifier) {
    const { balances } = await this.request({
      url: `https://api.milleneos.com/balance/${modifier}`,
      rejectUnauthorized: false,
      headers: {
        Authorization: `Bearer ${this.secret}`,
      },
    });

    const balance = balances.find((item) => (item.currency === reference));

    if (!balance) return 0;

    return Number(balance.amount);
  }

  /**
   * @augments Driver.fetchTokenMaxSupply
   * @param {referenceParam} reference {@link referenceParam}
   * @async
   */
  async fetchTokenMaxSupply(reference) {
    const { maxSupply } = await this.request({
      url: `https://api.milleneos.com/token?symbol=${reference}`,
      rejectUnauthorized: false,
      headers: {
        Authorization: `Bearer ${this.secret}`,
      },
    });

    return Number(maxSupply);
  }

  /**
   * @augments Driver.getSupply
   * @param {coinParam} coin {@link coinParam}
   */
  async getSupply(coin) {
    let total;
    if (typeof coin.reference === 'undefined') {
      total = await this.fetchTotalSupply();
    } else {
      total = await this.fetchTokenTotalSupply(coin.reference);
    }

    const modifiersWithBalances = await promisesMap(
      coin.modifiers,
      async (modifier) => {
        if (typeof coin.reference === 'undefined') {
          const balance = await this.fetchBalance(modifier);
          return {
            reference: modifier,
            balance,
          };
        }
        const balance = await this.fetchTokenBalance(coin.reference, modifier);
        return {
          reference: modifier,
          balance,
        };
      },
    );
    const circulating = modifiersWithBalances
      .reduce((current, modifier) => current - modifier.balance, total);

    let max;
    if (typeof coin.reference === 'undefined') {
      max = await this.fetchMaxSupply();
    } else {
      max = await this.fetchTokenMaxSupply(coin.reference);
    }

    return new Supply({
      total,
      circulating,
      max,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = MillenEos;
