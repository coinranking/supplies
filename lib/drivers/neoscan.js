const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

/**
 * NeoScan driver.
 *
 * @memberof Driver
 * @augments Driver
 */
class NeoScan extends Driver {
  constructor(options) {
    super({
      blockchain: 'Neo',
      timeout: 100, // 10 requests per second
      supports: {
        balances: true,
        assets: true,
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const options = {
      url: 'https://seed1.cityofzion.io',
      method: 'post',
      body: {
        jsonrpc: '2.0',
        method: 'getassetstate',
        params: ['c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b'],
        id: 1,
      },
    };

    const { result } = await this.request(options);

    return Number(result.amount);
  }

  /**
   * @augments Driver.fetchBalance
   * @param {modifierParam} modifier {@link modifierParam}
   * @async
   */
  async fetchBalance(modifier) {
    const data = await this.request(`https://api.neoscan.io/api/main_net/v1/get_balance/${modifier}`);
    const { amount: balance } = data.balance.find((item) => item.asset_hash === 'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b');

    return balance;
  }

  /**
   * @augments Driver.fetchAssetTotalSupply
   * @param {referenceParam} reference {@link referenceParam}
   * @async
   */
  async fetchAssetTotalSupply(reference) {
    const options = {
      url: 'https://seed1.cityofzion.io',
      method: 'post',
      body: {
        jsonrpc: '2.0',
        method: 'getassetstate',
        params: [reference],
        id: 1,
      },
    };

    const { result } = await this.request(options);

    return Number(result.amount);
  }

  /**
   * @augments Driver.fetchAssetBalance
   * @param {referenceParam} reference {@link referenceParam}
   * @param {modifierParam} modifier {@link modifierParam}
   * @async
   */
  async fetchAssetBalance(reference, modifier) {
    const data = await this.request(`https://api.neoscan.io/api/main_net/v1/get_balance/${modifier}`);
    const { amount: balance } = data.balance.find((item) => item.asset_hash === reference);

    return balance;
  }

  /**
   * @augments Driver.getSupply
   * @param {coinParam} coin {@link coinParam}
   */
  async getSupply(coin) {
    let total;
    if (typeof coin.reference === 'undefined') {
      total = await this.fetchTotalSupply();
    } else {
      total = await this.fetchAssetTotalSupply(coin.reference);
    }

    const modifiersWithBalances = await promisesMap(
      coin.modifiers,
      async (modifier) => {
        if (typeof coin.reference === 'undefined') {
          const balance = await this.fetchBalance(modifier);
          return {
            reference: modifier,
            balance,
          };
        }
        const balance = await this.fetchAssetBalance(coin.reference, modifier);
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

module.exports = NeoScan;
