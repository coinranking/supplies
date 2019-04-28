const Driver = require('../models/driver');
const Supply = require('../models/supply');
const request = require('../request');

class BlockchainInfo extends Driver {
  constructor() {
    super({
      blockchains: ['bitcoin'],
    });
  }

  async _fetchTotalSupply() {
    const total = await request('https://blockchain.info/q/totalbc');
    return Number(total / 100000000);
  }

  async getSupply(coin) {
    if (coin.symbol !== 'BTC') throw new Error('Coin not supported');

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

module.exports = BlockchainInfo;
