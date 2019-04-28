const Driver = require('../models/driver');
const Supply = require('../models/supply');
const request = require('../request');
const { promisesMap } = require('../utils');

class ChainNemNinja extends Driver {
  constructor(secret) {
    super({
      blockchains: ['nem'],
      timeout: 100, // 10 requests per second
    });

    this.secret = secret;
  }

  async _fetchBalance(modifier) {
    await this.throttle.push();

    const asset = await request(`http://chain.nem.ninja/api3/account?address=${modifier.reference}`);
    const balance = asset.raw.balance[0].sum / 1000000;

    return balance;
  }

  async getSupply(coin) {
    if (coin.reference !== 'native') throw new Error('Coin not supported');

    const total = coin.totalSupply;
    const modifiers = await promisesMap(
      coin.modifiers,
      modifier => this._fetchBalance(modifier).then(balance => ({ ...modifier, balance })),
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
