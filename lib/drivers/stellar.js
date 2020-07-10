const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');
const SupplyModifier = require('../models/supply-modifier');
const { promisesMap } = require('../util');

class Stellar extends Driver {
  constructor(options) {
    super({
      blockchain: 'Stellar',
      timeout: 1000, // 1 requests per second
      supports: {
        balances: true,
        tokens: true,
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const { _embedded: data } = await this.request('https://horizon.stellar.org/ledgers?limit=1&order=desc');
    const [ledger] = data.records;

    return Number(ledger.total_coins);
  }

  /**
   * @augments Driver.fetchBalance
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchBalance(modifier) {
    const { balances } = await this.request(`https://horizon.stellar.org/accounts/${modifier}`);
    const { balance } = balances.find((item) => (item.asset_type === 'native'));

    return Number(balance);
  }

  /**
   * @augments Driver.fetchTokenTotalSupply
   * @param {string} reference The unique identifier of a coin. Usually a smart contract address.
   * @async
   */
  async fetchTokenTotalSupply(reference) {
    const [code, issuer] = reference.split('-');

    const { _embedded: data } = await this.request(`https://horizon.stellar.org/assets/?asset_code=${code}&asset_issuer=${issuer}`);
    const [asset] = data.records;

    return Number(asset.amount);
  }

  /**
   * @augments Driver.fetchTokenBalance
   * @param {string} reference The unique identifier of a coin. Usually a smart contract address.
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchTokenBalance(reference, modifier) {
    const [code, issuer] = reference.split('-');

    const { balances } = await this.request(`https://horizon.stellar.org/accounts/${modifier}`);
    const filteredBalance = balances.find((item) => (
      item.asset_code === code
      && item.asset_issuer === issuer
    ));

    if (!filteredBalance) {
      return 0;
    }

    const { balance } = filteredBalance;

    return Number(balance);
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

module.exports = Stellar;
