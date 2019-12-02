const Driver = require('../models/driver');
const Supply = require('../models/supply');

class MoneroBlocks extends Driver {
  constructor() {
    super({
      blockchains: ['Monero'],
    });
  }

  async fetchTotalSupply() {
    const data = await this.request('http://moneroblocks.info/api/get_stats/');
    return Number(data.total_emission) / 1000000000000;
  }

  async getSupply() {
    const total = await this.fetchTotalSupply();
    const circulating = total;

    return new Supply({
      total,
      circulating,
    });
  }
}

module.exports = MoneroBlocks;
