const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

class BiblePay extends Driver {
  constructor(options) {
    super({
      blockchain: 'BiblePay',
      timeout: 200, // 5 requests per second
      supports: {
        balance: true,
      },
      options,
    });
  }

  async fetchTotalSupply() {
    const total = await this.request({
      url: 'http://explorer.biblepay.org/ext/getmoneysupply',
      accept: 'text/html',
    });
    return Number(total);
  }

  async fetchBalance(modifier) {
    const balance = await this.request({
      url: `http://explorer.biblepay.org/ext/getbalance/${modifier}`,
      accept: 'text/html',
    });

    return Number(balance);
  }

  async getSupply({ modifiers }) {
    const total = await this.fetchTotalSupply();

    const modifiersWithBalances = await promisesMap(
      modifiers,
      async (modifier) => {
        const balance = await this.fetchBalance(modifier);
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

module.exports = BiblePay;
