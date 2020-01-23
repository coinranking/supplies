const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

class Blockmeta extends Driver {
  constructor(options) {
    super({
      blockchain: 'Bytom',
      supports: {
        circulating: true,
        balances: true,
      },
      options,
    });
  }

  async fetchTotalSupply() {
    const total = await this.request(
      'https://blockmeta.com/api/v3/asset-totalcoins/ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    ); // BTC coin

    return Number(total);
  }

  async fetchCirculatingSupply() {
    const { circulating_supply: circulating } = await this.request(
      'https://blockmeta.com/api/v2/stat/total',
    );

    return Number(circulating) / 10 ** 8;
  }

  async fetchBalance(modifier) {
    const data = await this.request(
      `https://blockmeta.com/api/v3/address/${modifier}/asset`,
    );
    const record = data.find(
      (item) => item.asset_name === 'BTM'
        || item.asset_id
          === 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    );

    return record ? Number(record.balance) / 10 ** 8 : 0;
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

module.exports = Blockmeta;
