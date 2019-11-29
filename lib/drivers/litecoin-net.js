const Driver = require('../models/driver');
const Supply = require('../models/supply');

class LitecoinNet extends Driver {
  constructor() {
    super({
      blockchains: ['Litecoin'],
    });
  }

  async fetchTotalSupply() {
    const total = await this.request('http://explorer.litecoin.net/chain/Litecoin/q/totalbc');
    return Number(total);
  }

  async getSupply() {
    const total = await this.fetchTotalSupply();
    const circulating = total;
    const max = 84000000;

    return new Supply({
      total,
      circulating,
      max,
    });
  }
}

module.exports = LitecoinNet;
