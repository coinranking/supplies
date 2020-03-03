const Driver = require('../models/driver');
const Supply = require('../models/supply');

class Turtle extends Driver {
  constructor(options) {
    super({
      blockchain: 'Turtle',
      timeout: 100, // 10 requiest per second
      supports: {
        tokens: true,
        circulating: true,
        max: true,
      },
      options,
    });
  }

  async fetchTotalSupply() {
    const data = await this.request('https://bot.blackturtle.eu/api/markets');
    const record = data.find((item) => item.amountAssetID === 'TN');

    return record ? Number(record.amountAssetTotalSupply) : 0;
  }

  async fetchTokenTotalSupply(reference) {
    const data = await this.request('https://bot.blackturtle.eu/api/tickers');
    const record = data.filter((item) => item.amountAssetID === reference);

    return record ? Number(record[0].amountAssetTotalSupply) : 0;
  }

  async fetchCirculatingSupply() {
    const data = await this.request('https://bot.blackturtle.eu/api/markets');
    const record = data.find((item) => item.amountAssetID === 'TN');

    return record ? Number(record.amountAssetCirculatingSupply) : 0;
  }

  async fetchTokenCirculatingSupply(reference) {
    const data = await this.request('https://bot.blackturtle.eu/api/tickers');
    const record = data.filter((item) => item.amountAssetID === reference);

    return record ? Number(record[0].amountAssetCirculatingSupply) : 0;
  }

  async fetchMaxSupply() {
    const data = await this.request('https://bot.blackturtle.eu/api/markets');
    const record = data.filter((item) => item.amountAssetID === 'TN');

    return record ? Number(record[0].amountAssetMaxSupply) : 0;
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
    } else {
      total = await this.fetchTotalSupply();
      circulating = await this.fetchCirculatingSupply();
      max = await this.fetchMaxSupply();
    }

    return new Supply({
      total,
      circulating,
      max,
    });
  }
}

module.exports = Turtle;
