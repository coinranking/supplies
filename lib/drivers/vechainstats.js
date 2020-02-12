const Driver = require('../models/driver');
const Supply = require('../models/supply');

class VeChainStats extends Driver {
  constructor(options) {
    super({
      blockchain: 'VeChain',
      supports: {
        circulating: true,
        max: true,
        native: true,
        secret: true,
      },
      options,
    });
  }

  get secret() {
    if (!this._secret) {
      throw new Error('API key is required');
    }
    return this._secret;
  }

  set secret(secret) {
    this._secret = secret;
  }


  async fetchTotalSupply() {
    const { result } = await this.request(
      `https://vechainstats.com/pro/vechain-tokens-cg/?auth=${this.secret}&token=vet`,
    );
    const { total_supply: totalSupply } = result['0'];
    return Number(totalSupply);
  }

  async fetchCirculatingSupply() {
    const { result } = await this.request(
      `https://vechainstats.com/pro/vechain-tokens-cg/?auth=${this.secret}&token=vet`,
    );
    const { circulation } = result['0'];
    return Number(circulation);
  }

  async fetchMaxSupply() {
    const { result } = await this.request(
      `https://vechainstats.com/pro/vechain-tokens-cg/?auth=${this.secret}&token=vet`,
    );
    const { max_supply: maxSupply } = result['0'];
    return Number(maxSupply);
  }

  async getSupply() {
    const total = await this.fetchTotalSupply();
    const circulating = await this.fetchCirculatingSupply();
    const max = await this.fetchMaxSupply();

    return new Supply({
      total,
      circulating,
      max,
    });
  }
}
module.exports = VeChainStats;
