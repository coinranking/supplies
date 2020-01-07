const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

class TzStats extends Driver {
  constructor(options) {
    super({
      blockchain: 'Tezos',
      timeout: 100, // 10 requests per second
      supports: {
        balance: true,
        circulating: true,
      },
      options: {
        ...options,
        useCache: true,
      },
    });
  }

  async fetchTotalSupply() {
    const total = await this.request('https://api.tzstats.com/tables/supply?time.gte=today&limit=1');
    return Number(total[0][4]);
  }

  async fetchCurculatingSupply() {
    const circulating = await this.request('https://api.tzstats.com/tables/supply?time.gte=today&limit=1');
    return Number(circulating[0][9]);
  }

  async fetchBalance(modifier) {
    const { total_balance: totalBalance } = await this.request(`https://api.tzstats.com/explorer/account/${modifier}`);

    return Number(totalBalance);
  }

  async getSupply({ modifiers }) {
    const total = await this.fetchTotalSupply();
    const circulating = await this.fetchCurculatingSupply();

    const modifiersWithBalances = await promisesMap(
      modifiers,
      (modifier) => this
        .fetchBalance(modifier)
        .then((balance) => ({ reference: modifier, balance })),
    );

    return new Supply({
      total,
      circulating,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = TzStats;
