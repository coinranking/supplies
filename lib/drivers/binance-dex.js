const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

class BinanceDex extends Driver {
  constructor(options) {
    super({
      blockchain: 'Binance',
      timeout: 200, // 5 requests per second
      supports: {
        balance: true,
        tokens: true,
      },
      options,
    });
  }

  async fetchTotalSupply() {
    const data = await this.request('https://dex.binance.org/api/v1/tokens');

    return data.reduce(
      (current, item) => current + Number(item.total_supply),
      0,
    );
  }

  async fetchTokenTotalSupply(reference) {
    const data = await this.request('https://dex.binance.org/api/v1/tokens');

    const record = data.find((item) => item.symbol === reference);
    return record ? Number(record.total_supply) : 0;
  }

  async fetchBalance(modifier) {
    const { balances } = await this.request(
      `https://dex.binance.org/api/v1/account/${modifier}`,
    );

    return balances.reduce(
      (current, item) => current + Number(item.free) + Number(item.frozen) + Number(item.locked),
      0,
    );
  }

  async fetchTokenBalance(reference, modifier) {
    const { balances } = await this.request(
      `https://dex.binance.org/api/v1/account/${modifier}`,
    );

    const record = balances.find((item) => item.symbol === reference);

    return record
      ? Number(record.free)
          + Number(record.frozen)
          + Number(record.locked)
      : 0;
  }

  async getSupply({ reference, modifiers }) {
    let total;
    if (typeof reference === 'undefined') {
      total = await this.fetchTotalSupply();
    } else {
      total = await this.fetchTokenTotalSupply(reference);
    }

    const modifiersWithBalances = await promisesMap(
      modifiers,
      async (modifier) => {
        if (typeof reference === 'undefined') {
          const balance = await this.fetchBalance(modifier);
          return {
            reference: modifier,
            balance,
          };
        }

        const balance = await this.fetchTokenBalance(reference, modifier);
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

module.exports = BinanceDex;
