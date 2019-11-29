const Driver = require('../models/driver');
const Supply = require('../models/supply');

class LitecoinNet extends Driver {
  constructor() {
    super({
      blockchains: ['Litecoin'],
    });
  }

  async _fetchTotalSupply() {
    const total = await this.request('http://explorer.litecoin.net/chain/Litecoin/q/totalbc');
    return Number(total);
  }

  async getSupply(coin) {
    if (coin.reference !== 'native') throw new Error('Coin not supported');

    const total = await this._fetchTotalSupply();
    const circulating = total;

    return new Supply({
      total,
      circulating,
    });
  }
}

module.exports = LitecoinNet;
