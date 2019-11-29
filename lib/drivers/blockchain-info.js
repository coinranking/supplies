const Driver = require('../models/driver');
const Supply = require('../models/supply');

class BlockchainInfo extends Driver {
  constructor() {
    super({
      blockchains: ['Bitcoin'],
    });
  }

  async _fetchTotalSupply() {
    const total = await this.request('https://blockchain.info/q/totalbc');
    return Number(total / 100000000);
  }

  async getSupply() {
    const total = await this._fetchTotalSupply();
    const circulating = total;
    const max = 21000000;

    return new Supply({
      total,
      circulating,
      max,
    });
  }
}

module.exports = BlockchainInfo;
