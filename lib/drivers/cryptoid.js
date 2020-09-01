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
        blockchains: ['BolivarCoin', 'Dash', 'DigiByte', 'Emerald', 'Litecoin', 'NavCoin', 'Stratis', 'Particl', 'Pivx', 'Trollcoin'],
      },
    });
  }

  async totalSupplyBolivarCoin() {
    const total = await this.request('https://chainz.cryptoid.info/boli/api.dws?q=totalcoins');
    return Number(total);
  }

  async totalSupplyDash() {
    const total = await this.request('https://chainz.cryptoid.info/dash/api.dws?q=totalcoins');
    return Number(total);
  }

  async totalSupplyDigiByte() {
    const total = await this.request('https://chainz.cryptoid.info/dgb/api.dws?q=totalcoins');
    return Number(total);
  }

  async totalSupplyEmerald() {
    const total = await this.request('https://chainz.cryptoid.info/emd/api.dws?q=totalcoins');
    return Number(total);
  }

  async totalSupplyLitecoin() {
    const total = await this.request('https://chainz.cryptoid.info/ltc/api.dws?q=totalcoins');
    return Number(total);
  }

  async totalSupplyNavCoin() {
    const total = await this.request('https://chainz.cryptoid.info/nav/api.dws?q=totalcoins');
    return Number(total);
  }

  async totalSupplyStratis() {
    const total = await this.request('https://chainz.cryptoid.info/strat/api.dws?q=totalcoins');
    return Number(total);
  }

  async totalSupplyParticl() {
    const total = await this.request('https://chainz.cryptoid.info/part/api.dws?q=totalcoins');
    return Number(total);
  }

  async totalSupplyPivx() {
    const total = await this.request('https://chainz.cryptoid.info/pivx/api.dws?q=totalcoins');
    return Number(total);
  }

  async totalSupplyTrollcoin() {
    const total = await this.request('https://chainz.cryptoid.info/troll/api.dws?q=totalcoins');
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

  async circulatingSupplyBolivarCoin() {
    const total = await this.request('https://chainz.cryptoid.info/boli/api.dws?q=circulating');
    return Number(total);
  }

  async circulatingSupplyDash() {
    const total = await this.request('https://chainz.cryptoid.info/dash/api.dws?q=circulating');
    return Number(total);
  }

  async circulatingSupplyDigiByte() {
    const total = await this.request('https://chainz.cryptoid.info/dgb/api.dws?q=circulating');
    return Number(total);
  }

  async circulatingSupplyEmerald() {
    const total = await this.request('https://chainz.cryptoid.info/emd/api.dws?q=circulating');
    return Number(total);
  }

  async circulatingSupplyLitecoin() {
    const total = await this.request('https://chainz.cryptoid.info/ltc/api.dws?q=circulating');
    return Number(total);
  }

  async circulatingSupplyNavCoin() {
    const total = await this.request('https://chainz.cryptoid.info/nav/api.dws?q=circulating');
    return Number(total);
  }

  async circulatingSupplyStratis() {
    const total = await this.request('https://chainz.cryptoid.info/strat/api.dws?q=circulating');
    return Number(total);
  }

  async circulatingSupplyParticl() {
    const total = await this.request('https://chainz.cryptoid.info/part/api.dws?q=circulating');
    return Number(total);
  }

  async circulatingSupplyPivx() {
    const total = await this.request('https://chainz.cryptoid.info/pivx/api.dws?q=circulating');
    return Number(total);
  }

  async circulatingSupplyTrollcoin() {
    const total = await this.request('https://chainz.cryptoid.info/troll/api.dws?q=circulating');
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
