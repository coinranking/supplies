const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Payment coin driver. Supports total supply
 * on own blockchain.
 *
 * @augments Driver
 * @memberof Driver
 */
class PaymentCoin extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        total: true,
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request('http://blockexplorer.info/ajax/blockchain_info.php?method=totalsupply');

    return Number(total);
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

module.exports = PaymentCoin;
