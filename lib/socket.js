const io = require('socket.io-client');
const uuidv4 = require('uuid/v4');

const waitOn = (url, code) => new Promise((resolve, reject) => {
  const socket = io(url, {
    transports: ['websocket'],
    autoConnect: false,
  });

  socket.on('message', (data) => {
    if (data.code === code) {
      resolve(data.body);
      socket.close();
    }
  });

  socket.on('connect_error', (error) => {
    reject(error);
  });

  socket.on('error', (error) => {
    reject(error);
  });

  socket.open();
});

const request = (url, code) => new Promise((resolve, reject) => {
  const id = uuidv4();

  const socket = io(url, {
    transports: ['websocket'],
    autoConnect: false,
  });

  socket.on('connect', () => {
    socket.emit('message', {
      code,
      headers: {
        id,
        type: 1,
      },
      body: {},
    });
  });

  socket.on('message', (data) => {
    if (data.headers.id === id) {
      resolve(data.body);
      socket.close();
    }
  });

  socket.on('connect_error', (error) => {
    reject(error);
  });

  socket.on('error', (error) => {
    reject(error);
  });

  socket.open();
});

module.exports = { waitOn, request };
