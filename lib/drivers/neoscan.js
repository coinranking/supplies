const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');
const SupplyModifier = require('../models/supply-modifier');
const { promisesMap } = require('../util');

/**
 * NeoScan driver. Supports total supply and
 * balance for native token and smart contracts
 * on own blockchain Neo.
 *
 * @memberof Driver
 * @augments Driver
 */
class NeoScan extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        balances: true,
        tokens: true,
        blockchains: ['Neo'],
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
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchBalance(modifier) {
    const data = await this.request(`https://api.neoscan.io/api/main_net/v1/get_balance/${modifier}`);
    const { amount: balance } = data.balance.find((item) => item.asset_hash === 'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b');

    return balance;
  }

  /**
   * @augments Driver.fetchTokenTotalSupply
   * @param {string} reference The unique identifier of a coin. Usually a smart contract address.
   * @async
   */
  async fetchTokenTotalSupply(reference) {
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
   * @augments Driver.fetchTokenBalance
   * @param {string} reference The unique identifier of a coin. Usually a smart contract address.
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchTokenBalance(reference, modifier) {
    const data = await this.request(`https://api.neoscan.io/api/main_net/v1/get_balance/${modifier}`);
    const { amount: balance } = data.balance.find((item) => item.asset_hash === reference);

    return balance;
  }

  /**
   * @augments Driver.getSupply
   * @param {Coin} coin {@link Coin}
   */
  async getSupply(coin) {
    let total;
    if (typeof coin.reference === 'undefined') {
      total = await this.fetchTotalSupply();
    } else {
      total = await this.fetchTokenTotalSupply(coin.reference);
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
        const balance = await this.fetchTokenBalance(coin.reference, modifier);
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
