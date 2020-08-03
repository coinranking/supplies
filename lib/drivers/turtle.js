const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');

/**
 * Turtle driver. Supports total, max and
 * circulating supply for native token and
 * smart contracts.
 *
 * @memberof Driver
 * @augments Driver
 */
class Turtle extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        tokens: true,
        circulating: true,
        max: true,
        blockchains: ['Turtle'],
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const data = await this.request('https://bot.blackturtle.eu/api/markets');
    const record = data.find((item) => item.amountAssetID === 'TN');

    return record ? Number(record.amountAssetTotalSupply) : 0;
  }

  /**
   * @augments Driver.fetchTokenTotalSupply
   * @param {string} reference The unique identifier of a coin. Usually a smart contract address.
   * @async
   */
  async fetchTokenTotalSupply(reference) {
    const data = await this.request('https://bot.blackturtle.eu/api/tickers');
    const record = data.filter((item) => item.amountAssetID === reference);

    return record ? Number(record[0].amountAssetTotalSupply) : 0;
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const data = await this.request('https://bot.blackturtle.eu/api/markets');
    const record = data.find((item) => item.amountAssetID === 'TN');

    return record ? Number(record.amountAssetCirculatingSupply) : 0;
  }

  /**
   * @augments Driver.fetchTokenCirculatingSupply
   * @param {string} reference The unique identifier of a coin. Usually a smart contract address.
   * @async
   */
  async fetchTokenCirculatingSupply(reference) {
    const data = await this.request('https://bot.blackturtle.eu/api/tickers');
    const record = data.filter((item) => item.amountAssetID === reference);

    return record ? Number(record[0].amountAssetCirculatingSupply) : 0;
  }

  /**
   * @augments Driver.fetchMaxSupply
   * @async
   */
  async fetchMaxSupply() {
    const data = await this.request('https://bot.blackturtle.eu/api/markets');
    const record = data.filter((item) => item.amountAssetID === 'TN');

    return record ? Number(record[0].amountAssetMaxSupply) : 0;
  }

  /**
   * @augments Driver.fetchTokenMaxSupply
   * @param {string} reference The unique identifier of a coin. Usually a smart contract address.
   * @async
   */
  async fetchTokenMaxSupply(reference) {
    const data = await this.request('https://bot.blackturtle.eu/api/tickers');
    const record = data.filter((item) => item.amountAssetID === reference);

    return record ? Number(record[0].amountAssetMaxSupply) : 0;
  }

  /**
   * @augments Driver.getSupply
   * @param {Coin} reference {@link Coin}
   * @async
   */
  async getSupply({ reference }) {
    let total = 0;
    let circulating = 0;
    let max = 0;

    if (reference) {
      total = await this.fetchTokenTotalSupply(reference);
      circulating = await this.fetchTokenCirculatingSupply(reference);
      max = await this.fetchTokenMaxSupply(reference);
    } else {
      total = await this.fetchTotalSupply();
      circulating = await this.fetchCirculatingSupply();
      max = await this.fetchMaxSupply();
    }

    return new Supply({
      total,
      circulating,
      max,
    });
  }
}

module.exports = Turtle;
