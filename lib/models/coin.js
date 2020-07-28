/**
 * Coin model provided to drivers that support multiple coins.
 *
 * @namespace Coin
 * @class
 *
 * @property {object} options The parameters of the coin.
 * @property {string} options.reference
 *   The unique identifier of a coin. Usually a smart contract address.
 * @property {string} options.name The name of the coin.
 * @property {string} options.symbol
 *   The symbol of the coin. Most of the time three characters long. E.g. BTC.
 * @property {number} options.decimals
 *   The amount of precision this coin uses. For most blockchains, this defaults to 18.
 * @property {Array.<string>} options.modifiers
 *   List of addresses of which the balance should be substracted from the supply to get
 *   the circulating supply. E.g. for ethereum the balance of address
 *   0x0000000000000000000000000000000000000000 is substracted, because tokens are sent
 *   there to get 'burned'. See {@link SupplyModifier}.
 *
 * @example
 * const coin = new Coin({
 *   // Lets take the Basic Attention Token (BAT) for example.
 *   // The reference is the unique id for a specific driver;
 *   // which is a smart contract address in this case.
 *   name: 'Basic Attention Token',
 *   symbol: 'BAT',
 *   reference: '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
 *   // Modifiers are blockchain addresses that get subtracted from the
 *   // total supply to get the circulating supply.
 *   modifiers: [
 *     '0x0000000000000000000000000000000000000000', // Burned address
 *     '0x0000000000000000000000000000000000000001', // Burned address
 *     '0x185f19b43d818e10a31be68f445ef8edcb8afb83', // Multisig address
 *     '0x67fa2c06c9c6d4332f330e14a66bdf1873ef3d2b', // Team Lock up address
 *     '0x7c31560552170ce96c4a7b018e93cddc19dc61b6', // UGP reserve address
 *   ],
 *   // Some drivers like Etherscan require decimals
 *   decimals: 18,
 * });
 *
 * @property {string} options.blockchain
 *   Defines which blockchain will be taken for multi-blockchain drivers
 */
class Coin {
  constructor(options) {
    this.reference = options.reference;
    this.name = options.name;
    this.symbol = options.symbol;
    this.decimals = options.decimals;
    this.modifiers = options.modifiers || [];
    this.blockchain = options.blockchain;
  }
}

module.exports = Coin;
