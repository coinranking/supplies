const Driver = require('../models/driver');
const Supply = require('../models/supply');

class LitecoinNet extends Driver {
  constructor() {
    super({
      blockchains: ['Litecoin'],
      supports: {
        circulating: true,
        max: true,
      },
    });
  }

  async fetchTotalSupply() {
    const total = await this.request('http://explorer.litecoin.net/chain/Litecoin/q/totalbc');
    return Number(total);
  }

  async fetchCirculatingSupply() {
    const circulating = await this.request('http://explorer.litecoin.net/chain/Litecoin/q/totalbc');
    return Number(circulating);
  }

  fetchMaxSupply() {
    return 84000000;
  }

  async getSupply() {
    const total = await this.fetchTotalSupply();
    const circulating = await this.fetchCirculatingSupply();
    const max = await this.fetchMaxSupply();

    return new Supply({
      total,
      circulating,
      max,
    });
  }
}

module.exports = LitecoinNet;
