const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Bitcoin Vault driver. Supports total supply for BTCV
 * using Bitcoin Vault blockchain.
 *
 * @memberof Driver
 * @augments Driver
 */
class BitcoinVault extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        circulating: false,
        max: true,
      },
      options,
    });
  }

  /**
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const { total_coin_supply: totalCoinSupply } = await this.request('http://api.bitcoinvault.global/status');
    return Number(totalCoinSupply);
  }

  /**
   * @augments Driver.fetchMaxSupply
   */
  fetchMaxSupply() {
    return 21000000;
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();
    const max = this.fetchMaxSupply();

    return new Supply({
      total,
      max,
    });
  }
}

module.exports = BitcoinVault;
