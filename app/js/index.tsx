import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Canvas from './components/canvas';

const body = document.getElementById('body');
let canvas: Canvas;

function handleCanvasClicked(coords: any) {
  console.log(coords.x, coords.y);
  canvas.setPixel(coords.x, coords.y, 0xffffff);
}

ReactDOM.render(<Canvas ref={obj => canvas = obj} rows={6} cols={6} tileSize={100} onClick={handleCanvasClicked} />, body);