const Driver = require('../models/driver');
const Supply = require('../models/supply');
const request = require('../request');
const { promisesMap } = require('../utils');

class BlockScout extends Driver {
  constructor({ secret }) {
    super({
      blockchains: ['ethereum-classic'],
      timeout: 200, // 5 requests per second
    });

    this.secret = secret;
  }

  async _fetchTotalSupply(coin) {
    await this.throttle.push();

    let url;
    if (coin.reference === 'native') {
      url = 'https://blockscout.com/etc/mainnet/api?module=stats&action=ethsupply';
    } else {
      url = `https://blockscout.com/etc/mainnet/api?module=stats&action=tokensupply&contractaddress=${coin.reference}`;
    }

    const decimals = coin.decimals === null ? 18 : coin.decimals;
    const { result: total } = await request(url);

    return total / (10 ** decimals);
  }

  async _fetchBalance(coin, modifier) {
    await this.throttle.push();

    let url;
    if (coin.reference === 'native') {
      url = `https://blockscout.com/etc/mainnet/api?module=account&action=balance&address=${modifier.reference}`;
    } else {
      url = `https://blockscout.com/etc/mainnet/api?module=account&action=tokenbalance&contractaddress=${coin.reference}&address=${modifier.reference}`;
    }

    const decimals = coin.decimals === null ? 18 : coin.decimals;
    const { result: balance } = await request(url);

    return balance / (10 ** decimals);
  }

  async getSupply(coin) {
    const total = await this._fetchTotalSupply(coin);
    const modifiers = await promisesMap(
      coin.modifiers,
      modifier => this._fetchBalance(coin, modifier).then(balance => ({ ...modifier, balance })),
    );
    const circulating = modifiers.reduce((current, modifier) => current - modifier.balance, total);

    return new Supply({
      total,
      circulating,
      modifiers,
    });
  }
}

module.exports = BlockScout;
