const Driver = require('../models/driver');
const Supply = require('../models/supply');
const request = require('../request');

class MoneroBlocks extends Driver {
  constructor() {
    super({
      blockchains: ['monero'],
    });
  }

  async _fetchTotalSupply() {
    const data = await request('http://moneroblocks.info/api/get_stats/');
    return Number(data.total_emission) / 1000000000000;
  }

  async getSupply(coin) {
    if (coin.reference !== 'native') throw new Error('Coin not supported');

    const total = await this._fetchTotalSupply();
    const circulating = total;

    return new Supply({
      total,
      circulating,
    });
  }
}

module.exports = MoneroBlocks;
