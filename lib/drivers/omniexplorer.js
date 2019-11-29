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

  async _fetchTotalSupply(coin) {
    const options = {
      url: 'https://api.omniexplorer.info/v1/properties/listbyecosystem',
      method: 'post',
      form: {
        ecosystem: 1,
      },
    };

    const { properties } = await this.request(options);
    const property = properties.find(
      (item) => (Number(item.propertyid) === Number(coin.reference)),
    );

    return Number(property.totaltokens);
  }

  async _fetchBalance(coin, modifier) {
    const options = {
      url: 'https://api.omniexplorer.info/v1/address/addr/',
      method: 'post',
      form: {
        addr: modifier.reference,
      },
    };

    const { balance: balances } = await this.request(options);
    const balance = balances.find((item) => (Number(item.id) === Number(coin.reference)));

    if (!balance) return 0;

    return Number(balance.value) / 100000000;
  }

  async getSupply(coin) {
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

module.exports = OmniExplorer;
