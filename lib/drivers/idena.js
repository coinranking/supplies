const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Idena driver. Supports total and circulating supply
 * for specific wallet address for native token DNA on
 * Idena blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Idena extends Driver {
  constructor(options) {
    super(
      {
        timeout: 100, // 10 request per second
        supports: {
          circulating: true,
          blockchains: ['Idena'],
        },
      },
      options,
    );
  }

  /** get total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const { result: { minted } } = await this.request('https://api.idena.io/api/Coins');
    return Number(minted);
  }

  /** get circulating supply for native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { result } = await this.request('https://api.idena.io/api/CirculatingSupply');
    return Number(result);
  }

  /** get supply
   *
   * @augments Driver.getSupply
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

module.exports = Idena;
