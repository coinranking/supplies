const supplies = require('../');

const { Coin } = supplies;

const modifiers = [
  'GANOI26P6VAUL4NFVA4FAIOIBOR46NORONBIWUPRIGAMP7T5W5MOY4O6',
  'GAX3BRBNB5WTJ2GNEFFH7A4CZKT2FORYABDDBZR5FIIT3P7FLS2EFOZZ',
  'GB6NVEN5HSUBKMYCE5ZOWSK5K23TBWRUQLZY3KNMXUZ3AQ2ESC4MY4AQ',
  'GDKIJJIKXLOM2NRMPNQZUUYK24ZPVFC6426GZAEP3KUK6KEJLACCWNMX',
  'GDUY7J7A33TQWOSOQGDO776GGLM3UQERL4J3SPT56F6YS4ID7MLDERI4',
];

const drivers = supplies.selectDriversByBlockchain('Stellar');

const driver = new supplies[drivers[0]]();

const coin = new Coin({ modifiers });

driver
  .getSupply(coin)
  .then((supply) => {
    console.log(supply);
  });
