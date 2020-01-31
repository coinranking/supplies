const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

/**
 * Waves driver. Supports balance and total supply for waves and other
 * tokens on the Waves blockchain.
 *
 * @augments Driver
 * @memberof Driver
 */
class Waves extends Driver {
  constructor(options) {
    super({
      blockchain: 'Waves',
      supports: {
        native: true,
        tokens: true,
        balances: true,
      },
      options,
    });
  }

  /** get total supply for Wave token
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

  /** get total supply for specific asset id
   *
   * @augments Driver.fetchTokenTotalSupply
   * @param {referenceParam} reference {@link referenceParam}
   * @async
   */
  async fetchTokenTotalSupply(reference) {
    const { quantity, decimals } = await this.request(
      `https://nodes.wavesnodes.com/assets/details/${reference}`,
    );
    return Number(quantity) / 10 ** decimals;
  }

  /** get balance for specific wallet address
   *
   * @augments Driver.fetchBalance
   * @param {modifierParam} modifier {@link modifierParam}
   * @async
   */
  async fetchBalance(modifier) {
    const { balance } = await this.request(
      `https://nodes.wavesnodes.com/addresses/balance/${modifier}`,
    );
    return Number(balance);
  }

  /** fetch balance value of asset id for specific wallet
   *
   * @augments Driver.fetchTokenBalance
   * @param {referenceParam} reference {@link referenceParam}
   * @param {modifierParam} modifier {@link modifierParam}
   * @async
   */
  async fetchTokenBalance(reference, modifier) {
    const { balance } = await this.request(
      `http://nodes.wavesnodes.com/assets/balance/${modifier}/${reference}`,
    );
    return Number(balance);
  }

  /**
   * @augments Driver.getSupply
   * @param {coinParam} coin {@link coinParam}
   * @param {referenceParam} coin.reference {@link referenceParam}
   * @param {modifierParam[]} coin.modifiers  {@link modifierParam}
   * @async
   */
  async getSupply({ reference, modifiers }) {
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
        const balance = await this.fetchTokenBalance(reference, modifier);
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
