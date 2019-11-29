const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

class NeoScan extends Driver {
  constructor() {
    super({
      blockchains: ['Neo'],
      timeout: 100, // 10 requests per second
    });
  }

  async _fetchTotalSupply(reference) {
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

  async _fetchBalance(reference, modifier) {
    const data = await this.request(`https://api.neoscan.io/api/main_net/v1/get_balance/${modifier}`);
    const { amount: balance } = data.balance.find((item) => item.asset_hash === reference);

    return balance;
  }

  async getSupply(reference, modifiers) {
    const total = await this._fetchTotalSupply(reference);
    const modifiersWithBalances = await promisesMap(
      modifiers,
      (modifier) => this
        ._fetchBalance(reference, modifier)
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

module.exports = NeoScan;
