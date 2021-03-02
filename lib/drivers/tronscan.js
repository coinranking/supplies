const Driver = require('../models/driver');
const Supply = require('../models/supply');
const { promisesMap } = require('../util');
const SupplyModifier = require('../models/supply-modifier');
const Coin = require('../models/coin');

/**
 * Tronscan driver. Supports
 * total and circulating supply
 * for coin TRX and token XDCA on
 * Tronscan blockchain
 *
 *
 * @memberof Driver
 * @augments Driver
 */
class Tronscan extends Driver {
  constructor(options) {
    super({
      timeout: 100, // 10 requests per second
      supports: {
        tokenBalances: true,
        circulating: true,
        blockchains: [
          'Tron TRC20',
        ],
      },
      options,
    });
  }

  /** fetch total supply of native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchTotalSupply() {
    const {
      genesisBlockIssue, totalBlockPay, totalNodePay, burnByCharge, burnPerDay,
    } = await this.request('https://apilist.tronscan.org/api/funds');

    return Number(genesisBlockIssue)
      + Number(totalBlockPay)
      + Number(totalNodePay)
      - Number(burnByCharge)
      - Number(burnPerDay);
  }

  /** fetch total supply for token
   *
   * @augments Driver.fetchTokenTotalSupply
   * @param {string} reference token id
   * @async
   */
  async fetchTokenTotalSupply(reference) {
    const { trc20_tokens: tokens } = await this.request(`https://apilist.tronscan.org/api/token_trc20?contract=${reference}`);
    const record = tokens[0];

    if (!record) {
      return undefined;
    }

    return Number(record.total_supply_with_decimals) / 10 ** record.decimals;
  }

  /** fetch circulating supply of native token
   *
   * @augments Driver.fetchTotalSupply
   * @async
   */
  async fetchCirculatingSupply() {
    const {
      genesisBlockIssue, totalBlockPay, totalNodePay, burnByCharge, burnPerDay, fundTrx,
    } = await this.request('https://apilist.tronscan.org/api/funds');

    return Number(genesisBlockIssue)
      + Number(totalBlockPay)
      + Number(totalNodePay)
      - Number(burnByCharge)
      - Number(burnPerDay)
      - Number(fundTrx);
  }

  /** get balance for specific wallet and contract address
   *
   * @param {string} reference The unique identifier of a coin. Usually a smart contract address.
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchTokenBalance(reference, modifier) {
    const { trc20token_balances: balances } = await this.request(`https://apilist.tronscan.org/api/account?address=${modifier}`);
    const record = balances.find((el) => el.contract_address === reference);

    if (!record) {
      return undefined;
    }

    return Number(record.balance) / 10 ** record.tokenDecimal;
  }

  /**
   * @augments Driver.getSupply
   * @param {Coin} modifiers {@link Coin}
   */
  async getSupply({ reference, modifiers }) {
    let total = null;
    let circulating = null;
    let modifiersWithBalances = null;

    if (reference) {
      total = await this.fetchTokenTotalSupply(reference);

      modifiersWithBalances = await promisesMap(
        modifiers,
        async (modifier) => {
          const balance = await this.fetchTokenBalance(reference, modifier);
          return {
            reference: modifier,
            balance,
          };
        },
      );

      circulating = modifiersWithBalances.reduce(
        (current, modifier) => current - modifier.balance,
        total,
      );
    } else {
      total = await this.fetchTotalSupply();
      circulating = await this.fetchCirculatingSupply();
    }

    return new Supply({
      total,
      circulating,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = Tronscan;
