const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

class Algorand extends Driver {
  constructor(options) {
    super({
      blockchain: 'Algorand',
      supports: {
        native: true,
        balance: true,
      },
      options,
    });
  }

  async fetchTotalSupply() {
    const { circulatingSupply: supply } = await this.request(
      'https://api.algoexplorer.io/v1/status',
    );
    return Number(supply);
  }

  async fetchBalance(modifier) {
    const { balance } = await this.request(
      `https://api.algoexplorer.io/v1/account/${modifier}`,
    );
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

module.exports = Algorand;
