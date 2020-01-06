const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

class BlockchairBitcoinSV extends Driver {
  constructor(options) {
    super({
      blockchain: 'Bitcoin SV',
      timeout: 200, // 5 requests per second
      supports: {
        balances: true,
      },
      options,
    });
  }

  async fetchTotalSupply() {
    const { data } = await this.request('https://api.blockchair.com/bitcoin/stats');
    return data.circulation;
  }

  async fetchBalance(modifier) {
    const { data } = await this.request(`https://api.blockchair.com/bitcoin/dashboards/address/${modifier}`);
    return data[modifier].address.balance;
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

module.exports = BlockchairBitcoinSV;
