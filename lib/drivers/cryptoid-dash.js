const Driver = require('../models/driver');
const Supply = require('../models/supply');

class CryptoidDash extends Driver {
  constructor(options) {
    super({
      blockchain: 'Dash',
      timeout: 200, // 5 requests per second
      supports: {
        native: true,
        circulating: true,
      },
      options,
    });
  }

  async fetchTotalSupply() {
    const total = await this.request('https://chainz.cryptoid.info/dash/api.dws?q=totalcoins');

    return Number(total);
  }

  async fetchCirculatingSupply() {
    const circulating = await this.request('https://chainz.cryptoid.info/dash/api.dws?q=circulating');

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

module.exports = CryptoidDash;
