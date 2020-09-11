const Driver = require('../models/driver');
const Supply = require('../models/supply');

/** XinFin driver. Supports
 * max, total and circulating supply
 * for native token XDC on XinFin
 * blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class XinFin extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        circulating: true,
        max: true,
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 15000000000;
  }

  /** get total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const { result: total } = await this.request('https://explorerapi.xinfin.network/publicAPI?module=balance&action=totalXDC');
    return Number(total);
  }

  /** get circulating supply for native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { result: circulating } = await this.request('https://explorerapi.xinfin.network/publicAPI?module=balance&action=getcirculatingsupply');

    return Number(circulating);
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();
    const circulating = await this.fetchCirculatingSupply();
    const max = this.fetchMaxSupply();

    return new Supply({
      max,
      total,
      circulating,
    });
  }
}

module.exports = XinFin;
