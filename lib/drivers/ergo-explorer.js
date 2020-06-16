const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

class ErgoExplorer extends Driver {
  constructor(options) {
    super(
      {
        blockchain: 'Ergo',
        timeout: 100, // 10 requiest per second
        supports: {
          balances: true,
        },
      },
      options,
    );
  }

  async fetchTotalSupply() {
    const supply = await this.request('https://api.ergoplatform.com/api/v0/info/supply');

    return Number(supply);
  }

  async fetchBalance(modifier) {
    const {
      transactions: { totalBalance },
    } = await this.request(
      `https://api.ergoplatform.com/addresses/${modifier}`,
    );
    return Number(totalBalance);
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

    const circulating = modifiersWithBalances.reduce(
      (current, modifier) => current - modifier.balance,
      total,
    );

    return new Supply({
      total,
      circulating,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = ErgoExplorer;
