const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

class Qtum extends Driver {
  constructor(options) {
    super({
      blockchain: 'Qtum',
      timeout: 200, // 5 requests per second
      supports: {
        native: true,
        circulating: true,
        balances: true,
        max: true,
        tokens: true,
      },
      options: {
        ...options,
        useCache: true,
      },
    });
  }

  async fetchTotalSupply() {
    const supply = await this.request('https://qtum.info/api/supply');
    return Number(supply);
  }

  async fetchCirculatingSupply() {
    const circulating = await this.request(
      'https://qtum.info/api/circulating-supply',
    );
    return Number(circulating);
  }

  async fetchTotalMaxSupply() {
    const max = await this.request('https://qtum.info/api/total-max-supply');
    return Number(max);
  }

  async fetchBalance(modifier) {
    const { balance } = await this.request(
      `https://qtum.info/api/address/${modifier}`,
    );
    return Number(balance);
  }

  async fetchTokenBalance(reference, modifier) {
    const { qrc20Balances } = await this.request(
      `https://qtum.info/api/address/${modifier}`,
    );
    const record = qrc20Balances.find(
      (item) => item.symbol.toLowerCase() === reference.toLowerCase(),
    );
    return record ? (Number(record.balance) / (10 ** (record.decimals))) : 0;
  }

  async getSupply({ modifiers, reference }) {
    const total = await this.fetchTotalSupply();
    const max = await this.fetchTotalMaxSupply();

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
        const balance = await this.fetchTokenBalance(reference, modifier);
        return {
          reference: modifier,
          balance,
        };
      },
    );

    let circulating;
    if (modifiers.length > 0) {
      circulating = modifiersWithBalances.reduce(
        (current, modifier) => current - modifier.balance,
        total,
      );
    } else {
      circulating = await this.fetchCirculatingSupply();
    }

    return new Supply({
      total,
      circulating,
      max,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = Qtum;
