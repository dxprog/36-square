const WebSocketServer = require('websocket').server;

const { setPixel, handleBoardMessage } = require('./board-interface');

let server;
let boardConnection;

function handleRequest(req) {
  if (/dxprog\.com/.test(req.origin)) {
    const connection = req.accept('36-square', req.origin);
    connection.on('message', handleMessage.bind(connection));
    connection.on('close', handleClose.bind(connection));
    console.log(`Connection request from ${req.origin} accepted`);
  } else {
    console.log(`Rejected connection request from ${req.origin}`);
    req.reject();
  }
}

function handleClientMessage(sender, data) {
  console.log(`Setting pixel ${data.x}x${data.y} = ${data.color.toString(16)}`);
  setPixel(data);
}

function handleMessage(msg) {
  let data;

  try {
    data = JSON.parse(msg.utf8Data);
  } catch (exc) {
    console.error(`Invalid message: ${JSON.stringify(msg)}`);
    return;
  }

  if (data.sender === 'client') {
    handleClientMessage(this, data.data);
  } else if (data.sender === 'board') {
    handleBoardMessage(this, data.data);
  } else {
    console.error(`Received message from unknown sender: ${data.sender}`);
  }
}

function handleClose(code, description) {

}

module.exports = function(httpServer) {
  server = new WebSocketServer({
    httpServer,
    audoAcceptConnections: false
  });
  server.on('request', handleRequest);
};