const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Solana driver. Supports total
 * and circulating supply for SOL
 * token on own blockchain.
 *
 * @augments Driver
 * @memberof Driver
 */
class Solana extends Driver {
  constructor(options) {
    super({
      timeout: 1000, // 1 requests per second
      supports: {
        native: true,
        circulating: true,
        tokens: true,
        tokenCirculating: true,
        secret: true,
        blockchains: ['Solana'],
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

  async fetchTokenMintedAmount(reference) {
    let result;
    try {
      result = await this.request({
        method: 'POST',
        url: 'https://graphql.bitquery.io',
        headers: {
          'X-API-KEY': this.secret,
        },
        json: {
          query: `
            query ($token: String!) {
              supply: solana(network: solana) {
                mint: transfers(
                  currency: {is: $token}
                  transferType: {is: mint}
                  senderAddress: {is: ""}
                ) {
                  amount(calculate: sum)
                }
              }
            }
          `,
          variables: {
            token: reference,
          },
        },
      });
    } catch (error) {
      if (error.error.errors && error.error.errors.length > 0) {
        throw new Error(error.error.errors[0].message);
      }

      throw new Error(error.message);
    }

    if (result.errors && result.errors.length > 0) {
      throw new Error(result.errors[0].message);
    }

    return Number(result.data.supply.mint[0].amount);
  }

  async fetchTokenBurnedAmount(reference) {
    let result;
    try {
      result = await this.request({
        method: 'POST',
        url: 'https://graphql.bitquery.io',
        headers: {
          'X-API-KEY': this.secret,
        },
        json: {
          query: `
            query ($token: String!) {
              supply: solana(network: solana) {
                burned: transfers(
                  currency: {is: $token}
                  transferType: {is: burn}
                  receiverAddress: {is: ""}
                ) {
                  amount(calculate: sum)
                }
              }
            }
          `,
          variables: {
            token: reference,
          },
        },
      });
    } catch (error) {
      if (error.error.errors && error.error.errors.length > 0) {
        throw new Error(error.error.errors[0].message);
      }

      throw new Error(error.message);
    }

    if (result.errors && result.errors.length > 0) {
      throw new Error(result.errors[0].message);
    }

    return Number(result.data.supply.burned[0].amount);
  }

  /**
   * @augments Driver.fetchTokenTotalSupply
   * @param {string} reference The unique symbol of a coin.
   * @async
   */
  async fetchTokenTotalSupply(reference) {
    const minted = await this.fetchTokenMintedAmount(reference);
    const burned = await this.fetchTokenBurnedAmount(reference);
    return minted - burned;
  }

  /**
   * @augments Driver.fetchTokenCirculatingSupply
   * @param {string} reference The unique symbol of a coin.
   * @async
   */
  async fetchTokenCirculatingSupply(reference) {
    const minted = await this.fetchTokenMintedAmount(reference);
    const burned = await this.fetchTokenBurnedAmount(reference);
    return minted - burned;
  }

  /**
   * get total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request('https://api.mainnet-beta.solana.com/v0/total-supply');

    return Number(total);
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const total = await this.request('https://api.mainnet-beta.solana.com/v0/circulating-supply');

    return Number(total);
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply({ reference }) {
    if (typeof reference !== 'undefined') {
      const total = await this.fetchTokenTotalSupply(reference);
      const circulating = await this.fetchTokenCirculatingSupply(reference);

      return new Supply({
        total,
        circulating,
      });
    }

    const total = await this.fetchTotalSupply();
    const circulating = await this.fetchCirculatingSupply();

    return new Supply({
      total,
      circulating,
    });
  }
}

module.exports = Solana;
