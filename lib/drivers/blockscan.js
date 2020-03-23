const Driver = require('../models/driver');
const Supply = require('../models/supply');

class Blockscan extends Driver {
  constructor(options) {
    super({
      blockchain: 'Blockscan',
      timeout: 100, // 10 requiest per second
      supports: {
        total: true,
      },
      options,
    });
  }

  async fetchTotalSupply() {
    const { result } = await this.request(
      'https://api-grin.blockscan.com/v1/api?module=stats&action=grinsupply',
    );

    return Number(result);
  }

  async getSupply() {
    const total = await this.fetchTotalSupply();

    return new Supply({
      total,
    });
  }
}

module.exports = Blockscan;
