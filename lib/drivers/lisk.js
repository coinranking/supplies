const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

class Lisk extends Driver {
  constructor() {
    super({
      blockchains: ['Lisk'],
      supports: {
        balances: true,
      },
    });
  }

  async fetchTotalSupply() {
    const { data } = await this.request('https://node01.lisk.io/api/node/constants');

    return Number(data.supply) / (10 ** 8);
  }

  async fetchBalance(modifier) {
    const { data } = await this.request(`https://node01.lisk.io/api/accounts?address=${modifier}`);
    const [account] = data;
    const { balance } = account;

    return Number(balance) / (10 ** 8);
  }

  async getSupply(modifiers) {
    const total = await this.fetchTotalSupply();
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
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = Lisk;
