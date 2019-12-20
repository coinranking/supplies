const Driver = require('../models/driver');
const Supply = require('../models/supply');

class BlockchainInfo extends Driver {
  constructor(options) {
    super({
      blockchain: 'Bitcoin',
      supports: {
        circulating: true,
        max: true,
      },
      options,
    });
  }

  async fetchTotalSupply() {
    const total = await this.request('https://blockchain.info/q/totalbc');
    return Number(total / 100000000);
  }

  async fetchCirculatingSupply() {
    const circulating = await this.request('https://blockchain.info/q/totalbc');
    return Number(circulating / 100000000);
  }

  fetchMaxSupply() {
    return 21000000;
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

module.exports = BlockchainInfo;
