const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');
const SupplyModifier = require('../models/supply-modifier');
const { promisesMap } = require('../util');

/**
 * Waves driver. Supports balance and total supply for
 * native token and smart contract on the Waves blockchain.
 *
 * @augments Driver
 * @memberof Driver
 */
class Waves extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        tokens: true,
        balances: true,
        blockchains: ['Waves'],
      },
      options,
    });
  }

  /**
   * get total supply for Wave token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const {
      data: { quantity, precision },
    } = await this.request('https://api.wavesplatform.com/v0/assets/WAVES');
    return Number(quantity) / 10 ** precision;
  }

  /**
   * get total supply for specific asset id
   *
   * @augments Driver.fetchTokenTotalSupply
   * @param {string} reference The unique identifier of a coin. Usually a smart contract address.
   * @async
   */
  async fetchTokenTotalSupply(reference) {
    const { quantity, decimals } = await this.request(
      `https://nodes.wavesnodes.com/assets/details/${reference}`,
    );
    return Number(quantity) / 10 ** decimals;
  }

  /**
   * get balance for specific wallet address
   *
   * @augments Driver.fetchBalance
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchBalance(modifier) {
    const { balance } = await this.request(
      `https://nodes.wavesnodes.com/addresses/balance/${modifier}`,
    );
    const decimals = 8;
    return Number(balance) / 10 ** decimals;
  }

  /**
   * fetch balance value of asset id for specific wallet
   *
   * @augments Driver.fetchTokenBalance
   * @param {string} reference The unique identifier of a coin. Usually a smart contract address.
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @param {number} decimals
   *   The amount of precision this coin uses.
   *   For most blockchains, this defaults to 10.
   * @async
   */
  async fetchTokenBalance(reference, modifier, decimals) {
    const { balances } = await this.request(
      `http://nodes.wavesnodes.com/assets/balance/${modifier}`,
    );
    const filteredBalances = balances.filter((item) => item.assetId === reference);
    if (filteredBalances.length === 0) {
      return 0;
    }
    const [balance] = filteredBalances;

    let decimalsToUse = decimals;
    if (balance.issueTransaction !== null) {
      ({ decimals: decimalsToUse } = balance.issueTransaction);
    }

    const amount = balance.balance;
    return Number(amount) / 10 ** decimalsToUse;
  }

  /**
   * @augments Driver.getSupply
   * @param {Coin} coin {@link Coin}
   * @async
   */
  async getSupply({ reference, modifiers, decimals }) {
    let total;
    if (reference) {
      total = await this.fetchTokenTotalSupply(reference);
    } else {
      total = await this.fetchTotalSupply();
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
        const balance = await this.fetchTokenBalance(reference, modifier, decimals);
        return {
          reference: modifier,
          balance,
        };
      },
    );

    const circulating = modifiersWithBalances.reduce(
      (current, modifier) => current - modifier.balance,
      total,
    );

    return new Supply({
      total,
      circulating,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = Waves;
