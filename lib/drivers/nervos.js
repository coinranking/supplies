const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

class Nervos extends Driver {
  constructor(options) {
    super({
      blockchain: 'Nervos',
      timeout: 100, // 10 requests per second
      supports: {
        native: true,
        balances: true,
        circulating: true,
      },
      options,
    });
  }

  async fetchTotalSupply() {
    const supply = await this.request(
      'https://api.explorer.nervos.org/api/v1/market_data/total_supply',
    );
    return Number(supply);
  }

  async fetchCirculatingSupply() {
    const circulating = await this.request(
      'https://api.explorer.nervos.org/api/v1/market_data/circulating_supply',
    );
    return Number(circulating);
  }

  async fetchBalance(modifier) {
    const { data } = await this.request(
      `https://api.explorer.nervos.org/api/v1/addresses/${modifier}`,
    );
    return Number(data.attributes.balance);
  }

  async getSupply({ modifiers }) {
    const total = await this.fetchTotalSupply();
    const circulating = await this.fetchCirculatingSupply();

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
      circulating,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = Nervos;
