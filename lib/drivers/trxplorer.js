const Driver = require('../models/driver');
const Supply = require('../models/supply');
const request = require('../request');
const { promisesMap } = require('../utils');

class TrxPlorer extends Driver {
  constructor() {
    super({
      blockchains: ['tron'],
      timeout: 500, // 2 requests per second
    });
  }

  async _fetchNativeTotalSupply() {
    await this.throttle.push();

    const { items } = await request('https://api.trxplorer.io/v2/blocks?start=0&limit=1');
    const [block] = items;

    const genesis = 100000000000;
    const blockProducedRewards = block.height * 32;
    const nodeRewards = block.height * 16;

    const total = genesis + blockProducedRewards + nodeRewards;

    return Number(total);
  }

  async _fetchAssetTotalSupply(coin) {
    await this.throttle.push();

    const { precision, supply } = await request(`https://api.trxplorer.io/v2/token/${coin.reference}`);

    return supply / (10 ** precision);
  }

  async _fetchBalance(coin, modifier) {
    await this.throttle.push();

    const { decimals } = coin;
    const data = await request(`https://api.trxplorer.io/v2/account/${modifier.reference}`);

    if (coin.reference === 'native') {
      if (data.balance < 0) return 0;
      return data.balance / (10 ** decimals);
    }

    const asset = data.assets[`${coin.reference}:${coin.name}`];
    if (asset) return asset;

    return 0;
  }

  async getSupply(coin) {
    let total;
    if (coin.reference === 'native') {
      total = await this._fetchNativeTotalSupply();
    } else {
      total = await this._fetchAssetTotalSupply(coin);
    }

    const modifiers = await promisesMap(
      coin.modifiers,
      async (modifier) => {
        const balance = await this._fetchBalance(coin, modifier);
        return {
          ...modifier,
          balance,
        };
      },
    );

    let circulating;
    if (coin.circulatingSupply) {
      circulating = coin.circulatingSupply;
    } else {
      circulating = modifiers.reduce((current, modifier) => current - modifier.balance, total);
    }
    const max = coin.maxSupply;

    return new Supply({
      total,
      circulating,
      max,
      modifiers,
    });
  }
}

module.exports = TrxPlorer;
