const Driver = require('../models/driver');
const Supply = require('../models/supply');

class VeChain extends Driver {
  constructor(options) {
    super({
      blockchain: 'VeChain',
      supports: {
        circulating: true,
        max: true,
        native: true,
      },
      options: {
        ...options,
        useCache: true,
      },
    });
  }

  async fetchTotalSupply() {
    const { result } = await this.request(
      'https://vechainstats.com/pro/vechain-tokens-cg//?auth=cg-5cby-XYrE-r9V&token=vet',
    );
    const { total_supply: totalSupply } = result['0'];
    return Number(totalSupply);
  }

  async fetchCirculatingSupply() {
    const { result } = await this.request(
      'https://vechainstats.com/pro/vechain-tokens-cg//?auth=cg-5cby-XYrE-r9V&token=vet',
    );
    const { circulation } = result['0'];
    return Number(circulation);
  }

  async fetchMaxSupply() {
    const { result } = await this.request(
      'https://vechainstats.com/pro/vechain-tokens-cg//?auth=cg-5cby-XYrE-r9V&token=vet',
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
module.exports = VeChain;
