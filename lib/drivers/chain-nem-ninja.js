const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

class ChainNemNinja extends Driver {
  constructor() {
    super({
      blockchains: ['Nem'],
      timeout: 100, // 10 requests per second
    });
  }

  async _fetchBalance(modifier) {
    const asset = await this.request(`http://chain.nem.ninja/api3/account?address=${modifier.reference}`);
    const balance = asset.raw.balance[0].sum / 1000000;

    return balance;
  }

  async getSupply(coin) {
    if (coin.reference !== 'native') throw new Error('Coin not supported');

    const total = coin.totalSupply;
    const modifiers = await promisesMap(
      coin.modifiers,
      (modifier) => this
        ._fetchBalance(modifier)
        .then((balance) => ({ ...modifier, balance })),
    );
    const circulating = modifiers.reduce((current, modifier) => current - modifier.balance, total);
    const max = coin.maxSupply;

    return new Supply({
      total,
      circulating,
      max,
      modifiers,
    });
  }
}

module.exports = ChainNemNinja;
