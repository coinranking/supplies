const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

class ZchainExplorer extends Driver {
  constructor(options) {
    super({
      blockchain: 'Zcash',
      timeout: 200, // 5 requests per second
      supports: {
        balance: true,
      },
      options,
    });
  }

  async fetchTotalSupply() {
    const { totalAmount } = await this.request(
      'https://api.zcha.in/v2/mainnet/network',
    );
    return totalAmount;
  }

  async fetchBalance(modifier) {
    const { balance } = await this.request(
      `https://api.zcha.in/v2/mainnet/accounts/${modifier}`,
    );
    return balance;
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

module.exports = ZchainExplorer;
