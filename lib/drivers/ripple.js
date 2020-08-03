const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Ripple driver. Supports total, max
 * and circulating supply on own blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class Ripple extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 request per second
      supports: {
        circulating: true,
        max: true,
        blockchains: ['XRP Ledger'],
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const { rows } = await this.request('https://data.ripple.com/v2/network/xrp_distribution');
    const latestRow = rows.pop();
    const total = Number(latestRow.total);

    return total;
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { rows } = await this.request('https://data.ripple.com/v2/network/xrp_distribution');
    const latestRow = rows.pop();
    const circulating = Number(latestRow.distributed);

    return circulating;
  }

  /**
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 100000000000;
  }

  /**
   * @augments Driver.getSupply
   * @async
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();
    const circulating = await this.fetchCirculatingSupply();
    const max = this.fetchMaxSupply();

    return new Supply({
      total,
      circulating,
      max,
    });
  }
}

module.exports = Ripple;
