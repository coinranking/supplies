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

  async fetchTotalSupply() {
    const { result: total } = await this.request('https://blockscout.com/etc/mainnet/api?module=stats&action=ethsupply');

    if (total === null) throw new Error('Total supply is null');

    return total / (10 ** 18);
  }

  async fetchBalance(reference, modifier, decimals) {
    const { result: balance } = await this.request(`https://blockscout.com/etc/mainnet/api?module=account&action=tokenbalance&contractaddress=${reference}&address=${modifier}`);

    return balance / (10 ** (decimals || 18));
  }

  async fetchAssetTotalSupply(reference, decimals) {
    const { result: total } = await this.request(`https://blockscout.com/etc/mainnet/api?module=stats&action=tokensupply&contractaddress=${reference}`);

    if (total === null) throw new Error('Total supply is null');

    return total / (10 ** (decimals || 18));
  }

  async fetchAssetBalance(reference, modifier, decimals) {
    const { result: balance } = await this.request(`https://blockscout.com/etc/mainnet/api?module=account&action=tokenbalance&contractaddress=${reference}&address=${modifier}`);

    return balance / (10 ** (decimals || 18));
  }

  async getSupply(reference, modifiers, decimals) {
    let total;
    if (reference === 'native') {
      total = await this.fetchTotalSupply();
    } else {
      total = await this.fetchAssetTotalSupply(reference, decimals);
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
        const balance = await this.fetchAssetBalance(reference, modifier, decimals);
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

module.exports = BlockScout;
