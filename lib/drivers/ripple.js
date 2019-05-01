const Driver = require('../models/driver');
const Supply = require('../models/supply');
const request = require('../request');

class Ripple extends Driver {
  constructor() {
    super({
      blockchains: ['xrp'],
    });
  }

  async _fetchSupply() {
    const { rows } = await request('https://data.ripple.com/v2/network/xrp_distribution');
    const latestRow = rows.pop();
    const total = Number(latestRow.total);
    const circulating = Number(latestRow.distributed);

    return { total, circulating };
  }

  async getSupply(coin) {
    if (coin.reference !== 'native') throw new Error('Coin not supported');

    const { total, circulating } = await this._fetchSupply();
    const max = coin.maxSupply;

    return new Supply({
      total,
      circulating,
      max,
    });
  }
}

module.exports = Ripple;
