const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

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

  async fetchTotalSupply() {
    const {
      data: { quantity, precision },
    } = await this.request('https://api.wavesplatform.com/v0/assets/WAVES');
    return Number(quantity) / 10 ** precision;
  }

  async fetchTokenTotalSupply(reference) {
    const { quantity, decimals } = await this.request(
      `https://nodes.wavesnodes.com/assets/details/${reference}`,
    );
    return Number(quantity) / 10 ** decimals;
  }

  async fetchBalance(modifier) {
    const { balance } = await this.request(
      `https://nodes.wavesnodes.com/addresses/balance/${modifier}`,
    );
    return Number(balance);
  }

  async fetchTokenBalance(reference, modifier) {
    const { balance } = await this.request(
      `http://nodes.wavesnodes.com/assets/balance/${modifier}/${reference}`,
    );
    return Number(balance);
  }

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
