const Driver = require('../models/driver');
const Supply = require('../models/supply');
const request = require('../request');
const { promisesMap } = require('../utils');

class Stellar extends Driver {
  constructor() {
    super({
      blockchains: ['stellar'],
      timeout: 1000, // 1 requests per second
    });
  }

  async _fetchNativeTotalSupply() {
    await this.throttle.push();

    const { _embedded: data } = await request('https://horizon.stellar.org/ledgers?limit=1&order=desc');
    const [ledger] = data.records;

    return Number(ledger.total_coins);
  }

  async _fetchAssetTotalSupply(coin) {
    await this.throttle.push();

    const [code, issuer] = coin.reference.split('-');

    const { _embedded: data } = await request(`https://horizon.stellar.org/assets/?asset_code=${code}&asset_issuer=${issuer}`);
    const [asset] = data.records;

    return Number(asset.amount);
  }

  async _fetchNativeBalance(modifier) {
    await this.throttle.push();

    const { balances } = await request(`https://horizon.stellar.org/accounts/${modifier.reference}`);
    const { balance } = balances.find(item => (item.asset_type === 'native'));

    return Number(balance);
  }

  async _fetchAssetBalance(coin, modifier) {
    await this.throttle.push();

    const [code, issuer] = coin.reference.split('-');

    const { balances } = await request(`https://horizon.stellar.org/accounts/${modifier.reference}`);
    const { balance } = balances.find(item => (item.asset_code === code
      && item.asset_issuer === issuer));

    return Number(balance);
  }

  async getSupply(coin) {
    let total;
    if (coin.reference === 'native') {
      total = await this._fetchNativeTotalSupply();
    } else {
      total = await this._fetchAssetTotalSupply(coin);
    }

    const modifiers = await promisesMap(
      coin.modifiers,
      async (modifier) => {
        if (coin.reference === 'native') {
          const balance = await this._fetchNativeBalance(modifier);
          return {
            ...modifier,
            balance,
          };
        }
        const balance = await this._fetchAssetBalance(coin, modifier);
        return {
          ...modifier,
          balance,
        };
      },
    );
    const circulating = modifiers.reduce((current, modifier) => current - modifier.balance, total);
    const max = coin.maxSupply;

    return new Supply({
      total,
      circulating,
      max,
      modifiers,
    });
  }
}

module.exports = Stellar;
