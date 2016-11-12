const strand = require('rpi-ws281x-native');
const WebSocketClient = require('websocket').client;

const BOARD_WIDTH = 6;
const BOARD_HEIGHT = 6;
const NUM_LEDS = BOARD_WIDTH * BOARD_HEIGHT;
const pixelData = new Uint32Array(NUM_LEDS).fill(0);

// The map of what LED is physically where
const PIXEL_REMAP = (new Uint16Array(NUM_LEDS)).map((value, index) => {
  let x = index % BOARD_WIDTH;
  let y = Math.floor(index / BOARD_WIDTH);
  x = y % 2 === 0 ? Math.abs(x - 5) : x;
  return y * BOARD_WIDTH + x;
});

strand.init(NUM_LEDS);
strand.setIndexMapping(PIXEL_REMAP);

// ---- trap the SIGINT and reset before exit
process.on('SIGINT', () => {
  strand.reset();
  process.nextTick(() => process.exit(0));
});

function setPixel(x, y, color) {
  const index = y * BOARD_WIDTH + x;
  pixelData[index] = color;
}

function render() {
  strand.render(pixelData);
}

function handleError(err) {
  console.error(`Connection error: ${err}`);
}

function handleClose() {
  console.log('Connection closed');
}

function handleMessage(msg) {
  if (msg.type === 'utf8') {
    let data;
    try {
      data = JSON.parse(msg.utf8Data);
    } catch (exc) {
      console.error(`Invalid data received: ${exc}`);
      return;
    }

    console.log(`Setting pixel ${data.x}x${data.y} to ${data.color.toString(16)}`);
    setPixel(data.x, data.y, data.color);
    render();
  }
}

const client = new WebSocketClient();
client.on('connect', connection => {
  console.log('Connected to lights socket');

  // Set up event handlers
  connection.on('error', handleError.bind(connection));
  connection.on('message', handleMessage.bind(connection));
  connection.on('close', handleClose.bind(connection));

  // Let the service know we're ready to receive commands
  connection.sendUTF(JSON.stringify({
    sender: 'board',
    data: {
      action: 'register'
    }
  }));
});

client.on('connectFailed', err => {
  console.error(err);
});

setInterval(render, 100);

client.connect('ws://debian-server:8888/', '36-square', 'dev.dxprog.com');
