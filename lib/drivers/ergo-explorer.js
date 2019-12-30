const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

class ErgoExplorer extends Driver {
  constructor(options) {
    super({
      blockchain: 'ErgoExplorer',
      timeout: 100, // 10 requiest per second
      supports: {
        balaces: true,
      },
    }, options);
  }

  async fetchTotalSupply() {
    const { supply } = await this.request('https://api.ergoplatform.com/info');

    return Number(supply) / (10 ** 9);
  }

  async fetchBalance(modifier) {
    const { transactions: { totalBalance } } = await this.request(`https://api.ergoplatform.com/addresses/${modifier}`);
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

    return new Supply({
      total,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = ErgoExplorer;
