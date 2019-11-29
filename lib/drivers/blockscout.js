const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

class BlockScout extends Driver {
  constructor() {
    super({
      blockchains: ['Ethereum Classic'],
      timeout: 200, // 5 requests per second
    });
  }

  async _fetchTotalSupply(coin) {
    let url;
    if (coin.reference === 'native') {
      url = 'https://blockscout.com/etc/mainnet/api?module=stats&action=ethsupply';
    } else {
      url = `https://blockscout.com/etc/mainnet/api?module=stats&action=tokensupply&contractaddress=${coin.reference}`;
    }

    const decimals = coin.decimals === null ? 18 : coin.decimals;
    const { result: total } = await this.request(url);

    return total / (10 ** decimals);
  }

  async _fetchBalance(coin, modifier) {
    let url;
    if (coin.reference === 'native') {
      url = `https://blockscout.com/etc/mainnet/api?module=account&action=balance&address=${modifier.reference}`;
    } else {
      url = `https://blockscout.com/etc/mainnet/api?module=account&action=tokenbalance&contractaddress=${coin.reference}&address=${modifier.reference}`;
    }

    const decimals = coin.decimals === null ? 18 : coin.decimals;
    const { result: balance } = await this.request(url);

    return balance / (10 ** decimals);
  }

  async getSupply(coin) {
    const total = await this._fetchTotalSupply(coin);
    const modifiers = await promisesMap(
      coin.modifiers,
      (modifier) => this
        ._fetchBalance(coin, modifier)
        .then((balance) => ({ ...modifier, balance })),
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
