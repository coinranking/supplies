const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

class Etherscan extends Driver {
  constructor(options) {
    super({
      blockchain: 'Ethereum',
      timeout: 200, // 5 requests per second
      supports: {
        balances: true,
        assets: true,
        decimals: true, // Should this be required?
        secret: true, // Should this be required?
      },
      options,
    });
  }

  get secret() {
    if (!this._secret) {
      throw new Error('API key is required');
    }
    return this._secret;
  }

  set secret(secret) {
    this._secret = secret;
  }

  async fetchTotalSupply() {
    const { result: total } = await this.request(`https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=${this.secret}`);

    if (total === null) throw new Error('Total supply is null');

    return total / (10 ** 18);
  }

  async fetchBalance(modifier) {
    const { result: balance } = await this.request(`https://api.etherscan.io/api?module=account&action=balance&address=${modifier}&tag=latest&apikey=${this.secret}`);

    return balance / (10 ** 18);
  }

  async fetchAssetTotalSupply(reference, decimals) {
    const { result: total } = await this.request(`https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=${reference}&apikey=${this.secret}`);

    return total / (10 ** (decimals || 18));
  }

  async fetchAssetBalance(reference, modifier, decimals) {
    const { result: balance } = await this.request(`https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${reference}&address=${modifier}&tag=latest&apikey=${this.secret}`);

    return balance / (10 ** (decimals || 18));
  }

  async getSupply({ reference, modifiers, decimals }) {
    let total;
    if (typeof reference === 'undefined') {
      total = await this.fetchTotalSupply();
    } else {
      total = await this.fetchAssetTotalSupply(reference, decimals);
    }

    const modifiersWithBalances = await promisesMap(
      modifiers,
      async (modifier) => {
        if (typeof reference === 'undefined') {
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

module.exports = Etherscan;
