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

  async _fetchTotalSupply(reference, decimals) {
    let url;
    if (reference === 'native') {
      url = 'https://blockscout.com/etc/mainnet/api?module=stats&action=ethsupply';
    } else {
      url = `https://blockscout.com/etc/mainnet/api?module=stats&action=tokensupply&contractaddress=${reference}`;
    }

    const { result: total } = await this.request(url);

    if (total === null) throw new Error('Total supply is null');

    return total / (10 ** (decimals || 18));
  }

  async _fetchBalance(reference, modifier, decimals) {
    let url;
    if (reference === 'native') {
      url = `https://blockscout.com/etc/mainnet/api?module=account&action=balance&address=${modifier}`;
    } else {
      url = `https://blockscout.com/etc/mainnet/api?module=account&action=tokenbalance&contractaddress=${reference}&address=${modifier}`;
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

module.exports = BlockScout;
