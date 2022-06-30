const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Elrond driver. Supports circulating and max
 * supply for native token ERD on Elrond blockchain
 *
 * @memberof Driver
 * @augments Driver
 */
class Elrond extends Driver {
  constructor(options) {
    super({
      supports: {
        total: true,
        max: true,
        circulating: true,
      },
      options,
    });
  }

  /**
   * get max supply
   *
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return Number('31415926.00');
  }

  /**
   * get total supply for native coin
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const data = await this.request({
      url: 'https://api.elrond.com/economics',
      headers: {
        accept: 'application/json',
      },
    });
    const { totalSupply } = data;

    if (!totalSupply) {
      return undefined;
    }

    return Number(totalSupply);
  }

  /**
   * get circulating supply for native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const data = await this.request({
      url: 'https://api.elrond.com/economics',
      headers: {
        accept: 'application/json',
      },
    });
    const { circulatingSupply } = data;

    if (!circulatingSupply) {
      return undefined;
    }

    return Number(circulatingSupply);
  }

  /**
   * @augments Driver.getSupply
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

module.exports = Elrond;
