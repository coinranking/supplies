const Driver = require('../models/driver');
const Supply = require('../models/supply');

class Ddkoin extends Driver {
  constructor(options) {
    super({
      blockchain: 'DDKoin',
      supports: {
        circulating: true,
        max: true,
        websockets: true,
      },
      options,
    });
  }

  async fetchTotalSupply() {
    const data = await this.socket('waitOn', 'ws://68.183.235.184:7008', 'UPDATE_BLOCKCHAIN_INFO');

    return data.circulatingSupply / (10 ** 8);
  }

  async fetchCirculatingSupply() {
    const data = await this.socket('waitOn', 'ws://68.183.235.184:7008', 'UPDATE_BLOCKCHAIN_INFO');

    return data.circulatingSupply / (10 ** 8);
  }

  async fetchMaxSupply() {
    const data = await this.socket('waitOn', 'ws://68.183.235.184:7008', 'UPDATE_BLOCKCHAIN_INFO');

    return data.totalSupply / (10 ** 8);
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

module.exports = Ddkoin;
