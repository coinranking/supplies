const fs = require('fs');
const Filehound = require('filehound');

const getBlockchains = async () => {
  const blockchains = await Filehound.create()
    .path('blockchains')
    .directory() // only search for directories
    .find();

  console.log(blockchains);
  return blockchains;
};

const getCoins = blockchain => new Promise((resolve, reject) => {
  fs.readFile(`./blockchains/${blockchain}/coins.json`, 'utf8', (error, data) => {
    if (error) {
      if (error.code === 'ENOENT') {
        return reject(new Error('Blockchain not supported'));
      }
      return reject(error);
    }
    try {
      const coins = JSON.parse(data);
      return resolve(coins);
    } catch (parseError) {
      return reject(new Error('Incorrect JSON'));
    }
  });
});

const getSupply = (blockchain, reference) => {

};

module.exports = {
  getBlockchains,
  getCoins,
  getSupply,
};
