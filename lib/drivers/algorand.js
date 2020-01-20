const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

class Algorand extends Driver {
  constructor(options) {
    super({
      blockchain: 'Algorand',
      supports: {
        circulating: true,
        balance: true,
      },
      options: {
        ...options,
        useCache: true,
      },
    });
  }

  async fetchTotalSupply() {
    const { totalStake, offlineStake, onlineStake } = await this.request(
      'https://api.algoexplorer.io/v1/status',
    );
    return (Number(totalStake) + Number(offlineStake) + Number(onlineStake));
  }

  async fetchCirculatingSupply() {
    const { circulatingSupply } = await this.request(
      'https://api.algoexplorer.io/v1/status',
    );

    return Number(circulatingSupply);
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

    let circulating;
    if (modifiers.length > 0) {
      circulating = modifiersWithBalances.reduce(
        (current, modifier) => current - modifier.balance,
        total,
      );
    } else {
      circulating = await this.fetchCirculatingSupply();
    }

    return new Supply({
      total,
      circulating,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = Algorand;
