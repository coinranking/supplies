const Driver = require('../models/driver');
const Supply = require('../models/supply');

/**
 * Solana driver. Supports total
 * and circulating supply for SOL
 * token on own blockchain.
 *
 * @augments Driver
 * @memberof Driver
 */
class Solana extends Driver {
  constructor(options) {
    super({
      timeout: 1000, // 1 requests per second
      supports: {
        native: true,
        circulating: true,
        blockchains: ['Solana'],
      },
      options,
    });
  }

  /*
  Token supply:
  query ($token: String!) {
    supply: solana(network: solana) {
      mint: transfers(
        currency: {is: $token}
        transferType: {is: mint}
        senderAddress: {is: ""}
      ) {
        amount(calculate: sum)
      }
    }
  }
   */

  /**
   * get total supply for native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const total = await this.request('https://api.mainnet-beta.solana.com/v0/total-supply');

    return Number(total);
  }

  /**
   * @augments Driver.fetchCirculatingSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const total = await this.request('https://api.mainnet-beta.solana.com/v0/circulating-supply');

    return Number(total);
  }

  /**
   * @augments Driver.getSupply
   */
  async getSupply() {
    const total = await this.fetchTotalSupply();
    const circulating = await this.fetchCirculatingSupply();

    return new Supply({
      total,
      circulating,
    });
  }
}

module.exports = Solana;
