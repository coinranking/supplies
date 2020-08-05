const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Hivedb driver. Supports total and circulating supply
 * for tokens HIVE on HIVE blockchain and
 * STEEM on Steem blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Hive extends Driver {
  constructor(options) {
    super(
      {
        timeout: 100, // 10 requests per second
        supports: {
          circulating: true,
          blockchains: ['Hive', 'Steem'],
        },
      },
      options,
    );
  }

  async totalSupplySteem() {
    const data = await this.request('https://hive-db.com/api/props');
    const record = data.find((item) => item._id && item._id.$oid === '5d6d752d38f7a069c7efe0ba');

    if (record) {
      return Number(record.virtual_supply);
    }

    return Number(0);
  }

  async totalSupplyHive() {
    const data = await this.request('https://hive-db.com/api/props');
    const record = data.find((item) => item._id && item._id.$oid === '5f274a0d22e727eccbf74d68');

    if (record) {
      return Number(record.virtual_supply);
    }

    return Number(0);
  }

  /** get total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply(blockchain) {
    if (this.supportsBlockchain(blockchain) && this[`totalSupply${blockchain}`]) {
      return this[`totalSupply${blockchain}`]();
    }

    throw new Error(`The blockchain "${blockchain}" is not supported in this driver`);
  }

  async circulatingSupplyHive() {
    const data = await this.request('https://hive-db.com/api/props');
    const record = data.find((item) => item._id && item._id.$oid === '5f274a0d22e727eccbf74d68');

    if (record) {
      return Number(record.current_supply);
    }

    return Number(0);
  }

  async circulatingSupplySteem() {
    const data = await this.request('https://hive-db.com/api/props');
    const record = data.find((item) => item._id && item._id.$oid === '5d6d752d38f7a069c7efe0ba');

    if (record) {
      return Number(record.current_supply);
    }

    return Number(0);
  }

  /** get circulating supply for native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply(blockchain) {
    if (this.supportsBlockchain(blockchain) && this[`circulatingSupply${blockchain}`]) {
      return this[`circulatingSupply${blockchain}`]();
    }

    throw new Error(`The blockchain "${blockchain}" is not supported in this driver`);
  }

  /** get supply
   *
   * @augments Driver.getSupply
   * @param {Coin} blockchain {@link Coin}
   * @async
   */
  async getSupply({ blockchain }) {
    const total = await this.fetchTotalSupply(blockchain);
    const circulating = await this.fetchCirculatingSupply(blockchain);

    return new Supply({
      total,
      circulating,
    });
  }
}

module.exports = Hive;
