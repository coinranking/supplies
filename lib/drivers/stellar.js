const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

class Stellar extends Driver {
  constructor() {
    super({
      blockchains: ['Stellar'],
      timeout: 1000, // 1 requests per second
    });
  }

  async fetchTotalSupply() {
    const { _embedded: data } = await this.request('https://horizon.stellar.org/ledgers?limit=1&order=desc');
    const [ledger] = data.records;

    return Number(ledger.total_coins);
  }

  async fetchBalance(modifier) {
    const { balances } = await this.request(`https://horizon.stellar.org/accounts/${modifier}`);
    const { balance } = balances.find((item) => (item.asset_type === 'native'));

    return Number(balance);
  }

  async fetchAssetTotalSupply(reference) {
    const [code, issuer] = reference.split('-');

    const { _embedded: data } = await this.request(`https://horizon.stellar.org/assets/?asset_code=${code}&asset_issuer=${issuer}`);
    const [asset] = data.records;

    return Number(asset.amount);
  }

  async fetchAssetBalance(reference, modifier) {
    const [code, issuer] = reference.split('-');

    const { balances } = await this.request(`https://horizon.stellar.org/accounts/${modifier}`);
    const { balance } = balances.find((item) => (item.asset_code === code
      && item.asset_issuer === issuer));

    return Number(balance);
  }

  async getSupply(reference, modifiers) {
    let total;
    if (reference === 'native') {
      total = await this.fetchTotalSupply();
    } else {
      total = await this.fetchAssetTotalSupply(reference);
    }

    const modifiersWithBalances = await promisesMap(
      modifiers,
      async (modifier) => {
        if (reference === 'native') {
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

module.exports = Stellar;
