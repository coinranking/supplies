const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');

class Blockchair extends Driver {
  constructor(options) {
    super({
      timeout: 200, // 5 requests per second
      options,
      supports: {
        native: false,
        totals: true,
        balance: true,
        blockchains: ['Litecoin', 'BitcoinCash', 'BitcoinSV', 'Monero'],
      },
    });
  }

  async totalSupplyMonero() {
    const { data } = await this.request('https://api.blockchair.com/monero/stats');
    return data.circulation / 10 ** 8;
  }

  async totalSupplyBitcoinSV() {
    const { data } = await this.request('https://api.blockchair.com/bitcoin-sv/stats');
    return data.circulation / 10 ** 8;
  }

  async totalSupplyBitcoinCash() {
    const { data } = await this.request(
      'https://api.blockchair.com/bitcoin-cash/stats',
    );
    return data.circulation / 10 ** 8;
  }

  async totalSupplyLitecoin() {
    const { data } = await this.request(
      'https://api.blockchair.com/litecoin/stats',
    );

    return data.circulation / 10 ** 8;
  }

  async fetchTotalSupply(blockchain) {
    if (this.supportsBlockchain(blockchain) && this[`totalSupply${blockchain}`]) {
      return this[`totalSupply${blockchain}`]();
    }

    throw new Error();
  }


  async balanceLitecoin(modifier) {
    const { data } = await this.request(
      `https://api.blockchair.com/litecoin/dashboards/address/${modifier}`,
    );
    return data[modifier].address.balance / 10 ** 8;
  }

  async balanceBitcoinCash(modifier) {
    const { data } = await this.request(
      `https://api.blockchair.com/bitcoin-cash/dashboards/address/${modifier}`,
    );
    return data[modifier].address.balance / 10 ** 8;
  }

  async balanceBitcoinSV(modifier) {
    const { data } = await this.request(`https://api.blockchair.com/bitcoin-sv/dashboards/address/${modifier}`);
    return data[modifier].address.balance / 10 ** 8;
  }

  async balanceMonero() {
    return null;
  }

  async fetchBalance(modifier, blockchain) {
    if (this.supportsBlockchain(blockchain) && this[`balance${blockchain}`]) {
      return this[`balance${blockchain}`](modifier);
    }

    throw new Error(`Balance can not be fetched for ${blockchain}`);
  }


  async getSupply({ modifiers, blockchain }) {
    const total = await this.fetchTotalSupply(blockchain);

    const modifiersWithBalances = await promisesMap(
      modifiers,
      async (modifier) => {
        const balance = await this.fetchBalance(modifier, blockchain);

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

module.exports = Blockchair;
