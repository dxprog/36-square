import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Canvas from './components/canvas';
import Socket from './socket';

const body = document.getElementById('body');

const BOARD_COLS = 6;
const BOARD_ROWS = 6;

const pixelData = new Uint32Array(BOARD_COLS * BOARD_ROWS);
let canvas: Canvas;

function handleSocketOpen() {
  console.log('socket is open');
}

function handleCanvasClicked(coords: any) {
  const color = 0xffffff;
  canvas.setPixel(coords.x, coords.y, color);
  socket.sendData({
    x: coords.x,
    y: coords.y,
    color
  });
}

const socket = new Socket('ws://debian-server', 8888);
socket.on('open', handleSocketOpen);

ReactDOM.render(<Canvas ref={obj => canvas = obj} cols={BOARD_COLS} rows={BOARD_ROWS} tileSize={100} onClick={handleCanvasClicked} />, body);