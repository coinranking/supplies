const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Tron Making Machine driver. Supports
 * max and total supply for native TMM token
 * on own blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class TronMakingMachine extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        max: true,
      },
      options,
    });
  }

  /**
   * get max supply for native token
   *
   * @augments Driver.fetchMaxSupply
   * @async
   */
  async fetchMaxSupply() {
    const max = await this.request('https://tmmtoken.com/api/index.php?para=totalSupply');

    return max;
  }

  /**
   * get total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request('https://tmmtoken.com/api/index.php?para=circulatingSupply');
    return Number(total);
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();
    const max = await this.fetchMaxSupply();

    return new Supply({
      total,
      max,
    });
  }
}

module.exports = TronMakingMachine;
