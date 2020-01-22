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
    let total = 0;
    let circulating = 0;
    let max = 0;

    if (reference) {
      total = await this.fetchTokenTotalSupply(reference);
      circulating = await this.fetchTokenCirculatingSupply(reference);
      max = await this.fetchTokenMaxSupply(reference);
    }

    return new Supply({
      total,
      circulating,
      max,
    });
  }
}

module.exports = Turtle;
