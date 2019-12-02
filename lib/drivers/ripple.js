const Driver = require('../models/driver');
const Supply = require('../models/supply');

class Ripple extends Driver {
  constructor() {
    super({
      blockchains: ['XRP'],
      supports: {
        circulating: true,
        max: true,
      },
    });
  }

  async fetchTotalSupply() {
    const { rows } = await this.request('https://data.ripple.com/v2/network/xrp_distribution');
    const latestRow = rows.pop();
    const total = Number(latestRow.total);

    return total;
  }

  async fetchCirculatingSupply() {
    const { rows } = await this.request('https://data.ripple.com/v2/network/xrp_distribution');
    const latestRow = rows.pop();
    const circulating = Number(latestRow.distributed);

    return circulating;
  }

  fetchMaxSupply() {
    return 100000000000;
  }

  async getSupply() {
    const total = await this.fetchTotalSupply();
    const circulating = await this.fetchCirculatingSupply();
    const max = await this.fetchMaxSupply();

    return new Supply({
      total,
      circulating,
      max,
    });
  }
}

module.exports = Ripple;
