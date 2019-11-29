const Driver = require('../models/driver');
const Supply = require('../models/supply');

class DogeChain extends Driver {
  constructor() {
    super({
      blockchains: ['Dogecoin'],
    });
  }

  async _fetchTotalSupply() {
    const total = await this.request('https://dogechain.info/chain/Dogecoin/q/totalbc');
    return Number(total);
  }

  async getSupply(coin) {
    if (coin.reference !== 'native') throw new Error('Coin not supported');

    const total = await this._fetchTotalSupply();
    const circulating = total;
    const max = coin.maxSupply;

    return new Supply({
      total,
      circulating,
      max,
    });
  }
}

module.exports = DogeChain;
