const Driver = require('../models/driver');
const Supply = require('../models/supply');

class Turtle extends Driver {
  constructor(options) {
    super({
      blockchain: 'Turtle',
      supports: {
        tokens: true,
        circulating: true,
        max: true,
      },
      options: {
        ...options,
        useCache: true,
      },
    });
  }

  async fetchTokenTotalSupply(reference) {
    const data = await this.request('https://bot.blackturtle.eu/api/tickers');
    const record = data.filter((item) => item.amountAssetID === reference);

    return record ? Number(record[0].amountAssetTotalSupply) : 0;
  }

  async fetchTokenCirculatingSupply(reference) {
    const data = await this.request('https://bot.blackturtle.eu/api/tickers');
    const record = data.filter((item) => item.amountAssetID === reference);

    return record ? Number(record[0].amountAssetCirculatingSupply) : 0;
  }

  async fetchTokenMaxSupply(reference) {
    const data = await this.request('https://bot.blackturtle.eu/api/tickers');
    const record = data.filter((item) => item.amountAssetID === reference);

    return record ? Number(record[0].amountAssetMaxSupply) : 0;
  }

  async getSupply({ reference }) {
    const total = await this.fetchTokenTotalSupply(reference);
    const circulating = await this.fetchTokenCirculatingSupply(reference);
    const max = await this.fetchTokenMaxSupply(reference);

    return new Supply({
      total,
      circulating,
      max,
    });
  }
}

module.exports = Turtle;
