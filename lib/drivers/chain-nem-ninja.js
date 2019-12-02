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

  async fetchBalance(modifier) {
    const asset = await this.request(`http://chain.nem.ninja/api3/account?address=${modifier}`);
    const balance = asset.raw.balance[0].sum / 1000000;

    return balance;
  }

  async getSupply(modifiers) {
    const total = 8999999999;
    const max = 8999999999;
    const modifiersWithBalances = await promisesMap(
      modifiers,
      (modifier) => this
        .fetchBalance(modifier)
        .then((balance) => ({ reference: modifier, balance })),
    );
    const circulating = modifiersWithBalances
      .reduce((current, modifier) => current - modifier.balance, total);

    return new Supply({
      total,
      circulating,
      max,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = ChainNemNinja;
