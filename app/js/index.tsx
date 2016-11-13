import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Canvas from './components/canvas';
import ColorPicker from './components/color-picker';
import Socket from './socket';

const body = document.getElementById('body');

const BOARD_COLS = 6;
const BOARD_ROWS = 6;

const pixelData = new Uint32Array(BOARD_COLS * BOARD_ROWS);
let canvas: Canvas;
let currentColor: number = 0xffffff;

function handleSocketOpen() {
  console.log('socket is open');
}

function handleColorChange(color: number) {
  currentColor = color;
}

function handleCanvasClicked(coords: any) {
  canvas.setPixel(coords.x, coords.y, currentColor);
  socket.sendData({
    x: coords.x,
    y: coords.y,
    color: currentColor
  });
}

const socket = new Socket('ws://debian-server', 8888);
socket.on('open', handleSocketOpen);

ReactDOM.render((
  <div>
    <Canvas ref={obj => canvas = obj} cols={BOARD_COLS} rows={BOARD_ROWS} tileSize={100} onClick={handleCanvasClicked} />
    <ColorPicker onClick={handleColorChange} />
  </div>
), body);