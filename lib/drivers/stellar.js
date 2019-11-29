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

  async _fetchNativeTotalSupply() {
    const { _embedded: data } = await this.request('https://horizon.stellar.org/ledgers?limit=1&order=desc');
    const [ledger] = data.records;

    return Number(ledger.total_coins);
  }

  async _fetchAssetTotalSupply(reference) {
    const [code, issuer] = reference.split('-');

    const { _embedded: data } = await this.request(`https://horizon.stellar.org/assets/?asset_code=${code}&asset_issuer=${issuer}`);
    const [asset] = data.records;

    return Number(asset.amount);
  }

  async _fetchNativeBalance(modifier) {
    const { balances } = await this.request(`https://horizon.stellar.org/accounts/${modifier}`);
    const { balance } = balances.find((item) => (item.asset_type === 'native'));

    return Number(balance);
  }

  async _fetchAssetBalance(reference, modifier) {
    const [code, issuer] = reference.split('-');

    const { balances } = await this.request(`https://horizon.stellar.org/accounts/${modifier}`);
    const { balance } = balances.find((item) => (item.asset_code === code
      && item.asset_issuer === issuer));

    return Number(balance);
  }

  async getSupply(reference, modifiers) {
    let total;
    if (reference === 'native') {
      total = await this._fetchNativeTotalSupply();
    } else {
      total = await this._fetchAssetTotalSupply(reference);
    }

    const modifiersWithBalances = await promisesMap(
      modifiers,
      async (modifier) => {
        if (reference === 'native') {
          const balance = await this._fetchNativeBalance(modifier);
          return {
            reference: modifier,
            balance,
          };
        }
        const balance = await this._fetchAssetBalance(reference, modifier);
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
