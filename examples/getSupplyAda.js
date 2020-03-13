const supplies = require('..');

const { Coin } = supplies;

const modifiers = [
  'Ae2tdPwUPEYyVPUHmDGGLy75Yx4rvcZGygbYXQi4b2jP7T1qyGYhXa8JH3d',
  'DdzFFzCqrhsgwQmeWNBTsG8VjYunBLK9GNR93GSLTGj1FeMm8kFoby2cTHxEHBEraHQXmgTtFGz7fThjDRNNvwzcaw6fQdkYySBneRas',
  'DdzFFzCqrhswLoNLM6dn65iREcgnKeYpPq8FZQ2G83MmGKZGwQXPhFRYGERa9Reh7YT1gzZNrQSvKVNVtEDQTFY9w8hiQp7y1fhU693a',
  'DdzFFzCqrht2WKNEFqHvMSumSQpcnMxcYLNNBXPYXyHpRk9M7PqVjZ5ysYzutnruNubzXak2NxT8UWTFQNzc77uzjQ1GtehBRBdAv7xb',
];

const drivers = supplies.selectDriversByBlockchain('Cardano');

const driver = new supplies[drivers[0]]();

const coin = new Coin({ modifiers });

driver
  .getSupply(coin)
  .then((supply) => {
    console.log(supply);
  });
