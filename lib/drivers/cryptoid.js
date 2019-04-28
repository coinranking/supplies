const Driver = require('../models/driver');
const Supply = require('../models/supply');
const request = require('../request');

class Cryptoid extends Driver {
  constructor() {
    super({
      blockchains: ['bitcoin-zero'],
      timeout: 200, // 5 requests per second
    });
  }

  async _fetchTotalSupply(coin) {
    await this.throttle.push();

    const total = await request(`https://chainz.cryptoid.info/${coin.reference}/api.dws?q=totalcoins`);

    return Number(total);
  }

  async _fetchCirculatingSupply(coin) {
    await this.throttle.push();

    const circulating = await request(`https://chainz.cryptoid.info/${coin.reference}/api.dws?q=circulating`);

    return Number(circulating);
  }

  async getSupply(coin) {
    const total = await this._fetchTotalSupply(coin);
    const circulating = await this._fetchCirculatingSupply(coin);

    return new Supply({
      total,
      circulating,
    });
  }
}

module.exports = Cryptoid;
