const Driver = require('../models/driver');
const Supply = require('../models/supply');

class DogeChain extends Driver {
  constructor() {
    super({
      blockchains: ['Dogecoin'],
    });
  }

  async fetchTotalSupply() {
    const total = await this.request('https://dogechain.info/chain/Dogecoin/q/totalbc');
    return Number(total);
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

module.exports = DogeChain;
