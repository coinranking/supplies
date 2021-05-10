const Driver = require('../models/driver');
const Supply = require('../models/supply');

/** Akash driver.
 *
 * @memberof Driver
 * @augments Driver
 */
class Akash extends Driver {
  constructor(options) {
    super({
      timeout: 200, // 5 requests per second
      supports: {
        max: true,
        circulating: true,
      },
      options,
    });
  }

  /** get max supply for native token
   *
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 388539008;
  }

  /** get total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const { result: { supply: { total } } } = await this.request(
      'https://public-lcd2.akash.vitwit.com/supply/summary',
    );

    const record = total.find((item) => item.denom === 'uakt');

    return Number(record.amount) / 10 ** 6;
  }

  /** get circulating supply for native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const { result: { supply: { circulating } } } = await this.request(
      'https://public-lcd2.akash.vitwit.com/supply/summary',
    );

    const record = circulating.find((item) => item.denom === 'uakt');

    return Number(record.amount) / 10 ** 6;
  }

  async getSupply() {
    const total = await this.fetchTotalSupply();
    const max = this.fetchMaxSupply();
    const circulating = await this.fetchCirculatingSupply();

    return new Supply({
      total,
      max,
      circulating,
    });
  }
}

module.exports = Akash;
