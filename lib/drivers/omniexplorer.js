const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

class OmniExplorer extends Driver {
  constructor() {
    super({
      blockchains: ['Omnilayer'],
      timeout: 100, // 10 requests per second
    });
  }

  async fetchTotalSupply(reference) {
    const options = {
      url: 'https://api.omniexplorer.info/v1/properties/listbyecosystem',
      method: 'post',
      form: {
        ecosystem: 1,
      },
    };

    const { properties } = await this.request(options);
    const property = properties.find(
      (item) => (Number(item.propertyid) === Number(reference)),
    );

    return Number(property.totaltokens);
  }

  async fetchBalance(reference, modifier) {
    const options = {
      url: 'https://api.omniexplorer.info/v1/address/addr/',
      method: 'post',
      form: {
        addr: modifier,
      },
    };

    const { balance: balances } = await this.request(options);
    const balance = balances.find((item) => (Number(item.id) === Number(reference)));

    if (!balance) return 0;

    return Number(balance.value) / 100000000;
  }

  async getSupply(reference, modifiers) {
    const total = await this.fetchTotalSupply(reference);
    const modifiersWithBalances = await promisesMap(
      modifiers,
      (modifier) => this
        .fetchBalance(reference, modifier)
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

module.exports = OmniExplorer;
