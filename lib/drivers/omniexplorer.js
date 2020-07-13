const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');
const SupplyModifier = require('../models/supply-modifier');
const { promisesMap } = require('../util');

/**
 * Omniexplorer driver. Supports circulating and max supply for tokens.
 *
 * @memberof Driver
 * @augments Driver
 */
class OmniExplorer extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        balances: true,
        tokens: true,
        blockchains: ['Omnilayer'],
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
      url: 'https://api.omniexplorer.info/v1/properties/listbyecosystem',
      method: 'post',
      form: {
        ecosystem: 1,
      },
    };

    const { properties } = await this.request(options);
    const property = properties.find(
      (item) => (Number(item.propertyid) === 1),
    );

    return Number(property.totaltokens);
  }

  /**
   * @augments Driver.fetchBalance
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchBalance(modifier) {
    const options = {
      url: 'https://api.omniexplorer.info/v1/address/addr/',
      method: 'post',
      form: {
        addr: modifier,
      },
    };

    const { balance: balances } = await this.request(options);
    const balance = balances.find((item) => (Number(item.id) === 1));

    if (!balance) return 0;

    return Number(balance.value) / 100000000;
  }

  /**
   * @augments Driver.fetchTokenTotalSupply
   * @param {string} reference The unique identifier of a coin. Usually a smart contract address.
   * @async
   */
  async fetchTokenTotalSupply(reference) {
    const options = {
      url: 'https://api.omniexplorer.info/v1/properties/listbyecosystem',
      method: 'post',
      form: {
        ecosystem: 1,
      },
    };

    const { properties } = await this.request(options);
    const property = properties.find(
      (item) => (Number(item.propertyid) === Number(reference)),
    );

    return Number(property.totaltokens);
  }

  /**
   * @augments Driver.fetchTokenBalance
   * @param {string} reference The unique identifier of a coin. Usually a smart contract address.
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchTokenBalance(reference, modifier) {
    const options = {
      url: 'https://api.omniexplorer.info/v1/address/addr/',
      method: 'post',
      form: {
        addr: modifier,
      },
    };

    const { balance: balances } = await this.request(options);
    const balance = balances.find((item) => (Number(item.id) === Number(reference)));

    if (!balance) return 0;

    return Number(balance.value) / 100000000;
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

module.exports = OmniExplorer;
