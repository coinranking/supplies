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
      },
      options,
    });
  }

  async fetchTotalSupply() {
    const total = await this.request('https://api.tzstats.com/tables/supply?time.gte=today&limit=1');
    const record = total[0][4];
    return Number(record);
  }

  async fetchBalance(modifier) {
    const { total_balance: totalBalance } = await this.request(`https://api.tzstats.com/explorer/account/${modifier}`);

    return Number(totalBalance);
  }


  async getSupply({ modifiers }) {
    const total = await this.fetchTotalSupply();

    const modifiersWithBalances = await promisesMap(
      modifiers,
      (modifier) => this
        .fetchBalance(modifier)
        .then((balance) => ({ reference: modifier, balance })),
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

module.exports = TzStats;
