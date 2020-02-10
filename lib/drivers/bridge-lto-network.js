const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

class BridgeLtoNetwork extends Driver {
  constructor(options) {
    super({
      blockchain: 'LTO Network',
      timeout: 200, // 5 requests per second
      supports: {
        native: true,
        circulating: true,
        balances: true,
      },
      options,
    });
  }

  /** get total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request(
      'https://bridge.lto.network/stats/total-supply',
    );

    return Number(total);
  }

  /** get circulating supply for native token
   *
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const circulating = await this.request(
      'https://bridge.lto.network/stats/circulating-supply',
    );

    return Number(circulating);
  }

  async fetchBalance(modifier) {
    const balance = await this.request(
      `https://bridge.lto.network/balance/lto20/${modifier}`,
    );

    return Number(balance);
  }

  async getSupply({ modifiers }) {
    const total = await this.fetchTotalSupply();

    const modifiersWithBalances = await promisesMap(
      modifiers,
      async (modifier) => {
        const balance = await this.fetchBalance(modifier);
        return {
          reference: modifier,
          balance,
        };
      },
    );

    let circulating;
    if (modifiers.length > 0) {
      circulating = modifiersWithBalances.reduce(
        (current, modifier) => current - modifier.balance,
        total,
      );
    } else {
      circulating = await this.fetchCirculatingSupply();
    }

    return new Supply({
      total,
      circulating,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = BridgeLtoNetwork;
