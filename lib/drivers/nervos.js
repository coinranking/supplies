const Driver = require('../models/driver');
const Supply = require('../models/supply');

class Nervos extends Driver {
  constructor(options) {
    super({
      blockchain: 'Nervos',
      timeout: 100, // 10 requests per second
      supports: {
        native: true,
        balances: true,
        circulating: true,
      },
      options,
    });
  }

  async fetchTotalSupply() {
    const supply = await this.request(
      'https://api.explorer.nervos.org/api/v1/market_data/total_supply',
    );
    return Number(supply);
  }

  async fetchCirculatingSupply() {
    const circulating = await this.request(
      'https://api.explorer.nervos.org/api/v1/market_data/circulating_supply',
    );
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

module.exports = Nervos;
