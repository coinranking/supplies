const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

class NeoScan extends Driver {
  constructor(options) {
    super({
      blockchain: 'Neo',
      timeout: 100, // 10 requests per second
      supports: {
        balances: true,
        assets: true,
      },
      options,
    });
  }

  async fetchTotalSupply() {
    const options = {
      url: 'https://seed1.cityofzion.io',
      method: 'post',
      body: {
        jsonrpc: '2.0',
        method: 'getassetstate',
        params: ['c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b'],
        id: 1,
      },
    };

    const { result } = await this.request(options);

    return Number(result.amount);
  }

  async fetchBalance(modifier) {
    const data = await this.request(`https://api.neoscan.io/api/main_net/v1/get_balance/${modifier}`);
    const { amount: balance } = data.balance.find((item) => item.asset_hash === 'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b');

    return balance;
  }

  async fetchAssetTotalSupply(reference) {
    const options = {
      url: 'https://seed1.cityofzion.io',
      method: 'post',
      body: {
        jsonrpc: '2.0',
        method: 'getassetstate',
        params: [reference],
        id: 1,
      },
    };

    const { result } = await this.request(options);

    return Number(result.amount);
  }

  async fetchAssetBalance(reference, modifier) {
    const data = await this.request(`https://api.neoscan.io/api/main_net/v1/get_balance/${modifier}`);
    const { amount: balance } = data.balance.find((item) => item.asset_hash === reference);

    return balance;
  }

  async getSupply({ reference, modifiers }) {
    let total;
    if (typeof reference === 'undefined') {
      total = await this.fetchTotalSupply();
    } else {
      total = await this.fetchAssetTotalSupply(reference);
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
        const balance = await this.fetchAssetBalance(reference, modifier);
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

module.exports = NeoScan;
