const Driver = require('../models/driver');
const Supply = require('../models/supply');

/** Blockstack driver. Supports total
 * and circulating supply for native token
 * on Blockstack blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Blockstack extends Driver {
  constructor(options) {
    super({
      blockchain: 'Blockstack',
      timeout: 200, // 5 requests per second
      supports: {
        native: true,
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
    const { totalStacks } = await this.request(
      'https://blockstack-explorer-api.herokuapp.com/api/home',
    );
    const total = totalStacks.replace(/,/g, '');

    return Number(total);
  }

  /** get circulating supply for native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { unlockedSupply: circulating } = await this.request(
      'https://blockstack-explorer-api.herokuapp.com/api/home',
    );
    return Number(circulating);
  }

  /** get supply
   *
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

module.exports = Blockstack;
