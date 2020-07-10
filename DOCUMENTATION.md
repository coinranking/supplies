## Classes

<dl>
<dt><a href="#Coin">Coin</a></dt>
<dd></dd>
<dt><a href="#Driver">Driver</a></dt>
<dd></dd>
<dt><a href="#SupplyModifier">SupplyModifier</a></dt>
<dd></dd>
<dt><a href="#Supply">Supply</a></dt>
<dd></dd>
</dl>

<a name="Coin"></a>

## Coin
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | The parameters of the coin. |
| options.reference | <code>string</code> | The unique identifier of a coin. Usually a smart contract address. |
| options.name | <code>string</code> | The name of the coin. |
| options.symbol | <code>string</code> | The symbol of the coin. Most of the time three characters long. E.g. BTC. |
| options.decimals | <code>number</code> | The amount of precision this coin uses. For most blockchains, this defaults to 18. |
| options.modifiers | <code>Array.&lt;string&gt;</code> | List of addresses of which the balance should be substracted from the supply to get   the circulating supply. E.g. for ethereum the balance of address   0x0000000000000000000000000000000000000000 is substracted, because tokens are sent   there to get 'burned'. See [SupplyModifier](#SupplyModifier). |

<a name="new_Coin_new"></a>

### new Coin()
Coin model provided to drivers that support multiple coins.

**Example**  
```js
const coin = new Coin({
  // Lets take the Basic Attention Token (BAT) for example.
  // The reference is the unique id for a specific driver;
  // which is a smart contract address in this case.
  name: 'Basic Attention Token',
  symbol: 'BAT',
  reference: '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
  // Modifiers are blockchain addresses that get subtracted from the
  // total supply to get the circulating supply.
  modifiers: [
    '0x0000000000000000000000000000000000000000', // Burned address
    '0x0000000000000000000000000000000000000001', // Burned address
    '0x185f19b43d818e10a31be68f445ef8edcb8afb83', // Multisig address
    '0x67fa2c06c9c6d4332f330e14a66bdf1873ef3d2b', // Team Lock up address
    '0x7c31560552170ce96c4a7b018e93cddc19dc61b6', // UGP reserve address
  ],
  // Some drivers like Etherscan require decimals
  decimals: 18,
});
```
<a name="Driver"></a>

## Driver
**Kind**: global class  

* [Driver](#Driver)
    * [new Driver()](#new_Driver_new)
    * [.fetchTotalSupply](#Driver.fetchTotalSupply) ⇒ <code>number</code>
    * [.fetchCirculatingSupply](#Driver.fetchCirculatingSupply) ⇒ <code>number</code>
    * [.fetchMaxSupply](#Driver.fetchMaxSupply) ⇒ <code>number</code>
    * [.fetchBalance](#Driver.fetchBalance) ⇒ <code>number</code>
    * [.fetchTokenTotalSupply](#Driver.fetchTokenTotalSupply) ⇒ <code>number</code>
    * [.fetchTokenBalance](#Driver.fetchTokenBalance) ⇒ <code>number</code>
    * [.getSupply](#Driver.getSupply) ⇒ [<code>Promise.&lt;Supply&gt;</code>](#Supply)

<a name="new_Driver_new"></a>

### new Driver()
Driver parent class, to be extended by drivers for specific block explorers.

<a name="Driver.fetchTotalSupply"></a>

### Driver.fetchTotalSupply ⇒ <code>number</code>
Fetch the total supply of a coin.

**Kind**: static namespace of [<code>Driver</code>](#Driver)  
**Returns**: <code>number</code> - All the currently mined coins.  
<a name="Driver.fetchCirculatingSupply"></a>

### Driver.fetchCirculatingSupply ⇒ <code>number</code>
Fetch the circulating supply of a coin.

**Kind**: static namespace of [<code>Driver</code>](#Driver)  
**Returns**: <code>number</code> - The total supply minus coins not in circulation, such as burned, premined or escrowed coins.  
<a name="Driver.fetchMaxSupply"></a>

### Driver.fetchMaxSupply ⇒ <code>number</code>
Fetch the maximum supply of a coin.

**Kind**: static namespace of [<code>Driver</code>](#Driver)  
**Returns**: <code>number</code> - The maximum possible amount of supply ever to be reached.  
<a name="Driver.fetchBalance"></a>

### Driver.fetchBalance ⇒ <code>number</code>
Fetch the balance on a specific address.

**Kind**: static namespace of [<code>Driver</code>](#Driver)  
**Returns**: <code>number</code> - The amount of coins on a specific address, which can be used as a modifier.
  to determine the circulating supply.  
<a name="Driver.fetchTokenTotalSupply"></a>

### Driver.fetchTokenTotalSupply ⇒ <code>number</code>
Fetch the total supply of an token.

**Kind**: static namespace of [<code>Driver</code>](#Driver)  
**Returns**: <code>number</code> - Total amount of a token.  
<a name="Driver.fetchTokenBalance"></a>

### Driver.fetchTokenBalance ⇒ <code>number</code>
Fetch token balance.

**Kind**: static namespace of [<code>Driver</code>](#Driver)  
**Returns**: <code>number</code> - Balance of a specific token on a specific address, to be used as supply modifier in order to
  calculate the circulating supply.  
<a name="Driver.getSupply"></a>

### Driver.getSupply ⇒ [<code>Promise.&lt;Supply&gt;</code>](#Supply)
Drivers must include a getSupplies method. This method will call supported supply data
such as methods to fetch total, circulating and max supply.

**Kind**: static namespace of [<code>Driver</code>](#Driver)  
**Returns**: [<code>Promise.&lt;Supply&gt;</code>](#Supply) - Returns a promise of a supply model.  

| Param | Type | Description |
| --- | --- | --- |
| [coin] | [<code>Coin</code>](#Coin) | The getSupply method gets called with an [coin instance](#Coin). |

<a name="SupplyModifier"></a>

## SupplyModifier
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | The parameters of the supply modifier |
| options.reference | <code>string</code> | A unique identifier. An address that holds a balance. |
| options.balance | <code>number</code> | The balance of the adress. |

<a name="new_SupplyModifier_new"></a>

### new SupplyModifier()
One or more supply modifiers are used to calculate the circulating supply.
A supply modifier is a balance on a specific address, that holds a balance. E.g. for ethereum
the balance of address 0x0000000000000000000000000000000000000000 is substracted, because tokens
are sent there to get 'burned'. These burned tokens do exist on the blockchain, but because they
are not available to the public they are 'circulating'. So the 'total supply' minus these
supply modifiers result in the 'circulating supply'. Also see [Supply](#Supply).

<a name="Supply"></a>

## Supply
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | The parameters of the supply. |
| options.total | <code>number</code> | The amount of coins that is currently available on the blockchain, through either mining   or pre-mined. |
| options.circulating | <code>number</code> | The total amount of coins, minus coins that are withold from the public. Coins can be withold   by means of burning, escrowing or being pre-mined and undistributed. The circulating supply is   fetched directly from a source or calculated by fetching modifiers, see options.modifiers in   [Coin](#Coin). |
| options.max | <code>number</code> | In contrast to the total supply, the max supply is not only the currently available supply,   but also the amount of coins that can be reached in the future. It's relevance differs per   blockchain. E.g. Bitcoin has a fixed maximum supply of 21 million coins, upon which all it's   coins are mined. Ethereum can also be mined, but for now there is an indefinite amount and   thus no max supply. Other blockchains come pre-mined or might be completely mined already,   which means the max supply equals the total supply. |
| options.modifiers | [<code>Array.&lt;SupplyModifier&gt;</code>](#SupplyModifier) | Consists of a list of suply modifiers. See [SupplyModifier](#SupplyModifier). |

<a name="new_Supply_new"></a>

### new Supply()
Supply model, returned from all drivers.

