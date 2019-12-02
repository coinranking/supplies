const Driver = require('../models/driver');
const Supply = require('../models/supply');

class DogeChain extends Driver {
  constructor() {
    super({
      blockchains: ['Dogecoin'],
      supports: {
        circulating: true,
      },
    });
  }

  async fetchTotalSupply() {
    const total = await this.request('https://dogechain.info/chain/Dogecoin/q/totalbc');
    return Number(total);
  }

  async fetchCirculatingSupply() {
    const circulating = await this.request('https://dogechain.info/chain/Dogecoin/q/totalbc');
    return Number(circulating);
  }

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
