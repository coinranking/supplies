## Classes

<dl>
<dt><a href="#Driver">Driver</a></dt>
<dd></dd>
<dt><a href="#Model">Model</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#coinParam">coinParam</a> : <code><a href="#Model.Coin">Coin</a></code></dt>
<dd><p>Coin model with properties needed to fetch supplies.</p>
</dd>
<dt><a href="#modifierParam">modifierParam</a> : <code>string</code></dt>
<dd><p>Address which balance is used as a modifier.</p>
</dd>
<dt><a href="#referenceParam">referenceParam</a> : <code>string</code></dt>
<dd><p>Reference to a coin unique for the blockchain. E.g. a smart contract address.</p>
</dd>
<dt><a href="#decimalsParam">decimalsParam</a> : <code>number</code></dt>
<dd><p>Amount of decimals used for this coin.</p>
</dd>
</dl>

<a name="Driver"></a>

## Driver
**Kind**: global class  

* [Driver](#Driver)
    * [new Driver()](#new_Driver_new)
    * _static_
        * [.fetchTotalSupply](#Driver.fetchTotalSupply) ⇒ <code>number</code>
        * [.fetchCirculatingSupply](#Driver.fetchCirculatingSupply) ⇒ <code>number</code>
        * [.fetchMaxSupply](#Driver.fetchMaxSupply) ⇒ <code>number</code>
        * [.fetchBalance](#Driver.fetchBalance) ⇒ <code>number</code>
        * [.fetchTokenTotalSupply](#Driver.fetchTokenTotalSupply) ⇒ <code>number</code>
        * [.fetchTokenBalance](#Driver.fetchTokenBalance) ⇒ <code>number</code>
        * [.getSupply](#Driver.getSupply) ⇒ [<code>Promise.&lt;Supply&gt;</code>](#Model.Supply)
    * _inner_
        * [~Bare](#Driver.Bare) ⇐ [<code>Driver</code>](#Driver)
            * [.fetchTotalSupply()](#Driver.Bare+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
            * [.fetchBalance(modifier)](#Driver.Bare+fetchBalance) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
            * [.getSupply(modifiers)](#Driver.Bare+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)
        * [~BlockchainInfo](#Driver.BlockchainInfo) ⇐ [<code>Driver</code>](#Driver)
            * [.fetchTotalSupply()](#Driver.BlockchainInfo+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
            * [.fetchCirculatingSupply()](#Driver.BlockchainInfo+fetchCirculatingSupply) ⇐ [<code>fetchCirculatingSupply</code>](#Driver.fetchCirculatingSupply)
            * [.fetchMaxSupply()](#Driver.BlockchainInfo+fetchMaxSupply) ⇐ [<code>fetchMaxSupply</code>](#Driver.fetchMaxSupply)
            * [.getSupply()](#Driver.BlockchainInfo+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)
        * [~BlockchairBitcoinCash](#Driver.BlockchairBitcoinCash) ⇐ [<code>Driver</code>](#Driver)
            * [.fetchTotalSupply()](#Driver.BlockchairBitcoinCash+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
            * [.fetchBalance(modifier)](#Driver.BlockchairBitcoinCash+fetchBalance) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
            * [.getSupply(modifiers)](#Driver.BlockchairBitcoinCash+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)
        * [~BlockchairLitecoin](#Driver.BlockchairLitecoin) ⇐ [<code>Driver</code>](#Driver)
            * [.fetchTotalSupply()](#Driver.BlockchairLitecoin+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
            * [.fetchBalance(modifier)](#Driver.BlockchairLitecoin+fetchBalance) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
            * [.getSupply(modifiers)](#Driver.BlockchairLitecoin+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)
        * [~BlocksEos](#Driver.BlocksEos) ⇐ [<code>Driver</code>](#Driver)
            * [.fetchTotalSupply()](#Driver.BlocksEos+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
            * [.fetchMaxSupply()](#Driver.BlocksEos+fetchMaxSupply) ⇐ [<code>fetchMaxSupply</code>](#Driver.fetchMaxSupply)
        * [~BridgeLto](#Driver.BridgeLto) ⇐ [<code>Driver</code>](#Driver)
            * [.fetchTotalSupply()](#Driver.BridgeLto+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
            * [.fetchBalance(modifier)](#Driver.BridgeLto+fetchBalance) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
            * [.getSupply(modifiers)](#Driver.BridgeLto+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)
        * [~CardanoExplorer](#Driver.CardanoExplorer) ⇐ [<code>Driver</code>](#Driver)
            * [.fetchTotalSupply()](#Driver.CardanoExplorer+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
            * [.fetchBalance(modifier)](#Driver.CardanoExplorer+fetchBalance) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
            * [.getSupply(coin)](#Driver.CardanoExplorer+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)
        * [~ChainNemNinja](#Driver.ChainNemNinja) ⇐ [<code>Driver</code>](#Driver)
            * [.fetchTotalSupply()](#Driver.ChainNemNinja+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
            * [.fetchMaxSupply()](#Driver.ChainNemNinja+fetchMaxSupply) ⇐ [<code>fetchMaxSupply</code>](#Driver.fetchMaxSupply)
            * [.fetchBalance(modifier)](#Driver.ChainNemNinja+fetchBalance) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
            * [.getSupply(coin)](#Driver.ChainNemNinja+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)
        * [~CryptoidDash](#Driver.CryptoidDash) ⇐ [<code>Driver</code>](#Driver)
            * [.fetchTotalSupply()](#Driver.CryptoidDash+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
            * [.fetchCirculatingSupply()](#Driver.CryptoidDash+fetchCirculatingSupply) ⇐ [<code>fetchCirculatingSupply</code>](#Driver.fetchCirculatingSupply)
            * [.getSupply()](#Driver.CryptoidDash+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)
        * [~DiaEthereumClassic](#Driver.DiaEthereumClassic) ⇐ [<code>Driver</code>](#Driver)
            * [.fetchCirculatingSupply()](#Driver.DiaEthereumClassic+fetchCirculatingSupply) ⇐ [<code>fetchCirculatingSupply</code>](#Driver.fetchCirculatingSupply)
            * [.getSupply()](#Driver.DiaEthereumClassic+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)
        * [~DogeChain](#Driver.DogeChain) ⇐ [<code>Driver</code>](#Driver)
            * [.fetchTotalSupply()](#Driver.DogeChain+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
            * [.fetchCirculatingSupply()](#Driver.DogeChain+fetchCirculatingSupply) ⇐ [<code>fetchCirculatingSupply</code>](#Driver.fetchCirculatingSupply)
            * [.getSupply()](#Driver.DogeChain+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)
        * [~Etherscan](#Driver.Etherscan) ⇐ [<code>Driver</code>](#Driver)
            * [.fetchTotalSupply()](#Driver.Etherscan+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
            * [.fetchBalance(modifier)](#Driver.Etherscan+fetchBalance) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
            * [.fetchTokenTotalSupply(reference, decimals)](#Driver.Etherscan+fetchTokenTotalSupply) ⇐ [<code>fetchTokenTotalSupply</code>](#Driver.fetchTokenTotalSupply)
            * [.fetchTokenBalance(reference, modifier, decimals)](#Driver.Etherscan+fetchTokenBalance) ⇐ [<code>fetchTokenBalance</code>](#Driver.fetchTokenBalance)
            * [.getSupply(coin)](#Driver.Etherscan+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)
        * [~Helpico](#Driver.Helpico) ⇐ [<code>Driver</code>](#Driver)
            * [.fetchTotalSupply()](#Driver.Helpico+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
            * [.fetchBalance(modifier)](#Driver.Helpico+fetchBalance) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
            * [.getSupply(modifiers)](#Driver.Helpico+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)
        * [~Lisk](#Driver.Lisk) ⇐ [<code>Driver</code>](#Driver)
            * [.fetchTotalSupply()](#Driver.Lisk+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
            * [.fetchBalance(modifier)](#Driver.Lisk+fetchBalance) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
            * [.getSupply(coin)](#Driver.Lisk+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)
        * [~LitecoinNet](#Driver.LitecoinNet) ⇐ [<code>Driver</code>](#Driver)
            * [.fetchTotalSupply()](#Driver.LitecoinNet+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
            * [.fetchCirculatingSupply()](#Driver.LitecoinNet+fetchCirculatingSupply) ⇐ [<code>fetchCirculatingSupply</code>](#Driver.fetchCirculatingSupply)
            * [.fetchMaxSupply()](#Driver.LitecoinNet+fetchMaxSupply) ⇐ [<code>fetchMaxSupply</code>](#Driver.fetchMaxSupply)
            * [.getSupply()](#Driver.LitecoinNet+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)
        * [~MoneroBlocks](#Driver.MoneroBlocks) ⇐ [<code>Driver</code>](#Driver)
            * [.fetchTotalSupply()](#Driver.MoneroBlocks+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
            * [.fetchCirculatingSupply()](#Driver.MoneroBlocks+fetchCirculatingSupply) ⇐ [<code>fetchCirculatingSupply</code>](#Driver.fetchCirculatingSupply)
            * [.getSupply()](#Driver.MoneroBlocks+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)
        * [~NeoScan](#Driver.NeoScan) ⇐ [<code>Driver</code>](#Driver)
            * [.fetchTotalSupply()](#Driver.NeoScan+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
            * [.fetchBalance(modifier)](#Driver.NeoScan+fetchBalance) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
            * [.fetchTokenTotalSupply(reference)](#Driver.NeoScan+fetchTokenTotalSupply) ⇐ [<code>fetchTokenTotalSupply</code>](#Driver.fetchTokenTotalSupply)
            * [.fetchTokenBalance(reference, modifier)](#Driver.NeoScan+fetchTokenBalance) ⇐ [<code>fetchTokenBalance</code>](#Driver.fetchTokenBalance)
            * [.getSupply(coin)](#Driver.NeoScan+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)
        * [~OmniExplorer](#Driver.OmniExplorer) ⇐ [<code>Driver</code>](#Driver)
            * [.fetchTotalSupply()](#Driver.OmniExplorer+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
            * [.fetchBalance(modifier)](#Driver.OmniExplorer+fetchBalance) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
            * [.fetchTokenTotalSupply(reference)](#Driver.OmniExplorer+fetchTokenTotalSupply) ⇐ [<code>fetchTokenTotalSupply</code>](#Driver.fetchTokenTotalSupply)
            * [.fetchTokenBalance(reference, modifier)](#Driver.OmniExplorer+fetchTokenBalance) ⇐ [<code>fetchTokenBalance</code>](#Driver.fetchTokenBalance)
            * [.getSupply(coin)](#Driver.OmniExplorer+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)
        * [~Ripple](#Driver.Ripple) ⇐ [<code>Driver</code>](#Driver)
            * [.fetchTotalSupply()](#Driver.Ripple+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
            * [.fetchCirculatingSupply()](#Driver.Ripple+fetchCirculatingSupply) ⇐ [<code>fetchCirculatingSupply</code>](#Driver.fetchCirculatingSupply)
            * [.fetchMaxSupply()](#Driver.Ripple+fetchMaxSupply) ⇐ [<code>fetchMaxSupply</code>](#Driver.fetchMaxSupply)
            * [.getSupply()](#Driver.Ripple+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)
        * [~SmartHoldem](#Driver.SmartHoldem) ⇐ [<code>Driver</code>](#Driver)
            * [.fetchTotalSupply()](#Driver.SmartHoldem+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
            * [.fetchBalance(modifier)](#Driver.SmartHoldem+fetchBalance) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
            * [.getSupply(modifiers)](#Driver.SmartHoldem+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)
        * [~Waves](#Driver.Waves) ⇐ [<code>Driver</code>](#Driver)
            * [.fetchTotalSupply()](#Driver.Waves+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
            * [.fetchTokenTotalSupply(reference)](#Driver.Waves+fetchTokenTotalSupply) ⇐ [<code>fetchTokenTotalSupply</code>](#Driver.fetchTokenTotalSupply)
            * [.fetchBalance(modifier)](#Driver.Waves+fetchBalance) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
            * [.fetchTokenBalance(reference, modifier)](#Driver.Waves+fetchTokenBalance) ⇐ [<code>fetchTokenBalance</code>](#Driver.fetchTokenBalance)
            * [.getSupply(coin)](#Driver.Waves+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)
        * [~Xaya](#Driver.Xaya) ⇐ [<code>Driver</code>](#Driver)
            * [.fetchTotalSupply()](#Driver.Xaya+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
            * [.fetchBalance(modifier)](#Driver.Xaya+fetchBalance) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
            * [.getSupply(modifiers)](#Driver.Xaya+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)

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
Fetch the balance.

**Kind**: static namespace of [<code>Driver</code>](#Driver)  
**Returns**: <code>number</code> - Amount on a specific address.  
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

### Driver.getSupply ⇒ [<code>Promise.&lt;Supply&gt;</code>](#Model.Supply)
Drivers must include a getSupplies method. This method will call supported supply data
such as methods to fetch total, circulating and max supply.

**Kind**: static namespace of [<code>Driver</code>](#Driver)  
**Returns**: [<code>Promise.&lt;Supply&gt;</code>](#Model.Supply) - Returns a promise of a supply model.  

| Param | Type | Description |
| --- | --- | --- |
| [coin] | [<code>Coin</code>](#Model.Coin) | The getSupply method gets called with an [coin instance](#Model.Coin). |

<a name="Driver.Bare"></a>

### Driver~Bare ⇐ [<code>Driver</code>](#Driver)
Bare driver. Supports total supply and balance
for specific wallet address for native token GMT on
Bare blockchain.

**Kind**: inner class of [<code>Driver</code>](#Driver)  
**Extends**: [<code>Driver</code>](#Driver)  

* [~Bare](#Driver.Bare) ⇐ [<code>Driver</code>](#Driver)
    * [.fetchTotalSupply()](#Driver.Bare+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
    * [.fetchBalance(modifier)](#Driver.Bare+fetchBalance) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
    * [.getSupply(modifiers)](#Driver.Bare+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)

<a name="Driver.Bare+fetchTotalSupply"></a>

#### bare.fetchTotalSupply() ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
get total supply for native token

**Kind**: instance method of [<code>Bare</code>](#Driver.Bare)  
**Extends**: [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)  
<a name="Driver.Bare+fetchBalance"></a>

#### bare.fetchBalance(modifier) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
get balance for specific wallet address

**Kind**: instance method of [<code>Bare</code>](#Driver.Bare)  
**Extends**: [<code>fetchBalance</code>](#Driver.fetchBalance)  

| Param | Type | Description |
| --- | --- | --- |
| modifier | [<code>modifierParam</code>](#modifierParam) | [modifierParam](#modifierParam) |

<a name="Driver.Bare+getSupply"></a>

#### bare.getSupply(modifiers) ⇐ [<code>getSupply</code>](#Driver.getSupply)
get supply

**Kind**: instance method of [<code>Bare</code>](#Driver.Bare)  
**Extends**: [<code>getSupply</code>](#Driver.getSupply)  

| Param | Type | Description |
| --- | --- | --- |
| modifiers | [<code>Array.&lt;modifierParam&gt;</code>](#modifierParam) | {@link } |

<a name="Driver.BlockchainInfo"></a>

### Driver~BlockchainInfo ⇐ [<code>Driver</code>](#Driver)
BlockchainInfo driver. Supports circulating and max supply for BTC.

**Kind**: inner class of [<code>Driver</code>](#Driver)  
**Extends**: [<code>Driver</code>](#Driver)  

* [~BlockchainInfo](#Driver.BlockchainInfo) ⇐ [<code>Driver</code>](#Driver)
    * [.fetchTotalSupply()](#Driver.BlockchainInfo+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
    * [.fetchCirculatingSupply()](#Driver.BlockchainInfo+fetchCirculatingSupply) ⇐ [<code>fetchCirculatingSupply</code>](#Driver.fetchCirculatingSupply)
    * [.fetchMaxSupply()](#Driver.BlockchainInfo+fetchMaxSupply) ⇐ [<code>fetchMaxSupply</code>](#Driver.fetchMaxSupply)
    * [.getSupply()](#Driver.BlockchainInfo+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)

<a name="Driver.BlockchainInfo+fetchTotalSupply"></a>

#### blockchainInfo.fetchTotalSupply() ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
**Kind**: instance method of [<code>BlockchainInfo</code>](#Driver.BlockchainInfo)  
**Extends**: [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)  
<a name="Driver.BlockchainInfo+fetchCirculatingSupply"></a>

#### blockchainInfo.fetchCirculatingSupply() ⇐ [<code>fetchCirculatingSupply</code>](#Driver.fetchCirculatingSupply)
**Kind**: instance method of [<code>BlockchainInfo</code>](#Driver.BlockchainInfo)  
**Extends**: [<code>fetchCirculatingSupply</code>](#Driver.fetchCirculatingSupply)  
<a name="Driver.BlockchainInfo+fetchMaxSupply"></a>

#### blockchainInfo.fetchMaxSupply() ⇐ [<code>fetchMaxSupply</code>](#Driver.fetchMaxSupply)
**Kind**: instance method of [<code>BlockchainInfo</code>](#Driver.BlockchainInfo)  
**Extends**: [<code>fetchMaxSupply</code>](#Driver.fetchMaxSupply)  
<a name="Driver.BlockchainInfo+getSupply"></a>

#### blockchainInfo.getSupply() ⇐ [<code>getSupply</code>](#Driver.getSupply)
**Kind**: instance method of [<code>BlockchainInfo</code>](#Driver.BlockchainInfo)  
**Extends**: [<code>getSupply</code>](#Driver.getSupply)  
<a name="Driver.BlockchairBitcoinCash"></a>

### Driver~BlockchairBitcoinCash ⇐ [<code>Driver</code>](#Driver)
Blockchair driver. Supports total suplpy and balance
for native token on Bitcoin Cash blockchain.

**Kind**: inner class of [<code>Driver</code>](#Driver)  
**Extends**: [<code>Driver</code>](#Driver)  

* [~BlockchairBitcoinCash](#Driver.BlockchairBitcoinCash) ⇐ [<code>Driver</code>](#Driver)
    * [.fetchTotalSupply()](#Driver.BlockchairBitcoinCash+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
    * [.fetchBalance(modifier)](#Driver.BlockchairBitcoinCash+fetchBalance) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
    * [.getSupply(modifiers)](#Driver.BlockchairBitcoinCash+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)

<a name="Driver.BlockchairBitcoinCash+fetchTotalSupply"></a>

#### blockchairBitcoinCash.fetchTotalSupply() ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
get total supply for native token

**Kind**: instance method of [<code>BlockchairBitcoinCash</code>](#Driver.BlockchairBitcoinCash)  
**Extends**: [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)  
<a name="Driver.BlockchairBitcoinCash+fetchBalance"></a>

#### blockchairBitcoinCash.fetchBalance(modifier) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
get balance value for specific wallet address

**Kind**: instance method of [<code>BlockchairBitcoinCash</code>](#Driver.BlockchairBitcoinCash)  
**Extends**: [<code>fetchBalance</code>](#Driver.fetchBalance)  

| Param | Type | Description |
| --- | --- | --- |
| modifier | [<code>modifierParam</code>](#modifierParam) | [modifierParam](#modifierParam) |

<a name="Driver.BlockchairBitcoinCash+getSupply"></a>

#### blockchairBitcoinCash.getSupply(modifiers) ⇐ [<code>getSupply</code>](#Driver.getSupply)
**Kind**: instance method of [<code>BlockchairBitcoinCash</code>](#Driver.BlockchairBitcoinCash)  
**Extends**: [<code>getSupply</code>](#Driver.getSupply)  

| Param | Type | Description |
| --- | --- | --- |
| modifiers | [<code>Array.&lt;modifierParam&gt;</code>](#modifierParam) | [modifierParam](#modifierParam) |

<a name="Driver.BlockchairLitecoin"></a>

### Driver~BlockchairLitecoin ⇐ [<code>Driver</code>](#Driver)
Blockchair driver. Supports total suplpy and balance
for native token on Litecoin blockchain.

**Kind**: inner class of [<code>Driver</code>](#Driver)  
**Extends**: [<code>Driver</code>](#Driver)  

* [~BlockchairLitecoin](#Driver.BlockchairLitecoin) ⇐ [<code>Driver</code>](#Driver)
    * [.fetchTotalSupply()](#Driver.BlockchairLitecoin+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
    * [.fetchBalance(modifier)](#Driver.BlockchairLitecoin+fetchBalance) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
    * [.getSupply(modifiers)](#Driver.BlockchairLitecoin+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)

<a name="Driver.BlockchairLitecoin+fetchTotalSupply"></a>

#### blockchairLitecoin.fetchTotalSupply() ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
get total supply for native token

**Kind**: instance method of [<code>BlockchairLitecoin</code>](#Driver.BlockchairLitecoin)  
**Extends**: [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)  
<a name="Driver.BlockchairLitecoin+fetchBalance"></a>

#### blockchairLitecoin.fetchBalance(modifier) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
get balance value for specific wallet address

**Kind**: instance method of [<code>BlockchairLitecoin</code>](#Driver.BlockchairLitecoin)  
**Extends**: [<code>fetchBalance</code>](#Driver.fetchBalance)  

| Param | Type | Description |
| --- | --- | --- |
| modifier | [<code>modifierParam</code>](#modifierParam) | [modifierParam](#modifierParam) |

<a name="Driver.BlockchairLitecoin+getSupply"></a>

#### blockchairLitecoin.getSupply(modifiers) ⇐ [<code>getSupply</code>](#Driver.getSupply)
**Kind**: instance method of [<code>BlockchairLitecoin</code>](#Driver.BlockchairLitecoin)  
**Extends**: [<code>getSupply</code>](#Driver.getSupply)  

| Param | Type | Description |
| --- | --- | --- |
| modifiers | [<code>Array.&lt;modifierParam&gt;</code>](#modifierParam) | [modifierParam](#modifierParam) |

<a name="Driver.BlocksEos"></a>

### Driver~BlocksEos ⇐ [<code>Driver</code>](#Driver)
Blocks explorer. Supports total and max supply
for EOS token.

**Kind**: inner class of [<code>Driver</code>](#Driver)  
**Extends**: [<code>Driver</code>](#Driver)  

* [~BlocksEos](#Driver.BlocksEos) ⇐ [<code>Driver</code>](#Driver)
    * [.fetchTotalSupply()](#Driver.BlocksEos+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
    * [.fetchMaxSupply()](#Driver.BlocksEos+fetchMaxSupply) ⇐ [<code>fetchMaxSupply</code>](#Driver.fetchMaxSupply)

<a name="Driver.BlocksEos+fetchTotalSupply"></a>

#### blocksEos.fetchTotalSupply() ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
get total supply for native token

**Kind**: instance method of [<code>BlocksEos</code>](#Driver.BlocksEos)  
**Extends**: [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)  
<a name="Driver.BlocksEos+fetchMaxSupply"></a>

#### blocksEos.fetchMaxSupply() ⇐ [<code>fetchMaxSupply</code>](#Driver.fetchMaxSupply)
get max total supply for native token

**Kind**: instance method of [<code>BlocksEos</code>](#Driver.BlocksEos)  
**Extends**: [<code>fetchMaxSupply</code>](#Driver.fetchMaxSupply)  
<a name="Driver.BridgeLto"></a>

### Driver~BridgeLto ⇐ [<code>Driver</code>](#Driver)
BridgeLto token base on LTO Network. Supports total
supply, circulating and balance for native token.

**Kind**: inner class of [<code>Driver</code>](#Driver)  
**Extends**: [<code>Driver</code>](#Driver)  

* [~BridgeLto](#Driver.BridgeLto) ⇐ [<code>Driver</code>](#Driver)
    * [.fetchTotalSupply()](#Driver.BridgeLto+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
    * [.fetchBalance(modifier)](#Driver.BridgeLto+fetchBalance) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
    * [.getSupply(modifiers)](#Driver.BridgeLto+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)

<a name="Driver.BridgeLto+fetchTotalSupply"></a>

#### bridgeLto.fetchTotalSupply() ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
get total supply for native token

**Kind**: instance method of [<code>BridgeLto</code>](#Driver.BridgeLto)  
**Extends**: [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)  
<a name="Driver.BridgeLto+fetchBalance"></a>

#### bridgeLto.fetchBalance(modifier) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
get balance for specific wallet address

**Kind**: instance method of [<code>BridgeLto</code>](#Driver.BridgeLto)  
**Extends**: [<code>fetchBalance</code>](#Driver.fetchBalance)  

| Param | Type | Description |
| --- | --- | --- |
| modifier | [<code>modifierParam</code>](#modifierParam) | [modifierParam](#modifierParam) |

<a name="Driver.BridgeLto+getSupply"></a>

#### bridgeLto.getSupply(modifiers) ⇐ [<code>getSupply</code>](#Driver.getSupply)
**Kind**: instance method of [<code>BridgeLto</code>](#Driver.BridgeLto)  
**Extends**: [<code>getSupply</code>](#Driver.getSupply)  

| Param | Type | Description |
| --- | --- | --- |
| modifiers | [<code>Array.&lt;modifierParam&gt;</code>](#modifierParam) | [modifierParam](#modifierParam) |

<a name="Driver.CardanoExplorer"></a>

### Driver~CardanoExplorer ⇐ [<code>Driver</code>](#Driver)
Cardano explorer driver.

**Kind**: inner class of [<code>Driver</code>](#Driver)  
**Extends**: [<code>Driver</code>](#Driver)  

* [~CardanoExplorer](#Driver.CardanoExplorer) ⇐ [<code>Driver</code>](#Driver)
    * [.fetchTotalSupply()](#Driver.CardanoExplorer+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
    * [.fetchBalance(modifier)](#Driver.CardanoExplorer+fetchBalance) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
    * [.getSupply(coin)](#Driver.CardanoExplorer+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)

<a name="Driver.CardanoExplorer+fetchTotalSupply"></a>

#### cardanoExplorer.fetchTotalSupply() ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
**Kind**: instance method of [<code>CardanoExplorer</code>](#Driver.CardanoExplorer)  
**Extends**: [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)  
<a name="Driver.CardanoExplorer+fetchBalance"></a>

#### cardanoExplorer.fetchBalance(modifier) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
**Kind**: instance method of [<code>CardanoExplorer</code>](#Driver.CardanoExplorer)  
**Extends**: [<code>fetchBalance</code>](#Driver.fetchBalance)  

| Param | Type | Description |
| --- | --- | --- |
| modifier | [<code>modifierParam</code>](#modifierParam) | [modifierParam](#modifierParam) |

<a name="Driver.CardanoExplorer+getSupply"></a>

#### cardanoExplorer.getSupply(coin) ⇐ [<code>getSupply</code>](#Driver.getSupply)
**Kind**: instance method of [<code>CardanoExplorer</code>](#Driver.CardanoExplorer)  
**Extends**: [<code>getSupply</code>](#Driver.getSupply)  

| Param | Type | Description |
| --- | --- | --- |
| coin | [<code>coinParam</code>](#coinParam) | [coinParam](#coinParam) |

<a name="Driver.ChainNemNinja"></a>

### Driver~ChainNemNinja ⇐ [<code>Driver</code>](#Driver)
Chain Nem Ninja / Nembex driver.

**Kind**: inner class of [<code>Driver</code>](#Driver)  
**Extends**: [<code>Driver</code>](#Driver)  

* [~ChainNemNinja](#Driver.ChainNemNinja) ⇐ [<code>Driver</code>](#Driver)
    * [.fetchTotalSupply()](#Driver.ChainNemNinja+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
    * [.fetchMaxSupply()](#Driver.ChainNemNinja+fetchMaxSupply) ⇐ [<code>fetchMaxSupply</code>](#Driver.fetchMaxSupply)
    * [.fetchBalance(modifier)](#Driver.ChainNemNinja+fetchBalance) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
    * [.getSupply(coin)](#Driver.ChainNemNinja+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)

<a name="Driver.ChainNemNinja+fetchTotalSupply"></a>

#### chainNemNinja.fetchTotalSupply() ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
**Kind**: instance method of [<code>ChainNemNinja</code>](#Driver.ChainNemNinja)  
**Extends**: [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)  
<a name="Driver.ChainNemNinja+fetchMaxSupply"></a>

#### chainNemNinja.fetchMaxSupply() ⇐ [<code>fetchMaxSupply</code>](#Driver.fetchMaxSupply)
**Kind**: instance method of [<code>ChainNemNinja</code>](#Driver.ChainNemNinja)  
**Extends**: [<code>fetchMaxSupply</code>](#Driver.fetchMaxSupply)  
<a name="Driver.ChainNemNinja+fetchBalance"></a>

#### chainNemNinja.fetchBalance(modifier) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
**Kind**: instance method of [<code>ChainNemNinja</code>](#Driver.ChainNemNinja)  
**Extends**: [<code>fetchBalance</code>](#Driver.fetchBalance)  

| Param | Type | Description |
| --- | --- | --- |
| modifier | [<code>modifierParam</code>](#modifierParam) | [modifierParam](#modifierParam) |

<a name="Driver.ChainNemNinja+getSupply"></a>

#### chainNemNinja.getSupply(coin) ⇐ [<code>getSupply</code>](#Driver.getSupply)
**Kind**: instance method of [<code>ChainNemNinja</code>](#Driver.ChainNemNinja)  
**Extends**: [<code>getSupply</code>](#Driver.getSupply)  

| Param | Type | Description |
| --- | --- | --- |
| coin | [<code>coinParam</code>](#coinParam) | [coinParam](#coinParam) |

<a name="Driver.CryptoidDash"></a>

### Driver~CryptoidDash ⇐ [<code>Driver</code>](#Driver)
Cryptoid Dash driver.

**Kind**: inner class of [<code>Driver</code>](#Driver)  
**Extends**: [<code>Driver</code>](#Driver)  

* [~CryptoidDash](#Driver.CryptoidDash) ⇐ [<code>Driver</code>](#Driver)
    * [.fetchTotalSupply()](#Driver.CryptoidDash+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
    * [.fetchCirculatingSupply()](#Driver.CryptoidDash+fetchCirculatingSupply) ⇐ [<code>fetchCirculatingSupply</code>](#Driver.fetchCirculatingSupply)
    * [.getSupply()](#Driver.CryptoidDash+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)

<a name="Driver.CryptoidDash+fetchTotalSupply"></a>

#### cryptoidDash.fetchTotalSupply() ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
**Kind**: instance method of [<code>CryptoidDash</code>](#Driver.CryptoidDash)  
**Extends**: [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)  
<a name="Driver.CryptoidDash+fetchCirculatingSupply"></a>

#### cryptoidDash.fetchCirculatingSupply() ⇐ [<code>fetchCirculatingSupply</code>](#Driver.fetchCirculatingSupply)
**Kind**: instance method of [<code>CryptoidDash</code>](#Driver.CryptoidDash)  
**Extends**: [<code>fetchCirculatingSupply</code>](#Driver.fetchCirculatingSupply)  
<a name="Driver.CryptoidDash+getSupply"></a>

#### cryptoidDash.getSupply() ⇐ [<code>getSupply</code>](#Driver.getSupply)
**Kind**: instance method of [<code>CryptoidDash</code>](#Driver.CryptoidDash)  
**Extends**: [<code>getSupply</code>](#Driver.getSupply)  
<a name="Driver.DiaEthereumClassic"></a>

### Driver~DiaEthereumClassic ⇐ [<code>Driver</code>](#Driver)
DiaEthereumClassic driver. Supports total supply
for native token based on Ethereum blockchain.

**Kind**: inner class of [<code>Driver</code>](#Driver)  
**Extends**: [<code>Driver</code>](#Driver)  

* [~DiaEthereumClassic](#Driver.DiaEthereumClassic) ⇐ [<code>Driver</code>](#Driver)
    * [.fetchCirculatingSupply()](#Driver.DiaEthereumClassic+fetchCirculatingSupply) ⇐ [<code>fetchCirculatingSupply</code>](#Driver.fetchCirculatingSupply)
    * [.getSupply()](#Driver.DiaEthereumClassic+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)

<a name="Driver.DiaEthereumClassic+fetchCirculatingSupply"></a>

#### diaEthereumClassic.fetchCirculatingSupply() ⇐ [<code>fetchCirculatingSupply</code>](#Driver.fetchCirculatingSupply)
get total supply for

**Kind**: instance method of [<code>DiaEthereumClassic</code>](#Driver.DiaEthereumClassic)  
**Extends**: [<code>fetchCirculatingSupply</code>](#Driver.fetchCirculatingSupply)  
<a name="Driver.DiaEthereumClassic+getSupply"></a>

#### diaEthereumClassic.getSupply() ⇐ [<code>getSupply</code>](#Driver.getSupply)
**Kind**: instance method of [<code>DiaEthereumClassic</code>](#Driver.DiaEthereumClassic)  
**Extends**: [<code>getSupply</code>](#Driver.getSupply)  
<a name="Driver.DogeChain"></a>

### Driver~DogeChain ⇐ [<code>Driver</code>](#Driver)
Dogechain driver.

**Kind**: inner class of [<code>Driver</code>](#Driver)  
**Extends**: [<code>Driver</code>](#Driver)  

* [~DogeChain](#Driver.DogeChain) ⇐ [<code>Driver</code>](#Driver)
    * [.fetchTotalSupply()](#Driver.DogeChain+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
    * [.fetchCirculatingSupply()](#Driver.DogeChain+fetchCirculatingSupply) ⇐ [<code>fetchCirculatingSupply</code>](#Driver.fetchCirculatingSupply)
    * [.getSupply()](#Driver.DogeChain+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)

<a name="Driver.DogeChain+fetchTotalSupply"></a>

#### dogeChain.fetchTotalSupply() ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
**Kind**: instance method of [<code>DogeChain</code>](#Driver.DogeChain)  
**Extends**: [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)  
<a name="Driver.DogeChain+fetchCirculatingSupply"></a>

#### dogeChain.fetchCirculatingSupply() ⇐ [<code>fetchCirculatingSupply</code>](#Driver.fetchCirculatingSupply)
**Kind**: instance method of [<code>DogeChain</code>](#Driver.DogeChain)  
**Extends**: [<code>fetchCirculatingSupply</code>](#Driver.fetchCirculatingSupply)  
<a name="Driver.DogeChain+getSupply"></a>

#### dogeChain.getSupply() ⇐ [<code>getSupply</code>](#Driver.getSupply)
**Kind**: instance method of [<code>DogeChain</code>](#Driver.DogeChain)  
**Extends**: [<code>getSupply</code>](#Driver.getSupply)  
<a name="Driver.Etherscan"></a>

### Driver~Etherscan ⇐ [<code>Driver</code>](#Driver)
Etherscan driver. Supports circulating and total supply for ethereum and
tokens on the ethereum blockchain.

**Kind**: inner class of [<code>Driver</code>](#Driver)  
**Extends**: [<code>Driver</code>](#Driver)  

* [~Etherscan](#Driver.Etherscan) ⇐ [<code>Driver</code>](#Driver)
    * [.fetchTotalSupply()](#Driver.Etherscan+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
    * [.fetchBalance(modifier)](#Driver.Etherscan+fetchBalance) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
    * [.fetchTokenTotalSupply(reference, decimals)](#Driver.Etherscan+fetchTokenTotalSupply) ⇐ [<code>fetchTokenTotalSupply</code>](#Driver.fetchTokenTotalSupply)
    * [.fetchTokenBalance(reference, modifier, decimals)](#Driver.Etherscan+fetchTokenBalance) ⇐ [<code>fetchTokenBalance</code>](#Driver.fetchTokenBalance)
    * [.getSupply(coin)](#Driver.Etherscan+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)

<a name="Driver.Etherscan+fetchTotalSupply"></a>

#### etherscan.fetchTotalSupply() ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
**Kind**: instance method of [<code>Etherscan</code>](#Driver.Etherscan)  
**Extends**: [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)  
<a name="Driver.Etherscan+fetchBalance"></a>

#### etherscan.fetchBalance(modifier) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
**Kind**: instance method of [<code>Etherscan</code>](#Driver.Etherscan)  
**Extends**: [<code>fetchBalance</code>](#Driver.fetchBalance)  

| Param | Type | Description |
| --- | --- | --- |
| modifier | [<code>modifierParam</code>](#modifierParam) | [modifierParam](#modifierParam) |

<a name="Driver.Etherscan+fetchTokenTotalSupply"></a>

#### etherscan.fetchTokenTotalSupply(reference, decimals) ⇐ [<code>fetchTokenTotalSupply</code>](#Driver.fetchTokenTotalSupply)
**Kind**: instance method of [<code>Etherscan</code>](#Driver.Etherscan)  
**Extends**: [<code>fetchTokenTotalSupply</code>](#Driver.fetchTokenTotalSupply)  

| Param | Type | Description |
| --- | --- | --- |
| reference | [<code>referenceParam</code>](#referenceParam) | [referenceParam](#referenceParam) |
| decimals | [<code>decimalsParam</code>](#decimalsParam) | [decimalsParam](#decimalsParam) |

<a name="Driver.Etherscan+fetchTokenBalance"></a>

#### etherscan.fetchTokenBalance(reference, modifier, decimals) ⇐ [<code>fetchTokenBalance</code>](#Driver.fetchTokenBalance)
**Kind**: instance method of [<code>Etherscan</code>](#Driver.Etherscan)  
**Extends**: [<code>fetchTokenBalance</code>](#Driver.fetchTokenBalance)  

| Param | Type | Description |
| --- | --- | --- |
| reference | [<code>referenceParam</code>](#referenceParam) | [referenceParam](#referenceParam) |
| modifier | [<code>modifierParam</code>](#modifierParam) | [modifierParam](#modifierParam) |
| decimals | [<code>decimalsParam</code>](#decimalsParam) | [decimalsParam](#decimalsParam) |

<a name="Driver.Etherscan+getSupply"></a>

#### etherscan.getSupply(coin) ⇐ [<code>getSupply</code>](#Driver.getSupply)
**Kind**: instance method of [<code>Etherscan</code>](#Driver.Etherscan)  
**Extends**: [<code>getSupply</code>](#Driver.getSupply)  

| Param | Type | Description |
| --- | --- | --- |
| coin | [<code>coinParam</code>](#coinParam) | [coinParam](#coinParam) |

<a name="Driver.Helpico"></a>

### Driver~Helpico ⇐ [<code>Driver</code>](#Driver)
Helpico driver. Supports total supply and balance
for specific wallet address for native token GMT on
Helpico blockchain.

**Kind**: inner class of [<code>Driver</code>](#Driver)  
**Extends**: [<code>Driver</code>](#Driver)  

* [~Helpico](#Driver.Helpico) ⇐ [<code>Driver</code>](#Driver)
    * [.fetchTotalSupply()](#Driver.Helpico+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
    * [.fetchBalance(modifier)](#Driver.Helpico+fetchBalance) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
    * [.getSupply(modifiers)](#Driver.Helpico+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)

<a name="Driver.Helpico+fetchTotalSupply"></a>

#### helpico.fetchTotalSupply() ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
get total supply for native token

**Kind**: instance method of [<code>Helpico</code>](#Driver.Helpico)  
**Extends**: [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)  
<a name="Driver.Helpico+fetchBalance"></a>

#### helpico.fetchBalance(modifier) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
get balance for specific wallet address

**Kind**: instance method of [<code>Helpico</code>](#Driver.Helpico)  
**Extends**: [<code>fetchBalance</code>](#Driver.fetchBalance)  

| Param | Type | Description |
| --- | --- | --- |
| modifier | [<code>modifierParam</code>](#modifierParam) | [modifierParam](#modifierParam) |

<a name="Driver.Helpico+getSupply"></a>

#### helpico.getSupply(modifiers) ⇐ [<code>getSupply</code>](#Driver.getSupply)
get supply

**Kind**: instance method of [<code>Helpico</code>](#Driver.Helpico)  
**Extends**: [<code>getSupply</code>](#Driver.getSupply)  

| Param | Type | Description |
| --- | --- | --- |
| modifiers | [<code>Array.&lt;modifierParam&gt;</code>](#modifierParam) | {@link } |

<a name="Driver.Lisk"></a>

### Driver~Lisk ⇐ [<code>Driver</code>](#Driver)
Lisk driver.

**Kind**: inner class of [<code>Driver</code>](#Driver)  
**Extends**: [<code>Driver</code>](#Driver)  

* [~Lisk](#Driver.Lisk) ⇐ [<code>Driver</code>](#Driver)
    * [.fetchTotalSupply()](#Driver.Lisk+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
    * [.fetchBalance(modifier)](#Driver.Lisk+fetchBalance) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
    * [.getSupply(coin)](#Driver.Lisk+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)

<a name="Driver.Lisk+fetchTotalSupply"></a>

#### lisk.fetchTotalSupply() ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
**Kind**: instance method of [<code>Lisk</code>](#Driver.Lisk)  
**Extends**: [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)  
<a name="Driver.Lisk+fetchBalance"></a>

#### lisk.fetchBalance(modifier) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
**Kind**: instance method of [<code>Lisk</code>](#Driver.Lisk)  
**Extends**: [<code>fetchBalance</code>](#Driver.fetchBalance)  

| Param | Type | Description |
| --- | --- | --- |
| modifier | [<code>modifierParam</code>](#modifierParam) | [modifierParam](#modifierParam) |

<a name="Driver.Lisk+getSupply"></a>

#### lisk.getSupply(coin) ⇐ [<code>getSupply</code>](#Driver.getSupply)
**Kind**: instance method of [<code>Lisk</code>](#Driver.Lisk)  
**Extends**: [<code>getSupply</code>](#Driver.getSupply)  

| Param | Type | Description |
| --- | --- | --- |
| coin | [<code>coinParam</code>](#coinParam) | [coinParam](#coinParam) |

<a name="Driver.LitecoinNet"></a>

### Driver~LitecoinNet ⇐ [<code>Driver</code>](#Driver)
LitecoinNet driver.

**Kind**: inner class of [<code>Driver</code>](#Driver)  
**Extends**: [<code>Driver</code>](#Driver)  

* [~LitecoinNet](#Driver.LitecoinNet) ⇐ [<code>Driver</code>](#Driver)
    * [.fetchTotalSupply()](#Driver.LitecoinNet+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
    * [.fetchCirculatingSupply()](#Driver.LitecoinNet+fetchCirculatingSupply) ⇐ [<code>fetchCirculatingSupply</code>](#Driver.fetchCirculatingSupply)
    * [.fetchMaxSupply()](#Driver.LitecoinNet+fetchMaxSupply) ⇐ [<code>fetchMaxSupply</code>](#Driver.fetchMaxSupply)
    * [.getSupply()](#Driver.LitecoinNet+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)

<a name="Driver.LitecoinNet+fetchTotalSupply"></a>

#### litecoinNet.fetchTotalSupply() ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
**Kind**: instance method of [<code>LitecoinNet</code>](#Driver.LitecoinNet)  
**Extends**: [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)  
<a name="Driver.LitecoinNet+fetchCirculatingSupply"></a>

#### litecoinNet.fetchCirculatingSupply() ⇐ [<code>fetchCirculatingSupply</code>](#Driver.fetchCirculatingSupply)
**Kind**: instance method of [<code>LitecoinNet</code>](#Driver.LitecoinNet)  
**Extends**: [<code>fetchCirculatingSupply</code>](#Driver.fetchCirculatingSupply)  
<a name="Driver.LitecoinNet+fetchMaxSupply"></a>

#### litecoinNet.fetchMaxSupply() ⇐ [<code>fetchMaxSupply</code>](#Driver.fetchMaxSupply)
**Kind**: instance method of [<code>LitecoinNet</code>](#Driver.LitecoinNet)  
**Extends**: [<code>fetchMaxSupply</code>](#Driver.fetchMaxSupply)  
<a name="Driver.LitecoinNet+getSupply"></a>

#### litecoinNet.getSupply() ⇐ [<code>getSupply</code>](#Driver.getSupply)
**Kind**: instance method of [<code>LitecoinNet</code>](#Driver.LitecoinNet)  
**Extends**: [<code>getSupply</code>](#Driver.getSupply)  
<a name="Driver.MoneroBlocks"></a>

### Driver~MoneroBlocks ⇐ [<code>Driver</code>](#Driver)
MoneroBlocks driver.

**Kind**: inner class of [<code>Driver</code>](#Driver)  
**Extends**: [<code>Driver</code>](#Driver)  

* [~MoneroBlocks](#Driver.MoneroBlocks) ⇐ [<code>Driver</code>](#Driver)
    * [.fetchTotalSupply()](#Driver.MoneroBlocks+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
    * [.fetchCirculatingSupply()](#Driver.MoneroBlocks+fetchCirculatingSupply) ⇐ [<code>fetchCirculatingSupply</code>](#Driver.fetchCirculatingSupply)
    * [.getSupply()](#Driver.MoneroBlocks+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)

<a name="Driver.MoneroBlocks+fetchTotalSupply"></a>

#### moneroBlocks.fetchTotalSupply() ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
**Kind**: instance method of [<code>MoneroBlocks</code>](#Driver.MoneroBlocks)  
**Extends**: [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)  
<a name="Driver.MoneroBlocks+fetchCirculatingSupply"></a>

#### moneroBlocks.fetchCirculatingSupply() ⇐ [<code>fetchCirculatingSupply</code>](#Driver.fetchCirculatingSupply)
**Kind**: instance method of [<code>MoneroBlocks</code>](#Driver.MoneroBlocks)  
**Extends**: [<code>fetchCirculatingSupply</code>](#Driver.fetchCirculatingSupply)  
<a name="Driver.MoneroBlocks+getSupply"></a>

#### moneroBlocks.getSupply() ⇐ [<code>getSupply</code>](#Driver.getSupply)
**Kind**: instance method of [<code>MoneroBlocks</code>](#Driver.MoneroBlocks)  
**Extends**: [<code>getSupply</code>](#Driver.getSupply)  
<a name="Driver.NeoScan"></a>

### Driver~NeoScan ⇐ [<code>Driver</code>](#Driver)
NeoScan driver.

**Kind**: inner class of [<code>Driver</code>](#Driver)  
**Extends**: [<code>Driver</code>](#Driver)  

* [~NeoScan](#Driver.NeoScan) ⇐ [<code>Driver</code>](#Driver)
    * [.fetchTotalSupply()](#Driver.NeoScan+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
    * [.fetchBalance(modifier)](#Driver.NeoScan+fetchBalance) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
    * [.fetchTokenTotalSupply(reference)](#Driver.NeoScan+fetchTokenTotalSupply) ⇐ [<code>fetchTokenTotalSupply</code>](#Driver.fetchTokenTotalSupply)
    * [.fetchTokenBalance(reference, modifier)](#Driver.NeoScan+fetchTokenBalance) ⇐ [<code>fetchTokenBalance</code>](#Driver.fetchTokenBalance)
    * [.getSupply(coin)](#Driver.NeoScan+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)

<a name="Driver.NeoScan+fetchTotalSupply"></a>

#### neoScan.fetchTotalSupply() ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
**Kind**: instance method of [<code>NeoScan</code>](#Driver.NeoScan)  
**Extends**: [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)  
<a name="Driver.NeoScan+fetchBalance"></a>

#### neoScan.fetchBalance(modifier) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
**Kind**: instance method of [<code>NeoScan</code>](#Driver.NeoScan)  
**Extends**: [<code>fetchBalance</code>](#Driver.fetchBalance)  

| Param | Type | Description |
| --- | --- | --- |
| modifier | [<code>modifierParam</code>](#modifierParam) | [modifierParam](#modifierParam) |

<a name="Driver.NeoScan+fetchTokenTotalSupply"></a>

#### neoScan.fetchTokenTotalSupply(reference) ⇐ [<code>fetchTokenTotalSupply</code>](#Driver.fetchTokenTotalSupply)
**Kind**: instance method of [<code>NeoScan</code>](#Driver.NeoScan)  
**Extends**: [<code>fetchTokenTotalSupply</code>](#Driver.fetchTokenTotalSupply)  

| Param | Type | Description |
| --- | --- | --- |
| reference | [<code>referenceParam</code>](#referenceParam) | [referenceParam](#referenceParam) |

<a name="Driver.NeoScan+fetchTokenBalance"></a>

#### neoScan.fetchTokenBalance(reference, modifier) ⇐ [<code>fetchTokenBalance</code>](#Driver.fetchTokenBalance)
**Kind**: instance method of [<code>NeoScan</code>](#Driver.NeoScan)  
**Extends**: [<code>fetchTokenBalance</code>](#Driver.fetchTokenBalance)  

| Param | Type | Description |
| --- | --- | --- |
| reference | [<code>referenceParam</code>](#referenceParam) | [referenceParam](#referenceParam) |
| modifier | [<code>modifierParam</code>](#modifierParam) | [modifierParam](#modifierParam) |

<a name="Driver.NeoScan+getSupply"></a>

#### neoScan.getSupply(coin) ⇐ [<code>getSupply</code>](#Driver.getSupply)
**Kind**: instance method of [<code>NeoScan</code>](#Driver.NeoScan)  
**Extends**: [<code>getSupply</code>](#Driver.getSupply)  

| Param | Type | Description |
| --- | --- | --- |
| coin | [<code>coinParam</code>](#coinParam) | [coinParam](#coinParam) |

<a name="Driver.OmniExplorer"></a>

### Driver~OmniExplorer ⇐ [<code>Driver</code>](#Driver)
Omniexplorer driver. Supports circulating and max supply for tokens.

**Kind**: inner class of [<code>Driver</code>](#Driver)  
**Extends**: [<code>Driver</code>](#Driver)  

* [~OmniExplorer](#Driver.OmniExplorer) ⇐ [<code>Driver</code>](#Driver)
    * [.fetchTotalSupply()](#Driver.OmniExplorer+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
    * [.fetchBalance(modifier)](#Driver.OmniExplorer+fetchBalance) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
    * [.fetchTokenTotalSupply(reference)](#Driver.OmniExplorer+fetchTokenTotalSupply) ⇐ [<code>fetchTokenTotalSupply</code>](#Driver.fetchTokenTotalSupply)
    * [.fetchTokenBalance(reference, modifier)](#Driver.OmniExplorer+fetchTokenBalance) ⇐ [<code>fetchTokenBalance</code>](#Driver.fetchTokenBalance)
    * [.getSupply(coin)](#Driver.OmniExplorer+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)

<a name="Driver.OmniExplorer+fetchTotalSupply"></a>

#### omniExplorer.fetchTotalSupply() ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
**Kind**: instance method of [<code>OmniExplorer</code>](#Driver.OmniExplorer)  
**Extends**: [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)  
<a name="Driver.OmniExplorer+fetchBalance"></a>

#### omniExplorer.fetchBalance(modifier) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
**Kind**: instance method of [<code>OmniExplorer</code>](#Driver.OmniExplorer)  
**Extends**: [<code>fetchBalance</code>](#Driver.fetchBalance)  

| Param | Type | Description |
| --- | --- | --- |
| modifier | [<code>modifierParam</code>](#modifierParam) | [modifierParam](#modifierParam) |

<a name="Driver.OmniExplorer+fetchTokenTotalSupply"></a>

#### omniExplorer.fetchTokenTotalSupply(reference) ⇐ [<code>fetchTokenTotalSupply</code>](#Driver.fetchTokenTotalSupply)
**Kind**: instance method of [<code>OmniExplorer</code>](#Driver.OmniExplorer)  
**Extends**: [<code>fetchTokenTotalSupply</code>](#Driver.fetchTokenTotalSupply)  

| Param | Type | Description |
| --- | --- | --- |
| reference | [<code>referenceParam</code>](#referenceParam) | [referenceParam](#referenceParam) |

<a name="Driver.OmniExplorer+fetchTokenBalance"></a>

#### omniExplorer.fetchTokenBalance(reference, modifier) ⇐ [<code>fetchTokenBalance</code>](#Driver.fetchTokenBalance)
**Kind**: instance method of [<code>OmniExplorer</code>](#Driver.OmniExplorer)  
**Extends**: [<code>fetchTokenBalance</code>](#Driver.fetchTokenBalance)  

| Param | Type | Description |
| --- | --- | --- |
| reference | [<code>referenceParam</code>](#referenceParam) | [referenceParam](#referenceParam) |
| modifier | [<code>modifierParam</code>](#modifierParam) | [modifierParam](#modifierParam) |

<a name="Driver.OmniExplorer+getSupply"></a>

#### omniExplorer.getSupply(coin) ⇐ [<code>getSupply</code>](#Driver.getSupply)
**Kind**: instance method of [<code>OmniExplorer</code>](#Driver.OmniExplorer)  
**Extends**: [<code>getSupply</code>](#Driver.getSupply)  

| Param | Type | Description |
| --- | --- | --- |
| coin | [<code>coinParam</code>](#coinParam) | [coinParam](#coinParam) |

<a name="Driver.Ripple"></a>

### Driver~Ripple ⇐ [<code>Driver</code>](#Driver)
Ripple driver.

**Kind**: inner class of [<code>Driver</code>](#Driver)  
**Extends**: [<code>Driver</code>](#Driver)  

* [~Ripple](#Driver.Ripple) ⇐ [<code>Driver</code>](#Driver)
    * [.fetchTotalSupply()](#Driver.Ripple+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
    * [.fetchCirculatingSupply()](#Driver.Ripple+fetchCirculatingSupply) ⇐ [<code>fetchCirculatingSupply</code>](#Driver.fetchCirculatingSupply)
    * [.fetchMaxSupply()](#Driver.Ripple+fetchMaxSupply) ⇐ [<code>fetchMaxSupply</code>](#Driver.fetchMaxSupply)
    * [.getSupply()](#Driver.Ripple+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)

<a name="Driver.Ripple+fetchTotalSupply"></a>

#### ripple.fetchTotalSupply() ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
**Kind**: instance method of [<code>Ripple</code>](#Driver.Ripple)  
**Extends**: [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)  
<a name="Driver.Ripple+fetchCirculatingSupply"></a>

#### ripple.fetchCirculatingSupply() ⇐ [<code>fetchCirculatingSupply</code>](#Driver.fetchCirculatingSupply)
**Kind**: instance method of [<code>Ripple</code>](#Driver.Ripple)  
**Extends**: [<code>fetchCirculatingSupply</code>](#Driver.fetchCirculatingSupply)  
<a name="Driver.Ripple+fetchMaxSupply"></a>

#### ripple.fetchMaxSupply() ⇐ [<code>fetchMaxSupply</code>](#Driver.fetchMaxSupply)
**Kind**: instance method of [<code>Ripple</code>](#Driver.Ripple)  
**Extends**: [<code>fetchMaxSupply</code>](#Driver.fetchMaxSupply)  
<a name="Driver.Ripple+getSupply"></a>

#### ripple.getSupply() ⇐ [<code>getSupply</code>](#Driver.getSupply)
**Kind**: instance method of [<code>Ripple</code>](#Driver.Ripple)  
**Extends**: [<code>getSupply</code>](#Driver.getSupply)  
<a name="Driver.SmartHoldem"></a>

### Driver~SmartHoldem ⇐ [<code>Driver</code>](#Driver)
SmartHoldem explorer. Supports total supply
and balance for STH coin.

**Kind**: inner class of [<code>Driver</code>](#Driver)  
**Extends**: [<code>Driver</code>](#Driver)  

* [~SmartHoldem](#Driver.SmartHoldem) ⇐ [<code>Driver</code>](#Driver)
    * [.fetchTotalSupply()](#Driver.SmartHoldem+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
    * [.fetchBalance(modifier)](#Driver.SmartHoldem+fetchBalance) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
    * [.getSupply(modifiers)](#Driver.SmartHoldem+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)

<a name="Driver.SmartHoldem+fetchTotalSupply"></a>

#### smartHoldem.fetchTotalSupply() ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
get total supply for native token

**Kind**: instance method of [<code>SmartHoldem</code>](#Driver.SmartHoldem)  
**Extends**: [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)  
<a name="Driver.SmartHoldem+fetchBalance"></a>

#### smartHoldem.fetchBalance(modifier) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
get balance for specific wallet address

**Kind**: instance method of [<code>SmartHoldem</code>](#Driver.SmartHoldem)  
**Extends**: [<code>fetchBalance</code>](#Driver.fetchBalance)  

| Param | Type | Description |
| --- | --- | --- |
| modifier | [<code>modifierParam</code>](#modifierParam) | [modifierParam](#modifierParam) |

<a name="Driver.SmartHoldem+getSupply"></a>

#### smartHoldem.getSupply(modifiers) ⇐ [<code>getSupply</code>](#Driver.getSupply)
**Kind**: instance method of [<code>SmartHoldem</code>](#Driver.SmartHoldem)  
**Extends**: [<code>getSupply</code>](#Driver.getSupply)  

| Param | Type | Description |
| --- | --- | --- |
| modifiers | [<code>Array.&lt;modifierParam&gt;</code>](#modifierParam) | [modifierParam](#modifierParam) |

<a name="Driver.Waves"></a>

### Driver~Waves ⇐ [<code>Driver</code>](#Driver)
Waves driver. Supports balance and total supply for waves and other
tokens on the Waves blockchain.

**Kind**: inner class of [<code>Driver</code>](#Driver)  
**Extends**: [<code>Driver</code>](#Driver)  

* [~Waves](#Driver.Waves) ⇐ [<code>Driver</code>](#Driver)
    * [.fetchTotalSupply()](#Driver.Waves+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
    * [.fetchTokenTotalSupply(reference)](#Driver.Waves+fetchTokenTotalSupply) ⇐ [<code>fetchTokenTotalSupply</code>](#Driver.fetchTokenTotalSupply)
    * [.fetchBalance(modifier)](#Driver.Waves+fetchBalance) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
    * [.fetchTokenBalance(reference, modifier)](#Driver.Waves+fetchTokenBalance) ⇐ [<code>fetchTokenBalance</code>](#Driver.fetchTokenBalance)
    * [.getSupply(coin)](#Driver.Waves+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)

<a name="Driver.Waves+fetchTotalSupply"></a>

#### waves.fetchTotalSupply() ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
get total supply for Wave token

**Kind**: instance method of [<code>Waves</code>](#Driver.Waves)  
**Extends**: [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)  
<a name="Driver.Waves+fetchTokenTotalSupply"></a>

#### waves.fetchTokenTotalSupply(reference) ⇐ [<code>fetchTokenTotalSupply</code>](#Driver.fetchTokenTotalSupply)
get total supply for specific asset id

**Kind**: instance method of [<code>Waves</code>](#Driver.Waves)  
**Extends**: [<code>fetchTokenTotalSupply</code>](#Driver.fetchTokenTotalSupply)  

| Param | Type | Description |
| --- | --- | --- |
| reference | [<code>referenceParam</code>](#referenceParam) | [referenceParam](#referenceParam) |

<a name="Driver.Waves+fetchBalance"></a>

#### waves.fetchBalance(modifier) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
get balance for specific wallet address

**Kind**: instance method of [<code>Waves</code>](#Driver.Waves)  
**Extends**: [<code>fetchBalance</code>](#Driver.fetchBalance)  

| Param | Type | Description |
| --- | --- | --- |
| modifier | [<code>modifierParam</code>](#modifierParam) | [modifierParam](#modifierParam) |

<a name="Driver.Waves+fetchTokenBalance"></a>

#### waves.fetchTokenBalance(reference, modifier) ⇐ [<code>fetchTokenBalance</code>](#Driver.fetchTokenBalance)
fetch balance value of asset id for specific wallet

**Kind**: instance method of [<code>Waves</code>](#Driver.Waves)  
**Extends**: [<code>fetchTokenBalance</code>](#Driver.fetchTokenBalance)  

| Param | Type | Description |
| --- | --- | --- |
| reference | [<code>referenceParam</code>](#referenceParam) | [referenceParam](#referenceParam) |
| modifier | [<code>modifierParam</code>](#modifierParam) | [modifierParam](#modifierParam) |

<a name="Driver.Waves+getSupply"></a>

#### waves.getSupply(coin) ⇐ [<code>getSupply</code>](#Driver.getSupply)
**Kind**: instance method of [<code>Waves</code>](#Driver.Waves)  
**Extends**: [<code>getSupply</code>](#Driver.getSupply)  

| Param | Type | Description |
| --- | --- | --- |
| coin | [<code>coinParam</code>](#coinParam) | [coinParam](#coinParam) |
| coin.reference | [<code>referenceParam</code>](#referenceParam) | [referenceParam](#referenceParam) |
| coin.modifiers | [<code>Array.&lt;modifierParam&gt;</code>](#modifierParam) | [modifierParam](#modifierParam) |

<a name="Driver.Xaya"></a>

### Driver~Xaya ⇐ [<code>Driver</code>](#Driver)
Xaya driver. Supports balance and total supply for chi token
on the Xaya blockchain.

**Kind**: inner class of [<code>Driver</code>](#Driver)  
**Extends**: [<code>Driver</code>](#Driver)  

* [~Xaya](#Driver.Xaya) ⇐ [<code>Driver</code>](#Driver)
    * [.fetchTotalSupply()](#Driver.Xaya+fetchTotalSupply) ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
    * [.fetchBalance(modifier)](#Driver.Xaya+fetchBalance) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
    * [.getSupply(modifiers)](#Driver.Xaya+getSupply) ⇐ [<code>getSupply</code>](#Driver.getSupply)

<a name="Driver.Xaya+fetchTotalSupply"></a>

#### xaya.fetchTotalSupply() ⇐ [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)
get total supply for native token

**Kind**: instance method of [<code>Xaya</code>](#Driver.Xaya)  
**Extends**: [<code>fetchTotalSupply</code>](#Driver.fetchTotalSupply)  
<a name="Driver.Xaya+fetchBalance"></a>

#### xaya.fetchBalance(modifier) ⇐ [<code>fetchBalance</code>](#Driver.fetchBalance)
get balance for specific wallet address

**Kind**: instance method of [<code>Xaya</code>](#Driver.Xaya)  
**Extends**: [<code>fetchBalance</code>](#Driver.fetchBalance)  

| Param | Type | Description |
| --- | --- | --- |
| modifier | [<code>modifierParam</code>](#modifierParam) | [modifierParam](#modifierParam) |

<a name="Driver.Xaya+getSupply"></a>

#### xaya.getSupply(modifiers) ⇐ [<code>getSupply</code>](#Driver.getSupply)
get supply

**Kind**: instance method of [<code>Xaya</code>](#Driver.Xaya)  
**Extends**: [<code>getSupply</code>](#Driver.getSupply)  

| Param | Type | Description |
| --- | --- | --- |
| modifiers | [<code>Array.&lt;modifierParam&gt;</code>](#modifierParam) | [modifierParam](#modifierParam) |

<a name="Model"></a>

## Model
**Kind**: global class  

* [Model](#Model)
    * [~Coin](#Model.Coin)
    * [~SupplyModifier](#Model.SupplyModifier)
    * [~Supply](#Model.Supply)

<a name="Model.Coin"></a>

### Model~Coin
Coin model provided to drivers that support multiple coins.

**Kind**: inner class of [<code>Model</code>](#Model)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | The parameters of the coin. |
| options.reference | <code>string</code> | The unique identifier of a coin. Usually a smart contract address. |
| options.name | <code>string</code> | The name of the coin. |
| options.symbol | <code>string</code> | The symbol of the coin. Most of the time three characters long. E.g. BTC. |
| options.decimals | <code>string</code> | The amount of precision this coin uses. For most blockchains, this defaults to 18. |
| options.modifiers | <code>Array.&lt;string&gt;</code> | List of addresses of which the balance should be substracted from the supply to get   the circulating supply. E.g. for ethereum the balance of address   0x0000000000000000000000000000000000000000 is substracted, because tokens are sent   there to get 'burned'. See [SupplyModifier](#Model.SupplyModifier). |

<a name="Model.SupplyModifier"></a>

### Model~SupplyModifier
One or more supply modifiers are used to calculate the circulating supply.
A supply modifier is a balance on a specific address, that holds a balance. E.g. for ethereum
the balance of address 0x0000000000000000000000000000000000000000 is substracted, because tokens
are sent there to get 'burned'. These burned tokens do exist on the blockchain, but because they
are not available to the public they are 'circulating'. So the 'total supply' minus these
supply modifiers result in the 'circulating supply'. Also see [Supply](#Model.Supply).

**Kind**: inner class of [<code>Model</code>](#Model)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | The parameters of the supply modifier |
| options.reference | <code>string</code> | A unique identifier. An address that holds a balance. |
| options.balance | <code>number</code> | The balance of the adress. |

<a name="Model.Supply"></a>

### Model~Supply
Supply model, returned from all drivers.

**Kind**: inner class of [<code>Model</code>](#Model)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | The parameters of the supply. |
| options.total | <code>number</code> | The amount of coins that is currently available on the blockchain, through either mining   or pre-mined. |
| options.circulating | <code>number</code> | The total amount of coins, minus coins that are withold from the public. Coins can be withold   by means of burning, escrowing or being pre-mined and undistributed. The circulating supply is   fetched directly from a source or calculated by fetching modifiers, see options.modifiers in   [Coin](#Model.Coin). |
| options.max | <code>number</code> | In contrast to the total supply, the max supply is not only the currently available supply,   but also the amount of coins that can be reached in the future. It's relevance differs per   blockchain. E.g. Bitcoin has a fixed maximum supply of 21 million coins, upon which all it's   coins are mined. Ethereum can also be mined, but for now there is an indefinite amount and   thus no max supply. Other blockchains come pre-mined or might be completely mined already,   which means the max supply equals the total supply. |
| options.modifiers | [<code>Array.&lt;SupplyModifier&gt;</code>](#Model.SupplyModifier) | Consists of a list of suply modifiers. See [SupplyModifier](#Model.SupplyModifier). |

<a name="coinParam"></a>

## coinParam : [<code>Coin</code>](#Model.Coin)
Coin model with properties needed to fetch supplies.

**Kind**: global typedef  
<a name="modifierParam"></a>

## modifierParam : <code>string</code>
Address which balance is used as a modifier.

**Kind**: global typedef  
<a name="referenceParam"></a>

## referenceParam : <code>string</code>
Reference to a coin unique for the blockchain. E.g. a smart contract address.

**Kind**: global typedef  
<a name="decimalsParam"></a>

## decimalsParam : <code>number</code>
Amount of decimals used for this coin.

**Kind**: global typedef  
