const Driver = require('../models/driver');
const Supply = require('../models/supply');

class Cryptoid extends Driver {
  constructor() {
    super({
      blockchains: ['Bitcoin Zero'],
      timeout: 200, // 5 requests per second
    });
  }

  async fetchAssetTotalSupply(reference) {
    const total = await this.request(`https://chainz.cryptoid.info/${reference}/api.dws?q=totalcoins`);

    return Number(total);
  }

  async fetchAssetCirculatingSupply(reference) {
    const circulating = await this.request(`https://chainz.cryptoid.info/${reference}/api.dws?q=circulating`);

    return Number(circulating);
  }

  async getSupply(reference) {
    const total = await this.fetchAssetTotalSupply(reference);
    const circulating = await this.fetchAssetCirculatingSupply(reference);

    return new Supply({
      total,
      circulating,
    });
  }
}

module.exports = Cryptoid;
