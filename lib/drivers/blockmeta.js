const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Blockmeta driver. Support total supply
 * and circulating supply for BTM coin
 * on Bytom blockchain.
 *
 * @augments Driver
 * @memberof Driver
 */
class Blockmeta extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 request per second
      supports: {
        circulating: true,
        blockchains: ['Bytom'],
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request(
      'https://blockmeta.com/api/v3/asset-totalcoins/ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    ); // BTC coin

    return Number(total);
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { circulating_supply: circulating } = await this.request(
      'https://blockmeta.com/api/v2/stat/total',
    );

    return Number(circulating) / 10 ** 8;
  }

  /**
   * @augments Driver.getSupply
   * @async
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();

    const circulating = await this.fetchCirculatingSupply();

    return new Supply({
      total,
      circulating,
    });
  }
}

module.exports = Blockmeta;
