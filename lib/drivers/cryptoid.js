const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');

class CryptoID extends Driver {
  constructor(options) {
    super({
      timeout: 200, // 5 requests per second
      options,
      supports: {
        native: false,
        total: true,
        circulating: true,
        blockchains: ['Litecoin', 'Emerald', 'Dash'],
      },
    });
  }

  async totalSupplyLitecoin() {
    const total = await this.request('https://chainz.cryptoid.info/ltc/api.dws?q=totalcoins');
    return Number(total);
  }

  async totalSupplyEmerald() {
    const total = await this.request('https://chainz.cryptoid.info/emd/api.dws?q=totalcoins');
    return Number(total);
  }

  async totalSupplyDash() {
    const total = await this.request('https://chainz.cryptoid.info/dash/api.dws?q=totalcoins');
    return Number(total);
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @param {string} blockchain one of supported blockchains
   * @async
   */
  async fetchTotalSupply(blockchain) {
    if (this.supportsBlockchain(blockchain) && this[`totalSupply${blockchain}`]) {
      return this[`totalSupply${blockchain}`]();
    }

    throw new Error(`The blockchain "${blockchain}" is not supported in this driver`);
  }

  async circulatingSupplyLitecoin() {
    const total = await this.request('https://chainz.cryptoid.info/ltc/api.dws?q=circulating');
    return Number(total);
  }

  async circulatingSupplyEmerald() {
    const total = await this.request('https://chainz.cryptoid.info/emd/api.dws?q=circulating');
    return Number(total);
  }

  async circulatingSupplyDash() {
    const total = await this.request('https://chainz.cryptoid.info/dash/api.dws?q=circulating');
    return Number(total);
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @param {string} blockchain one of supported blockchains
   * @async
   */
  async fetchCirculatingSupply(blockchain) {
    if (this.supportsBlockchain(blockchain) && this[`circulatingSupply${blockchain}`]) {
      return this[`circulatingSupply${blockchain}`]();
    }

    throw new Error(`The blockchain "${blockchain}" is not supported in this driver`);
  }

  /**
   * @augments Driver.getSupply
   * @param {Coin} modifiers {@link Coin}
   * @async
   */
  async getSupply({ blockchain }) {
    const total = await this.fetchTotalSupply(blockchain);
    const circulating = await this.fetchCirculatingSupply(blockchain);

    return new Supply({
      total,
      circulating,
    });
  }
}

module.exports = CryptoID;
