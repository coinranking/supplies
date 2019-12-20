const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

class OmniExplorer extends Driver {
  constructor(options) {
    super({
      blockchain: 'Omnilayer',
      timeout: 100, // 10 requests per second
      supports: {
        balances: true,
        assets: true,
      },
      options,
    });
  }

  async fetchTotalSupply() {
    const options = {
      url: 'https://api.omniexplorer.info/v1/properties/listbyecosystem',
      method: 'post',
      form: {
        ecosystem: 1,
      },
    };

    const { properties } = await this.request(options);
    const property = properties.find(
      (item) => (Number(item.propertyid) === 1),
    );

    return Number(property.totaltokens);
  }

  async fetchBalance(modifier) {
    const options = {
      url: 'https://api.omniexplorer.info/v1/address/addr/',
      method: 'post',
      form: {
        addr: modifier,
      },
    };

    const { balance: balances } = await this.request(options);
    const balance = balances.find((item) => (Number(item.id) === 1));

    if (!balance) return 0;

    return Number(balance.value) / 100000000;
  }

  async fetchAssetTotalSupply(reference) {
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

  async fetchAssetBalance(reference, modifier) {
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

  async getSupply({ reference, modifiers }) {
    let total;
    if (typeof reference === 'undefined') {
      total = await this.fetchTotalSupply();
    } else {
      total = await this.fetchAssetTotalSupply(reference);
    }

    const modifiersWithBalances = await promisesMap(
      modifiers,
      async (modifier) => {
        if (typeof reference === 'undefined') {
          const balance = await this.fetchBalance(modifier);
          return {
            reference: modifier,
            balance,
          };
        }
        const balance = await this.fetchAssetBalance(reference, modifier);
        return {
          reference: modifier,
          balance,
        };
      },
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
