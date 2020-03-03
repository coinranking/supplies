const Driver = require('../models/driver');
const Supply = require('../models/supply');

class Blockmeta extends Driver {
  constructor(options) {
    super({
      blockchain: 'Bytom',
      timeout: 100, // 10 requiest per second
      supports: {
        circulating: true,
      },
      options,
    });
  }

  async fetchTotalSupply() {
    const total = await this.request(
      'https://blockmeta.com/api/v3/asset-totalcoins/ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    ); // BTC coin

    return Number(total);
  }

  async fetchCirculatingSupply() {
    const { circulating_supply: circulating } = await this.request(
      'https://blockmeta.com/api/v2/stat/total',
    );

    return Number(circulating) / 10 ** 8;
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

module.exports = Blockmeta;
