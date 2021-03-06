const supplies = require('..');

const { Coin } = supplies;

const drivers = supplies.selectDriversByBlockchain('Stellar');

const driver = new supplies[drivers[0]]();

const coin = new Coin({
  name: 'Diruna',
  symbol: 'DRA',
  reference: 'DRA-GCJKSAQECBGSLPQWAU7ME4LVQVZ6IDCNUA5NVTPPCUWZWBN5UBFMXZ53',
  modifiers: [
    'GAZEN4A4O46VUYCRMUBVPDQ6YTWF4ZSCE4Y3PKCZ3GSKCKU556NM2U5D',
    'GDKODINGMBMYDQESMBQO6M2G3AGAEEFPPBERILEF4G7INZZFLVJSDJ67',
    'GCVSWYNTAN253YGUSBUJ743BI6VPLUTPFDU42NFVWJ4CCHPWUPZ6BTSF',
    'GCJ25DM72KJ2P5R3AS65V44RANWFIVAWMODA27M53HXN5NMQGUKWMUSV',
  ],
});

driver
  .getSupply(coin)
  .then((supply) => {
    console.log(supply);
  });
