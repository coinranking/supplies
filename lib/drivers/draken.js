const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Draken driver. Support
 * total supply for Draken token.
 *
 * @memberof Driver
 * @augments Driver
 */
class Draken extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        blockchains: ['Draken'],
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const data = await this.request({
      url: 'https://explorer.draken.tech/graphiql',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      json: {
        query: `
          query {
            address(hash: "0x0000000000000000000000000000000000000066") {
              fetchedCoinBalance
            }
          }
        `,
      },
    });

    const { data: { address: { fetchedCoinBalance } } } = data;

    return Number(fetchedCoinBalance) / 10 ** 18;
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();

    return new Supply({
      total,
    });
  }
}

module.exports = Draken;
