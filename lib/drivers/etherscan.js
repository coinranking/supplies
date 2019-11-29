const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

class Etherscan extends Driver {
  constructor(options) {
    super({
      blockchains: ['Ethereum'],
      timeout: 200, // 5 requests per second
    });

    if (!options || !options.secret) {
      throw new Error('API key is required');
    }

    this.secret = options.secret;
  }

  async _fetchTotalSupply(reference, decimals) {
    let url;
    if (reference === 'native') {
      url = `https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=${this.secret}`;
    } else {
      url = `https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=${reference}&apikey=${this.secret}`;
    }

    const { result: total } = await this.request(url);

    return total / (10 ** (decimals || 18));
  }

  async _fetchBalance(reference, modifier, decimals) {
    let url;
    if (reference === 'native') {
      url = `https://api.etherscan.io/api?module=account&action=balance&address=${modifier}&tag=latest&apikey=${this.secret}`;
    } else {
      url = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${reference}&address=${modifier}&tag=latest&apikey=${this.secret}`;
    }

    const { result: balance } = await this.request(url);

    return balance / (10 ** (decimals || 18));
  }

  async getSupply(reference, modifiers, decimals) {
    const total = await this._fetchTotalSupply(reference, decimals);
    const modifiersWithBalances = await promisesMap(
      modifiers,
      (modifier) => this
        ._fetchBalance(reference, modifier, decimals)
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

module.exports = Etherscan;
