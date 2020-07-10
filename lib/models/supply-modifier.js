/**
 * One or more supply modifiers are used to calculate the circulating supply.
 * A supply modifier is a balance on a specific address, that holds a balance. E.g. for ethereum
 * the balance of address 0x0000000000000000000000000000000000000000 is substracted, because tokens
 * are sent there to get 'burned'. These burned tokens do exist on the blockchain, but because they
 * are not available to the public they are 'circulating'. So the 'total supply' minus these
 * supply modifiers result in the 'circulating supply'. Also see {@link Supply}.
 *
 * @namespace SupplyModifier
 * @class
 * @property {object} options The parameters of the supply modifier
 * @property {string} options.reference
 *   A unique identifier. An address that holds a balance.
 * @property {number} options.balance
 *   The balance of the adress.
 */
class SupplyModifier {
  constructor(options) {
    this.reference = options.reference;
    this.balance = options.balance;
  }
}

module.exports = SupplyModifier;
