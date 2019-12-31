const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Ripple driver.
 *
 * @memberof Drivers
 * @augments Driver
 */
class Ripple extends Driver {
  constructor(options) {
    super({
      blockchain: 'XRP',
      supports: {
        circulating: true,
        max: true,
      },
      options,
    });
  }

  /**
   * @augments fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const { rows } = await this.request('https://data.ripple.com/v2/network/xrp_distribution');
    const latestRow = rows.pop();
    const total = Number(latestRow.total);

    return total;
  }

  /**
   * @augments fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { rows } = await this.request('https://data.ripple.com/v2/network/xrp_distribution');
    const latestRow = rows.pop();
    const circulating = Number(latestRow.distributed);

    return circulating;
  }

  /**
   * @augments Drivers.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 100000000000;
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();
    const circulating = await this.fetchCirculatingSupply();
    const max = await this.fetchMaxSupply();

    return new Supply({
      total,
      circulating,
      max,
    });
  }
}

module.exports = Ripple;
