const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

class Lisk extends Driver {
  constructor() {
    super({
      blockchains: ['Lisk'],
    });
  }

  async _fetchTotalSupply(coin) {
    const decimals = coin.decimals === null ? 8 : coin.decimals;
    const { data } = await this.request('https://node01.lisk.io/api/node/constants');

    return Number(data.supply) / (10 ** decimals);
  }

  async _fetchBalance(coin, modifier) {
    const decimals = coin.decimals === null ? 8 : coin.decimals;
    const { data } = await this.request(`https://node01.lisk.io/api/accounts?address=${modifier.reference}`);
    const [account] = data;
    const { balance } = account;

    return Number(balance) / (10 ** decimals);
  }

  async getSupply(coin) {
    if (coin.reference !== 'native') throw new Error('Coin not supported');

    const total = await this._fetchTotalSupply(coin);
    const modifiers = await promisesMap(
      coin.modifiers,
      (modifier) => this
        ._fetchBalance(coin, modifier)
        .then((balance) => ({ ...modifier, balance })),
    );
    const circulating = modifiers.reduce((current, modifier) => current - modifier.balance, total);

    return new Supply({
      total,
      circulating,
      modifiers,
    });
  }
}

module.exports = Lisk;
