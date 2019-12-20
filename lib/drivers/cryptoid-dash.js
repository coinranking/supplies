const Driver = require('../models/driver');
const Supply = require('../models/supply');

class CryptoidDash extends Driver {
  constructor(options) {
    super({
      blockchain: 'Dash',
      timeout: 200, // 5 requests per second
      supports: {
        native: false,
        circulating: true,
        assets: true,
      },
      options,
    });
  }

  async fetchAssetTotalSupply() {
    const total = await this.request('https://chainz.cryptoid.info/dash/api.dws?q=totalcoins');

    return Number(total);
  }

  async fetchAssetCirculatingSupply() {
    const circulating = await this.request('https://chainz.cryptoid.info/dash/api.dws?q=circulating');

    return Number(circulating);
  }

  async getSupply() {
    const total = await this.fetchAssetTotalSupply();
    const circulating = await this.fetchAssetCirculatingSupply();

    return new Supply({
      total,
      circulating,
    });
  }
}

module.exports = CryptoidDash;
