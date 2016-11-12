const express = require('express');

const wsServer = require('./websocket-server');

const PORT = 8888;

// Fire up the express app
const app = express();
const server = app.listen(PORT, err => {
  if (!err) {
    console.log(`Listening on port ${PORT}`);
    wsServer(server);
  } else {
    console.error(err);
  }
});