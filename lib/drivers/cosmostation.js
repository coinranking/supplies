const Driver = require('../models/driver');
const Supply = require('../models/supply');

class Cosmostation extends Driver {
  constructor(options) {
    super({
      blockchain: 'Cosmos',
      timeout: 100, // 10 requests per second
      supports: {
        circulating: true,
      },
      options: {
        ...options,
        useCache: true,
      },
    });
  }

  async fetchTotalSupply() {
    const { total_supply_tokens: total } = await this.request('https://api.cosmostation.io/v1/status');
    return total;
  }

  async fetchCirculatingSupply() {
    const { total_circulating_tokens: total } = await this.request('https://api.cosmostation.io/v1/status');
    return total;
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


module.exports = Cosmostation;
