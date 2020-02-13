const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Blocks explorer. Supports total and max supply
 * for EOS token.
 *
 * @augments Driver
 * @memberof Driver
 */
class BlocksEos extends Driver {
  constructor(options) {
    super({
      blockchain: 'Eos',
      supports: {
        native: true,
        max: true,
        circulating: false,
      },
      options: {
        ...options,
        useCache: true,
      },
    });
  }

  /** get total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const data = await this.request('https://www.api.bloks.io/tokens');

    const record = data.filter((item) => item.symbol === 'EOS');

    if (!record.length) {
      return 0;
    }

    const {
      supply: { circulating },
    } = record[0];
    return Number(circulating);
  }

  /** get max total supply for native token
   *
   * @augments Driver.fetchMaxSupply
   * @async
   */
  async fetchMaxSupply() {
    const data = await this.request('https://www.api.bloks.io/tokens');

    const record = data.filter((item) => item.symbol === 'EOS');

    if (!record.length) {
      return 0;
    }

    const {
      supply: { max },
    } = record[0];
    return Number(max);
  }

  async getSupply() {
    const total = await this.fetchTotalSupply();
    const max = await this.fetchMaxSupply();

    return new Supply({
      total,
      max,
    });
  }
}

module.exports = BlocksEos;
