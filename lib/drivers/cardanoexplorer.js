const Driver = require('../models/driver');
const Supply = require('../models/supply');
const request = require('../request');
const { promisesMap } = require('../utils');

class CardanoExplorer extends Driver {
  constructor(secret) {
    super({
      blockchains: ['cardano'],
      timeout: 200, // 5 requests per second
    });

    this.secret = secret;
  }

  async _fetchTotalSupply() {
    await this.throttle.push();

    const asset = await request('https://cardanoexplorer.com/api/genesis/summary/');
    const redeemed = parseInt(asset.Right.cgsRedeemedAmountTotal.getCoin, 10);
    const unredeemed = parseInt(asset.Right.cgsNonRedeemedAmountTotal.getCoin, 10);

    return (redeemed + unredeemed) / 1000000;
  }

  async _fetchBalance(modifier) {
    await this.throttle.push();

    const asset = await request(`https://cardanoexplorer.com/api/addresses/summary/${modifier.reference}`);
    const balance = asset.Right.caBalance.getCoin / 1000000;

    return balance;
  }

  async getSupply(coin) {
    if (coin.symbol !== 'ADA') throw new Error('Coin not supported');

    const total = await this._fetchTotalSupply();
    const modifiers = await promisesMap(
      coin.modifiers,
      modifier => this._fetchBalance(modifier).then(balance => ({ ...modifier, balance })),
    );
    const circulating = modifiers.reduce((current, modifier) => current - modifier.balance, total);

    return new Supply({
      total,
      circulating,
      modifiers,
    });
  }
}

module.exports = CardanoExplorer;
