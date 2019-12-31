## Classes

<dl>
<dt><a href="#Coin">Coin</a></dt>
<dd><p>Coin model provided to drivers that support multiple coins.</p>
</dd>
</dl>

## Objects

<dl>
<dt><a href="#Drivers">Drivers</a> : <code>object</code></dt>
<dd><p>Driver parent class, to be extended by drivers for specific block explorers.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#coinParam">coinParam</a> : <code><a href="#Coin">Coin</a></code></dt>
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

<a name="Coin"></a>

## Coin
Coin model provided to drivers that support multiple coins.

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | The parameters of the coin. |
| options.reference | <code>string</code> | The unique identifier of a coin. Usually a smart contract address. |
| options.name | <code>string</code> | The name of the coin. |
| options.symbol | <code>string</code> | The symbol of the coin. Most of the time three characters long. E.g. BTC. |
| options.decimals | <code>string</code> | The amount of precision this coin uses. For most blockchains, this defaults to 18. |
| options.modifiers | <code>Array</code> | List of addresses of which the balance should be substracted from the supply to get   the circulating supply. E.g. for ethereum the balance of address   0x0000000000000000000000000000000000000000 is substracted, because tokens are sent   there to get 'burned'. |

<a name="Drivers"></a>

## Drivers : <code>object</code>
Driver parent class, to be extended by drivers for specific block explorers.

**Kind**: global namespace  

* [Drivers](#Drivers) : <code>object</code>
    * _static_
        * [.fetchTotalSupply](#Drivers.fetchTotalSupply) ⇒ <code>number</code>
        * [.fetchCirculatingSupply](#Drivers.fetchCirculatingSupply) ⇒ <code>number</code>
        * [.fetchMaxSupply](#Drivers.fetchMaxSupply) ⇒ <code>number</code>
        * [.fetchBalance](#Drivers.fetchBalance) ⇒ <code>number</code>
        * [.fetchAssetTotalSupply](#Drivers.fetchAssetTotalSupply) ⇒ <code>number</code>
        * [.fetchAssetBalance](#Drivers.fetchAssetBalance) ⇒ <code>number</code>
    * _inner_
        * [~BlockchainInfo](#Drivers.BlockchainInfo) ⇐ <code>Driver</code>
            * [.fetchTotalSupply()](#Drivers.BlockchainInfo+fetchTotalSupply) ⇐ <code>fetchTotalSupply</code>
            * [.fetchCirculatingSupply()](#Drivers.BlockchainInfo+fetchCirculatingSupply) ⇐ [<code>fetchCirculatingSupply</code>](#Drivers.fetchCirculatingSupply)
            * [.fetchMaxSupply()](#Drivers.BlockchainInfo+fetchMaxSupply) ⇐ [<code>fetchMaxSupply</code>](#Drivers.fetchMaxSupply)
            * [.getSupply()](#Drivers.BlockchainInfo+getSupply) ⇐ <code>Driver.getSupply</code>
        * [~CardanoExplorer](#Drivers.CardanoExplorer) ⇐ <code>Driver</code>
            * [.fetchTotalSupply()](#Drivers.CardanoExplorer+fetchTotalSupply) ⇐ <code>fetchTotalSupply</code>
            * [.fetchBalance(modifier)](#Drivers.CardanoExplorer+fetchBalance) ⇐ <code>fetchBalance</code>
            * [.getSupply(coin)](#Drivers.CardanoExplorer+getSupply) ⇐ <code>Driver.getSupply</code>
        * [~ChainNemNinja](#Drivers.ChainNemNinja) ⇐ <code>Driver</code>
            * [.fetchTotalSupply()](#Drivers.ChainNemNinja+fetchTotalSupply) ⇐ <code>fetchTotalSupply</code>
            * [.fetchMaxSupply()](#Drivers.ChainNemNinja+fetchMaxSupply) ⇐ <code>fetchMaxSupply</code>
            * [.fetchBalance(modifier)](#Drivers.ChainNemNinja+fetchBalance) ⇐ <code>fetchBalance</code>
            * [.getSupply(coin)](#Drivers.ChainNemNinja+getSupply) ⇐ <code>Driver.getSupply</code>
        * [~CryptoidDash](#Drivers.CryptoidDash) ⇐ <code>Driver</code>
            * [.fetchTotalSupply()](#Drivers.CryptoidDash+fetchTotalSupply) ⇐ <code>Driver.getTotalSupply</code>
            * [.fetchCirculatingSupply()](#Drivers.CryptoidDash+fetchCirculatingSupply) ⇐ <code>Driver.getCirculatingSupply</code>
            * [.getSupply()](#Drivers.CryptoidDash+getSupply) ⇐ <code>Driver.getSupply</code>
        * [~DogeChain](#Drivers.DogeChain) ⇐ <code>Driver</code>
            * [.fetchTotalSupply()](#Drivers.DogeChain+fetchTotalSupply) ⇐ <code>fetchTotalSupply</code>
            * [.fetchCirculatingSupply()](#Drivers.DogeChain+fetchCirculatingSupply) ⇐ <code>fetchCirculatingSupply</code>
            * [.getSupply()](#Drivers.DogeChain+getSupply) ⇐ <code>Driver.getSupply</code>
        * [~Etherscan](#Drivers.Etherscan) ⇐ <code>Driver</code>
            * [.fetchTotalSupply()](#Drivers.Etherscan+fetchTotalSupply) ⇐ <code>fetchTotalSupply</code>
            * [.fetchBalance(modifier)](#Drivers.Etherscan+fetchBalance) ⇐ <code>fetchBalance</code>
            * [.fetchAssetTotalSupply(reference, decimals)](#Drivers.Etherscan+fetchAssetTotalSupply) ⇐ <code>fetchAssetTotalSupply</code>
            * [.fetchAssetBalance(reference, modifier, decimals)](#Drivers.Etherscan+fetchAssetBalance) ⇐ <code>fetchAssetBalance</code>
            * [.getSupply(coin)](#Drivers.Etherscan+getSupply) ⇐ <code>Driver.getSupply</code>
        * [~Lisk](#Drivers.Lisk) ⇐ <code>Driver</code>
            * [.fetchTotalSupply()](#Drivers.Lisk+fetchTotalSupply) ⇐ <code>fetchTotalSupply</code>
            * [.fetchBalance(modifier)](#Drivers.Lisk+fetchBalance) ⇐ <code>fetchBalance</code>
            * [.getSupply(coin)](#Drivers.Lisk+getSupply) ⇐ <code>Driver.getSupply</code>
        * [~LitecoinNet](#Drivers.LitecoinNet) ⇐ <code>Driver</code>
            * [.fetchTotalSupply()](#Drivers.LitecoinNet+fetchTotalSupply) ⇐ <code>fetchTotalSupply</code>
            * [.fetchCirculatingSupply()](#Drivers.LitecoinNet+fetchCirculatingSupply) ⇐ <code>fetchCirculatingSupply</code>
            * [.fetchMaxSupply()](#Drivers.LitecoinNet+fetchMaxSupply) ⇐ <code>fetchMaxSupply</code>
            * [.getSupply()](#Drivers.LitecoinNet+getSupply) ⇐ <code>Driver.getSupply</code>
        * [~MoneroBlocks](#Drivers.MoneroBlocks) ⇐ <code>Driver</code>
            * [.fetchTotalSupply()](#Drivers.MoneroBlocks+fetchTotalSupply) ⇐ <code>fetchTotalSupply</code>
            * [.fetchCirculatingSupply()](#Drivers.MoneroBlocks+fetchCirculatingSupply) ⇐ <code>fetchCirculatingSupply</code>
            * [.getSupply()](#Drivers.MoneroBlocks+getSupply) ⇐ <code>Driver.getSupply</code>
        * [~NeoScan](#Drivers.NeoScan) ⇐ <code>Driver</code>
            * [.fetchTotalSupply()](#Drivers.NeoScan+fetchTotalSupply) ⇐ <code>fetchTotalSupply</code>
            * [.fetchBalance(modifier)](#Drivers.NeoScan+fetchBalance) ⇐ <code>fetchBalance</code>
            * [.fetchAssetTotalSupply(reference)](#Drivers.NeoScan+fetchAssetTotalSupply) ⇐ <code>fetchAssetTotalSupply</code>
            * [.fetchAssetBalance(reference, modifier)](#Drivers.NeoScan+fetchAssetBalance) ⇐ <code>fetchAssetBalance</code>
            * [.getSupply(coin)](#Drivers.NeoScan+getSupply) ⇐ <code>Driver.getSupply</code>
        * [~OmniExplorer](#Drivers.OmniExplorer) ⇐ <code>Driver</code>
            * [.fetchTotalSupply()](#Drivers.OmniExplorer+fetchTotalSupply) ⇐ <code>fetchTotalSupply</code>
            * [.fetchBalance(modifier)](#Drivers.OmniExplorer+fetchBalance) ⇐ <code>fetchBalance</code>
            * [.fetchAssetTotalSupply(reference)](#Drivers.OmniExplorer+fetchAssetTotalSupply) ⇐ <code>fetchAssetTotalSupply</code>
            * [.fetchAssetBalance(reference, modifier)](#Drivers.OmniExplorer+fetchAssetBalance) ⇐ <code>fetchAssetBalance</code>
            * [.getSupply(coin)](#Drivers.OmniExplorer+getSupply) ⇐ <code>Driver.getSupply</code>
        * [~Ripple](#Drivers.Ripple) ⇐ <code>Driver</code>
            * [.fetchTotalSupply()](#Drivers.Ripple+fetchTotalSupply) ⇐ <code>fetchTotalSupply</code>
            * [.fetchCirculatingSupply()](#Drivers.Ripple+fetchCirculatingSupply) ⇐ <code>fetchCirculatingSupply</code>
            * [.fetchMaxSupply()](#Drivers.Ripple+fetchMaxSupply) ⇐ [<code>fetchMaxSupply</code>](#Drivers.fetchMaxSupply)
            * [.getSupply()](#Drivers.Ripple+getSupply) ⇐ <code>Driver.getSupply</code>

<a name="Drivers.fetchTotalSupply"></a>

### Drivers.fetchTotalSupply ⇒ <code>number</code>
Fetch the total supply of a coin

**Kind**: static namespace of [<code>Drivers</code>](#Drivers)  
**Returns**: <code>number</code> - All the currently mined coins.  
<a name="Drivers.fetchCirculatingSupply"></a>

### Drivers.fetchCirculatingSupply ⇒ <code>number</code>
Fetch the circulating supply of a coin

**Kind**: static namespace of [<code>Drivers</code>](#Drivers)  
**Returns**: <code>number</code> - The total supply minus coins not in circulation, such as burned, premined or escrowed coins.  
<a name="Drivers.fetchMaxSupply"></a>

### Drivers.fetchMaxSupply ⇒ <code>number</code>
Fetch the maximum supply of a coin

**Kind**: static namespace of [<code>Drivers</code>](#Drivers)  
**Returns**: <code>number</code> - The maximum possible amount of supply ever to be reached.  
<a name="Drivers.fetchBalance"></a>

### Drivers.fetchBalance ⇒ <code>number</code>
Fetch the balance

**Kind**: static namespace of [<code>Drivers</code>](#Drivers)  
**Returns**: <code>number</code> - Amount on a specific address.  
<a name="Drivers.fetchAssetTotalSupply"></a>

### Drivers.fetchAssetTotalSupply ⇒ <code>number</code>
Fetch the total supply of an asset, i.e. a token on a blockchain.

**Kind**: static namespace of [<code>Drivers</code>](#Drivers)  
**Returns**: <code>number</code> - Total amount of a token.  
<a name="Drivers.fetchAssetBalance"></a>

### Drivers.fetchAssetBalance ⇒ <code>number</code>
Fetch asset balance

**Kind**: static namespace of [<code>Drivers</code>](#Drivers)  
**Returns**: <code>number</code> - Balance of a specific token on a specific address, to be used as supply modifier in order to
  calculate the circulating supply.  
<a name="Drivers.BlockchainInfo"></a>

### Drivers~BlockchainInfo ⇐ <code>Driver</code>
BlockchainInfo driver. Supports circulating and max supply for BTC.

**Kind**: inner class of [<code>Drivers</code>](#Drivers)  
**Extends**: <code>Driver</code>  

* [~BlockchainInfo](#Drivers.BlockchainInfo) ⇐ <code>Driver</code>
    * [.fetchTotalSupply()](#Drivers.BlockchainInfo+fetchTotalSupply) ⇐ <code>fetchTotalSupply</code>
    * [.fetchCirculatingSupply()](#Drivers.BlockchainInfo+fetchCirculatingSupply) ⇐ [<code>fetchCirculatingSupply</code>](#Drivers.fetchCirculatingSupply)
    * [.fetchMaxSupply()](#Drivers.BlockchainInfo+fetchMaxSupply) ⇐ [<code>fetchMaxSupply</code>](#Drivers.fetchMaxSupply)
    * [.getSupply()](#Drivers.BlockchainInfo+getSupply) ⇐ <code>Driver.getSupply</code>

<a name="Drivers.BlockchainInfo+fetchTotalSupply"></a>

#### blockchainInfo.fetchTotalSupply() ⇐ <code>fetchTotalSupply</code>
**Kind**: instance method of [<code>BlockchainInfo</code>](#Drivers.BlockchainInfo)  
**Extends**: <code>fetchTotalSupply</code>  
<a name="Drivers.BlockchainInfo+fetchCirculatingSupply"></a>

#### blockchainInfo.fetchCirculatingSupply() ⇐ [<code>fetchCirculatingSupply</code>](#Drivers.fetchCirculatingSupply)
**Kind**: instance method of [<code>BlockchainInfo</code>](#Drivers.BlockchainInfo)  
**Extends**: [<code>fetchCirculatingSupply</code>](#Drivers.fetchCirculatingSupply)  
<a name="Drivers.BlockchainInfo+fetchMaxSupply"></a>

#### blockchainInfo.fetchMaxSupply() ⇐ [<code>fetchMaxSupply</code>](#Drivers.fetchMaxSupply)
**Kind**: instance method of [<code>BlockchainInfo</code>](#Drivers.BlockchainInfo)  
**Extends**: [<code>fetchMaxSupply</code>](#Drivers.fetchMaxSupply)  
<a name="Drivers.BlockchainInfo+getSupply"></a>

#### blockchainInfo.getSupply() ⇐ <code>Driver.getSupply</code>
**Kind**: instance method of [<code>BlockchainInfo</code>](#Drivers.BlockchainInfo)  
**Extends**: <code>Driver.getSupply</code>  
**Overrides**: [<code>getSupply</code>](#Driver+getSupply)  
<a name="Drivers.CardanoExplorer"></a>

### Drivers~CardanoExplorer ⇐ <code>Driver</code>
Cardano explorer driver.

**Kind**: inner class of [<code>Drivers</code>](#Drivers)  
**Extends**: <code>Driver</code>  

* [~CardanoExplorer](#Drivers.CardanoExplorer) ⇐ <code>Driver</code>
    * [.fetchTotalSupply()](#Drivers.CardanoExplorer+fetchTotalSupply) ⇐ <code>fetchTotalSupply</code>
    * [.fetchBalance(modifier)](#Drivers.CardanoExplorer+fetchBalance) ⇐ <code>fetchBalance</code>
    * [.getSupply(coin)](#Drivers.CardanoExplorer+getSupply) ⇐ <code>Driver.getSupply</code>

<a name="Drivers.CardanoExplorer+fetchTotalSupply"></a>

#### cardanoExplorer.fetchTotalSupply() ⇐ <code>fetchTotalSupply</code>
**Kind**: instance method of [<code>CardanoExplorer</code>](#Drivers.CardanoExplorer)  
**Extends**: <code>fetchTotalSupply</code>  
<a name="Drivers.CardanoExplorer+fetchBalance"></a>

#### cardanoExplorer.fetchBalance(modifier) ⇐ <code>fetchBalance</code>
**Kind**: instance method of [<code>CardanoExplorer</code>](#Drivers.CardanoExplorer)  
**Extends**: <code>fetchBalance</code>  

| Param | Type |
| --- | --- |
| modifier | [<code>modifierParam</code>](#modifierParam) | 

<a name="Drivers.CardanoExplorer+getSupply"></a>

#### cardanoExplorer.getSupply(coin) ⇐ <code>Driver.getSupply</code>
**Kind**: instance method of [<code>CardanoExplorer</code>](#Drivers.CardanoExplorer)  
**Extends**: <code>Driver.getSupply</code>  
**Overrides**: [<code>getSupply</code>](#Driver+getSupply)  

| Param | Type |
| --- | --- |
| coin | [<code>coinParam</code>](#coinParam) | 

<a name="Drivers.ChainNemNinja"></a>

### Drivers~ChainNemNinja ⇐ <code>Driver</code>
Chain Nem Ninja / Nembex driver.

**Kind**: inner class of [<code>Drivers</code>](#Drivers)  
**Extends**: <code>Driver</code>  

* [~ChainNemNinja](#Drivers.ChainNemNinja) ⇐ <code>Driver</code>
    * [.fetchTotalSupply()](#Drivers.ChainNemNinja+fetchTotalSupply) ⇐ <code>fetchTotalSupply</code>
    * [.fetchMaxSupply()](#Drivers.ChainNemNinja+fetchMaxSupply) ⇐ <code>fetchMaxSupply</code>
    * [.fetchBalance(modifier)](#Drivers.ChainNemNinja+fetchBalance) ⇐ <code>fetchBalance</code>
    * [.getSupply(coin)](#Drivers.ChainNemNinja+getSupply) ⇐ <code>Driver.getSupply</code>

<a name="Drivers.ChainNemNinja+fetchTotalSupply"></a>

#### chainNemNinja.fetchTotalSupply() ⇐ <code>fetchTotalSupply</code>
**Kind**: instance method of [<code>ChainNemNinja</code>](#Drivers.ChainNemNinja)  
**Extends**: <code>fetchTotalSupply</code>  
<a name="Drivers.ChainNemNinja+fetchMaxSupply"></a>

#### chainNemNinja.fetchMaxSupply() ⇐ <code>fetchMaxSupply</code>
**Kind**: instance method of [<code>ChainNemNinja</code>](#Drivers.ChainNemNinja)  
**Extends**: <code>fetchMaxSupply</code>  
<a name="Drivers.ChainNemNinja+fetchBalance"></a>

#### chainNemNinja.fetchBalance(modifier) ⇐ <code>fetchBalance</code>
**Kind**: instance method of [<code>ChainNemNinja</code>](#Drivers.ChainNemNinja)  
**Extends**: <code>fetchBalance</code>  

| Param | Type |
| --- | --- |
| modifier | [<code>modifierParam</code>](#modifierParam) | 

<a name="Drivers.ChainNemNinja+getSupply"></a>

#### chainNemNinja.getSupply(coin) ⇐ <code>Driver.getSupply</code>
**Kind**: instance method of [<code>ChainNemNinja</code>](#Drivers.ChainNemNinja)  
**Extends**: <code>Driver.getSupply</code>  
**Overrides**: [<code>getSupply</code>](#Driver+getSupply)  

| Param | Type |
| --- | --- |
| coin | [<code>coinParam</code>](#coinParam) | 

<a name="Drivers.CryptoidDash"></a>

### Drivers~CryptoidDash ⇐ <code>Driver</code>
Cryptoid Dash driver.

**Kind**: inner class of [<code>Drivers</code>](#Drivers)  
**Extends**: <code>Driver</code>  

* [~CryptoidDash](#Drivers.CryptoidDash) ⇐ <code>Driver</code>
    * [.fetchTotalSupply()](#Drivers.CryptoidDash+fetchTotalSupply) ⇐ <code>Driver.getTotalSupply</code>
    * [.fetchCirculatingSupply()](#Drivers.CryptoidDash+fetchCirculatingSupply) ⇐ <code>Driver.getCirculatingSupply</code>
    * [.getSupply()](#Drivers.CryptoidDash+getSupply) ⇐ <code>Driver.getSupply</code>

<a name="Drivers.CryptoidDash+fetchTotalSupply"></a>

#### cryptoidDash.fetchTotalSupply() ⇐ <code>Driver.getTotalSupply</code>
**Kind**: instance method of [<code>CryptoidDash</code>](#Drivers.CryptoidDash)  
**Extends**: <code>Driver.getTotalSupply</code>  
<a name="Drivers.CryptoidDash+fetchCirculatingSupply"></a>

#### cryptoidDash.fetchCirculatingSupply() ⇐ <code>Driver.getCirculatingSupply</code>
**Kind**: instance method of [<code>CryptoidDash</code>](#Drivers.CryptoidDash)  
**Extends**: <code>Driver.getCirculatingSupply</code>  
<a name="Drivers.CryptoidDash+getSupply"></a>

#### cryptoidDash.getSupply() ⇐ <code>Driver.getSupply</code>
**Kind**: instance method of [<code>CryptoidDash</code>](#Drivers.CryptoidDash)  
**Extends**: <code>Driver.getSupply</code>  
**Overrides**: [<code>getSupply</code>](#Driver+getSupply)  
<a name="Drivers.DogeChain"></a>

### Drivers~DogeChain ⇐ <code>Driver</code>
Dogechain driver.

**Kind**: inner class of [<code>Drivers</code>](#Drivers)  
**Extends**: <code>Driver</code>  

* [~DogeChain](#Drivers.DogeChain) ⇐ <code>Driver</code>
    * [.fetchTotalSupply()](#Drivers.DogeChain+fetchTotalSupply) ⇐ <code>fetchTotalSupply</code>
    * [.fetchCirculatingSupply()](#Drivers.DogeChain+fetchCirculatingSupply) ⇐ <code>fetchCirculatingSupply</code>
    * [.getSupply()](#Drivers.DogeChain+getSupply) ⇐ <code>Driver.getSupply</code>

<a name="Drivers.DogeChain+fetchTotalSupply"></a>

#### dogeChain.fetchTotalSupply() ⇐ <code>fetchTotalSupply</code>
**Kind**: instance method of [<code>DogeChain</code>](#Drivers.DogeChain)  
**Extends**: <code>fetchTotalSupply</code>  
<a name="Drivers.DogeChain+fetchCirculatingSupply"></a>

#### dogeChain.fetchCirculatingSupply() ⇐ <code>fetchCirculatingSupply</code>
**Kind**: instance method of [<code>DogeChain</code>](#Drivers.DogeChain)  
**Extends**: <code>fetchCirculatingSupply</code>  
<a name="Drivers.DogeChain+getSupply"></a>

#### dogeChain.getSupply() ⇐ <code>Driver.getSupply</code>
**Kind**: instance method of [<code>DogeChain</code>](#Drivers.DogeChain)  
**Extends**: <code>Driver.getSupply</code>  
**Overrides**: [<code>getSupply</code>](#Driver+getSupply)  
<a name="Drivers.Etherscan"></a>

### Drivers~Etherscan ⇐ <code>Driver</code>
Etherscan driver. Supports circulating and total supply for ethereum and
tokens on the ethereum blockchain.

**Kind**: inner class of [<code>Drivers</code>](#Drivers)  
**Extends**: <code>Driver</code>  

* [~Etherscan](#Drivers.Etherscan) ⇐ <code>Driver</code>
    * [.fetchTotalSupply()](#Drivers.Etherscan+fetchTotalSupply) ⇐ <code>fetchTotalSupply</code>
    * [.fetchBalance(modifier)](#Drivers.Etherscan+fetchBalance) ⇐ <code>fetchBalance</code>
    * [.fetchAssetTotalSupply(reference, decimals)](#Drivers.Etherscan+fetchAssetTotalSupply) ⇐ <code>fetchAssetTotalSupply</code>
    * [.fetchAssetBalance(reference, modifier, decimals)](#Drivers.Etherscan+fetchAssetBalance) ⇐ <code>fetchAssetBalance</code>
    * [.getSupply(coin)](#Drivers.Etherscan+getSupply) ⇐ <code>Driver.getSupply</code>

<a name="Drivers.Etherscan+fetchTotalSupply"></a>

#### etherscan.fetchTotalSupply() ⇐ <code>fetchTotalSupply</code>
**Kind**: instance method of [<code>Etherscan</code>](#Drivers.Etherscan)  
**Extends**: <code>fetchTotalSupply</code>  
<a name="Drivers.Etherscan+fetchBalance"></a>

#### etherscan.fetchBalance(modifier) ⇐ <code>fetchBalance</code>
**Kind**: instance method of [<code>Etherscan</code>](#Drivers.Etherscan)  
**Extends**: <code>fetchBalance</code>  

| Param | Type |
| --- | --- |
| modifier | [<code>modifierParam</code>](#modifierParam) | 

<a name="Drivers.Etherscan+fetchAssetTotalSupply"></a>

#### etherscan.fetchAssetTotalSupply(reference, decimals) ⇐ <code>fetchAssetTotalSupply</code>
**Kind**: instance method of [<code>Etherscan</code>](#Drivers.Etherscan)  
**Extends**: <code>fetchAssetTotalSupply</code>  

| Param | Type |
| --- | --- |
| reference | [<code>referenceParam</code>](#referenceParam) | 
| decimals | [<code>decimalsParam</code>](#decimalsParam) | 

<a name="Drivers.Etherscan+fetchAssetBalance"></a>

#### etherscan.fetchAssetBalance(reference, modifier, decimals) ⇐ <code>fetchAssetBalance</code>
**Kind**: instance method of [<code>Etherscan</code>](#Drivers.Etherscan)  
**Extends**: <code>fetchAssetBalance</code>  

| Param | Type |
| --- | --- |
| reference | [<code>referenceParam</code>](#referenceParam) | 
| modifier | [<code>modifierParam</code>](#modifierParam) | 
| decimals | [<code>decimalsParam</code>](#decimalsParam) | 

<a name="Drivers.Etherscan+getSupply"></a>

#### etherscan.getSupply(coin) ⇐ <code>Driver.getSupply</code>
**Kind**: instance method of [<code>Etherscan</code>](#Drivers.Etherscan)  
**Extends**: <code>Driver.getSupply</code>  
**Overrides**: [<code>getSupply</code>](#Driver+getSupply)  

| Param | Type |
| --- | --- |
| coin | [<code>coinParam</code>](#coinParam) | 

<a name="Drivers.Lisk"></a>

### Drivers~Lisk ⇐ <code>Driver</code>
Lisk driver.

**Kind**: inner class of [<code>Drivers</code>](#Drivers)  
**Extends**: <code>Driver</code>  

* [~Lisk](#Drivers.Lisk) ⇐ <code>Driver</code>
    * [.fetchTotalSupply()](#Drivers.Lisk+fetchTotalSupply) ⇐ <code>fetchTotalSupply</code>
    * [.fetchBalance(modifier)](#Drivers.Lisk+fetchBalance) ⇐ <code>fetchBalance</code>
    * [.getSupply(coin)](#Drivers.Lisk+getSupply) ⇐ <code>Driver.getSupply</code>

<a name="Drivers.Lisk+fetchTotalSupply"></a>

#### lisk.fetchTotalSupply() ⇐ <code>fetchTotalSupply</code>
**Kind**: instance method of [<code>Lisk</code>](#Drivers.Lisk)  
**Extends**: <code>fetchTotalSupply</code>  
<a name="Drivers.Lisk+fetchBalance"></a>

#### lisk.fetchBalance(modifier) ⇐ <code>fetchBalance</code>
**Kind**: instance method of [<code>Lisk</code>](#Drivers.Lisk)  
**Extends**: <code>fetchBalance</code>  

| Param | Type |
| --- | --- |
| modifier | [<code>modifierParam</code>](#modifierParam) | 

<a name="Drivers.Lisk+getSupply"></a>

#### lisk.getSupply(coin) ⇐ <code>Driver.getSupply</code>
**Kind**: instance method of [<code>Lisk</code>](#Drivers.Lisk)  
**Extends**: <code>Driver.getSupply</code>  
**Overrides**: [<code>getSupply</code>](#Driver+getSupply)  

| Param | Type |
| --- | --- |
| coin | [<code>coinParam</code>](#coinParam) | 

<a name="Drivers.LitecoinNet"></a>

### Drivers~LitecoinNet ⇐ <code>Driver</code>
LitecoinNet driver.

**Kind**: inner class of [<code>Drivers</code>](#Drivers)  
**Extends**: <code>Driver</code>  

* [~LitecoinNet](#Drivers.LitecoinNet) ⇐ <code>Driver</code>
    * [.fetchTotalSupply()](#Drivers.LitecoinNet+fetchTotalSupply) ⇐ <code>fetchTotalSupply</code>
    * [.fetchCirculatingSupply()](#Drivers.LitecoinNet+fetchCirculatingSupply) ⇐ <code>fetchCirculatingSupply</code>
    * [.fetchMaxSupply()](#Drivers.LitecoinNet+fetchMaxSupply) ⇐ <code>fetchMaxSupply</code>
    * [.getSupply()](#Drivers.LitecoinNet+getSupply) ⇐ <code>Driver.getSupply</code>

<a name="Drivers.LitecoinNet+fetchTotalSupply"></a>

#### litecoinNet.fetchTotalSupply() ⇐ <code>fetchTotalSupply</code>
**Kind**: instance method of [<code>LitecoinNet</code>](#Drivers.LitecoinNet)  
**Extends**: <code>fetchTotalSupply</code>  
<a name="Drivers.LitecoinNet+fetchCirculatingSupply"></a>

#### litecoinNet.fetchCirculatingSupply() ⇐ <code>fetchCirculatingSupply</code>
**Kind**: instance method of [<code>LitecoinNet</code>](#Drivers.LitecoinNet)  
**Extends**: <code>fetchCirculatingSupply</code>  
<a name="Drivers.LitecoinNet+fetchMaxSupply"></a>

#### litecoinNet.fetchMaxSupply() ⇐ <code>fetchMaxSupply</code>
**Kind**: instance method of [<code>LitecoinNet</code>](#Drivers.LitecoinNet)  
**Extends**: <code>fetchMaxSupply</code>  
<a name="Drivers.LitecoinNet+getSupply"></a>

#### litecoinNet.getSupply() ⇐ <code>Driver.getSupply</code>
**Kind**: instance method of [<code>LitecoinNet</code>](#Drivers.LitecoinNet)  
**Extends**: <code>Driver.getSupply</code>  
**Overrides**: [<code>getSupply</code>](#Driver+getSupply)  
<a name="Drivers.MoneroBlocks"></a>

### Drivers~MoneroBlocks ⇐ <code>Driver</code>
MoneroBlocks driver.

**Kind**: inner class of [<code>Drivers</code>](#Drivers)  
**Extends**: <code>Driver</code>  

* [~MoneroBlocks](#Drivers.MoneroBlocks) ⇐ <code>Driver</code>
    * [.fetchTotalSupply()](#Drivers.MoneroBlocks+fetchTotalSupply) ⇐ <code>fetchTotalSupply</code>
    * [.fetchCirculatingSupply()](#Drivers.MoneroBlocks+fetchCirculatingSupply) ⇐ <code>fetchCirculatingSupply</code>
    * [.getSupply()](#Drivers.MoneroBlocks+getSupply) ⇐ <code>Driver.getSupply</code>

<a name="Drivers.MoneroBlocks+fetchTotalSupply"></a>

#### moneroBlocks.fetchTotalSupply() ⇐ <code>fetchTotalSupply</code>
**Kind**: instance method of [<code>MoneroBlocks</code>](#Drivers.MoneroBlocks)  
**Extends**: <code>fetchTotalSupply</code>  
<a name="Drivers.MoneroBlocks+fetchCirculatingSupply"></a>

#### moneroBlocks.fetchCirculatingSupply() ⇐ <code>fetchCirculatingSupply</code>
**Kind**: instance method of [<code>MoneroBlocks</code>](#Drivers.MoneroBlocks)  
**Extends**: <code>fetchCirculatingSupply</code>  
<a name="Drivers.MoneroBlocks+getSupply"></a>

#### moneroBlocks.getSupply() ⇐ <code>Driver.getSupply</code>
**Kind**: instance method of [<code>MoneroBlocks</code>](#Drivers.MoneroBlocks)  
**Extends**: <code>Driver.getSupply</code>  
**Overrides**: [<code>getSupply</code>](#Driver+getSupply)  
<a name="Drivers.NeoScan"></a>

### Drivers~NeoScan ⇐ <code>Driver</code>
NeoScan driver.

**Kind**: inner class of [<code>Drivers</code>](#Drivers)  
**Extends**: <code>Driver</code>  

* [~NeoScan](#Drivers.NeoScan) ⇐ <code>Driver</code>
    * [.fetchTotalSupply()](#Drivers.NeoScan+fetchTotalSupply) ⇐ <code>fetchTotalSupply</code>
    * [.fetchBalance(modifier)](#Drivers.NeoScan+fetchBalance) ⇐ <code>fetchBalance</code>
    * [.fetchAssetTotalSupply(reference)](#Drivers.NeoScan+fetchAssetTotalSupply) ⇐ <code>fetchAssetTotalSupply</code>
    * [.fetchAssetBalance(reference, modifier)](#Drivers.NeoScan+fetchAssetBalance) ⇐ <code>fetchAssetBalance</code>
    * [.getSupply(coin)](#Drivers.NeoScan+getSupply) ⇐ <code>Driver.getSupply</code>

<a name="Drivers.NeoScan+fetchTotalSupply"></a>

#### neoScan.fetchTotalSupply() ⇐ <code>fetchTotalSupply</code>
**Kind**: instance method of [<code>NeoScan</code>](#Drivers.NeoScan)  
**Extends**: <code>fetchTotalSupply</code>  
<a name="Drivers.NeoScan+fetchBalance"></a>

#### neoScan.fetchBalance(modifier) ⇐ <code>fetchBalance</code>
**Kind**: instance method of [<code>NeoScan</code>](#Drivers.NeoScan)  
**Extends**: <code>fetchBalance</code>  

| Param | Type |
| --- | --- |
| modifier | <code>referenceModifier</code> | 

<a name="Drivers.NeoScan+fetchAssetTotalSupply"></a>

#### neoScan.fetchAssetTotalSupply(reference) ⇐ <code>fetchAssetTotalSupply</code>
**Kind**: instance method of [<code>NeoScan</code>](#Drivers.NeoScan)  
**Extends**: <code>fetchAssetTotalSupply</code>  

| Param | Type |
| --- | --- |
| reference | [<code>referenceParam</code>](#referenceParam) | 

<a name="Drivers.NeoScan+fetchAssetBalance"></a>

#### neoScan.fetchAssetBalance(reference, modifier) ⇐ <code>fetchAssetBalance</code>
**Kind**: instance method of [<code>NeoScan</code>](#Drivers.NeoScan)  
**Extends**: <code>fetchAssetBalance</code>  

| Param | Type |
| --- | --- |
| reference | [<code>referenceParam</code>](#referenceParam) | 
| modifier | [<code>modifierParam</code>](#modifierParam) | 

<a name="Drivers.NeoScan+getSupply"></a>

#### neoScan.getSupply(coin) ⇐ <code>Driver.getSupply</code>
**Kind**: instance method of [<code>NeoScan</code>](#Drivers.NeoScan)  
**Extends**: <code>Driver.getSupply</code>  
**Overrides**: [<code>getSupply</code>](#Driver+getSupply)  

| Param | Type |
| --- | --- |
| coin | [<code>coinParam</code>](#coinParam) | 

<a name="Drivers.OmniExplorer"></a>

### Drivers~OmniExplorer ⇐ <code>Driver</code>
Omniexplorer driver. Supports circulating and max supply for tokens.

**Kind**: inner class of [<code>Drivers</code>](#Drivers)  
**Extends**: <code>Driver</code>  

* [~OmniExplorer](#Drivers.OmniExplorer) ⇐ <code>Driver</code>
    * [.fetchTotalSupply()](#Drivers.OmniExplorer+fetchTotalSupply) ⇐ <code>fetchTotalSupply</code>
    * [.fetchBalance(modifier)](#Drivers.OmniExplorer+fetchBalance) ⇐ <code>fetchBalance</code>
    * [.fetchAssetTotalSupply(reference)](#Drivers.OmniExplorer+fetchAssetTotalSupply) ⇐ <code>fetchAssetTotalSupply</code>
    * [.fetchAssetBalance(reference, modifier)](#Drivers.OmniExplorer+fetchAssetBalance) ⇐ <code>fetchAssetBalance</code>
    * [.getSupply(coin)](#Drivers.OmniExplorer+getSupply) ⇐ <code>Driver.getSupply</code>

<a name="Drivers.OmniExplorer+fetchTotalSupply"></a>

#### omniExplorer.fetchTotalSupply() ⇐ <code>fetchTotalSupply</code>
**Kind**: instance method of [<code>OmniExplorer</code>](#Drivers.OmniExplorer)  
**Extends**: <code>fetchTotalSupply</code>  
<a name="Drivers.OmniExplorer+fetchBalance"></a>

#### omniExplorer.fetchBalance(modifier) ⇐ <code>fetchBalance</code>
**Kind**: instance method of [<code>OmniExplorer</code>](#Drivers.OmniExplorer)  
**Extends**: <code>fetchBalance</code>  

| Param | Type |
| --- | --- |
| modifier | [<code>modifierParam</code>](#modifierParam) | 

<a name="Drivers.OmniExplorer+fetchAssetTotalSupply"></a>

#### omniExplorer.fetchAssetTotalSupply(reference) ⇐ <code>fetchAssetTotalSupply</code>
**Kind**: instance method of [<code>OmniExplorer</code>](#Drivers.OmniExplorer)  
**Extends**: <code>fetchAssetTotalSupply</code>  

| Param | Type |
| --- | --- |
| reference | [<code>referenceParam</code>](#referenceParam) | 

<a name="Drivers.OmniExplorer+fetchAssetBalance"></a>

#### omniExplorer.fetchAssetBalance(reference, modifier) ⇐ <code>fetchAssetBalance</code>
**Kind**: instance method of [<code>OmniExplorer</code>](#Drivers.OmniExplorer)  
**Extends**: <code>fetchAssetBalance</code>  

| Param | Type |
| --- | --- |
| reference | [<code>referenceParam</code>](#referenceParam) | 
| modifier | [<code>modifierParam</code>](#modifierParam) | 

<a name="Drivers.OmniExplorer+getSupply"></a>

#### omniExplorer.getSupply(coin) ⇐ <code>Driver.getSupply</code>
**Kind**: instance method of [<code>OmniExplorer</code>](#Drivers.OmniExplorer)  
**Extends**: <code>Driver.getSupply</code>  
**Overrides**: [<code>getSupply</code>](#Driver+getSupply)  

| Param | Type | Description |
| --- | --- | --- |
| coin | <code>object</code> | Needed coin data |

<a name="Drivers.Ripple"></a>

### Drivers~Ripple ⇐ <code>Driver</code>
Ripple driver.

**Kind**: inner class of [<code>Drivers</code>](#Drivers)  
**Extends**: <code>Driver</code>  

* [~Ripple](#Drivers.Ripple) ⇐ <code>Driver</code>
    * [.fetchTotalSupply()](#Drivers.Ripple+fetchTotalSupply) ⇐ <code>fetchTotalSupply</code>
    * [.fetchCirculatingSupply()](#Drivers.Ripple+fetchCirculatingSupply) ⇐ <code>fetchCirculatingSupply</code>
    * [.fetchMaxSupply()](#Drivers.Ripple+fetchMaxSupply) ⇐ [<code>fetchMaxSupply</code>](#Drivers.fetchMaxSupply)
    * [.getSupply()](#Drivers.Ripple+getSupply) ⇐ <code>Driver.getSupply</code>

<a name="Drivers.Ripple+fetchTotalSupply"></a>

#### ripple.fetchTotalSupply() ⇐ <code>fetchTotalSupply</code>
**Kind**: instance method of [<code>Ripple</code>](#Drivers.Ripple)  
**Extends**: <code>fetchTotalSupply</code>  
<a name="Drivers.Ripple+fetchCirculatingSupply"></a>

#### ripple.fetchCirculatingSupply() ⇐ <code>fetchCirculatingSupply</code>
**Kind**: instance method of [<code>Ripple</code>](#Drivers.Ripple)  
**Extends**: <code>fetchCirculatingSupply</code>  
<a name="Drivers.Ripple+fetchMaxSupply"></a>

#### ripple.fetchMaxSupply() ⇐ [<code>fetchMaxSupply</code>](#Drivers.fetchMaxSupply)
**Kind**: instance method of [<code>Ripple</code>](#Drivers.Ripple)  
**Extends**: [<code>fetchMaxSupply</code>](#Drivers.fetchMaxSupply)  
<a name="Drivers.Ripple+getSupply"></a>

#### ripple.getSupply() ⇐ <code>Driver.getSupply</code>
**Kind**: instance method of [<code>Ripple</code>](#Drivers.Ripple)  
**Extends**: <code>Driver.getSupply</code>  
**Overrides**: [<code>getSupply</code>](#Driver+getSupply)  
<a name="coinParam"></a>

## coinParam : [<code>Coin</code>](#Coin)
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
