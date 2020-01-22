const Driver = require('../models/driver');
const Supply = require('../models/supply');

class Decred extends Driver {
  constructor(options) {
    super({
      blockchain: 'Decred',
      timeout: 200, // 5 requests per second
      supports: {
        native: true,
        circulating: true,
      },
      options: {
        ...options,
        useCache: true,
      },
    });
  }

  async fetchTotalSupply() {
    const { supply_ultimate: supply } = await this.request(
      'https://dcrdata.decred.org/api/supply',
    );
    return Number(supply) / (10 ** 8);
  }

  async fetchCirculatingSupply() {
    const { supply_mined: circulating } = await this.request(
      'https://dcrdata.decred.org/api/supply',
    );
    return Number(circulating) / (10 ** 8);
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

module.exports = Decred;
