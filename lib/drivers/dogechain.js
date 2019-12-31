const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Dogechain driver.
 *
 * @memberof Drivers
 * @augments Driver
 */
class DogeChain extends Driver {
  constructor(options) {
    super({
      blockchain: 'Dogecoin',
      supports: {
        circulating: true,
      },
      options,
    });
  }

  /**
   * @augments fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request('https://dogechain.info/chain/Dogecoin/q/totalbc');
    return Number(total);
  }

  /**
   * @augments fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request('https://dogechain.info/chain/Dogecoin/q/totalbc');
    return Number(circulating);
  }

  /**
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

module.exports = DogeChain;
