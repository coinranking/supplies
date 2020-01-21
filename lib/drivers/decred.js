const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

class Decred extends Driver {
  constructor(options) {
    super({
      blockchain: 'Dash',
      timeout: 200, // 5 requests per second
      supports: {},
      options: {
        ...options,
        useCache: true,
      },
    });
  }

  async fetchTotalSupply() {
    const { supply_ultimate: supply } = await this.request(
      'https://dcrdata.decred.org/api/supply',
    );
    return Number(supply);
  }

  async fetchBalance(modifier) {
    const balance = await this.request(
      `https://dcrdata.decred.org/insight/api/addr/${modifier}/balance`,
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

module.exports = Decred;
