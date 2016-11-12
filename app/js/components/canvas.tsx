import * as React from 'react';

interface CanvasProps {
  cols: number;
  rows: number;
  tileSize: number;
  onClick?: Function;
}

function padNum(str: string, len: number): string {
  while (str.length < len) {
    str = '0' + str;
  }
  return str;
}

export default class Canvas extends React.Component<CanvasProps, {}> {

  refs: {
    [key: string]: (Element);
    canvas: HTMLCanvasElement;
  }

  /**
   * Handle to the canvas element
   */
  canvas: HTMLCanvasElement;

  /**
   * The number of canvas pixels per column
   */
  widthPerCol: number;

  /**
   * The number of canvas pixels per row
   */
  heightPerRow: number;

  /**
   * Pixel data
   */
  pixelData: Uint32Array;

  /*******************************
   *  LIFECYCLE METHODS
   ******************************/

  constructor(props: CanvasProps) {
    super(props);

    this.pixelData = new Uint32Array(props.cols * props.rows);
  }

  render() {
    const width = this.props.cols * this.props.tileSize;
    const height = this.props.rows * this.props.tileSize;

    return <canvas ref="canvas" width={width} height={height} onClick={this.handleCanvasClick.bind(this)} />;
  }

  protected componentDidMount() {
    this.canvas = this.refs.canvas;
    this.widthPerCol = this.canvas.width / this.props.cols;
    this.heightPerRow = this.canvas.height / this.props.rows;
    this.renderCanvas();
  }

  /*******************************
   *  EVENT HANDLERS
   ******************************/

  private handleCanvasClick(evt: MouseEvent) {
    const { onClick } = this.props;

    if (onClick) {
      onClick({
        x: Math.floor(evt.clientX / this.widthPerCol),
        y: Math.floor(evt.clientY / this.heightPerRow)
      });
    }
  }

  /*******************************
   *  PUBLIC METHODS
   ******************************/

  setPixel(x: number, y:number, color: number) {
    if (x >= this.props.cols || x < 0) {
      throw new Error(`${x} is outside of canvas bounds. Width is ${this.props.cols}`);
    }

    if (y >= this.props.rows || y < 0) {
      throw new Error(`${y} is outside of canvas bounds. Height is ${this.props.rows}`);
    }

    const index = y * this.props.cols + x;
    this.pixelData[index] = color;

    this.renderCanvas();
  }

  /*******************************
   *  PRIVATE METHODS
   ******************************/
  private renderCanvas() {
    const ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
    const { width, height } = this.canvas;

    ctx.clearRect(0, 0, width, height);

    this.pixelData.forEach((color, index) => {
      const x = (index % this.props.cols) * this.widthPerCol;
      const y = Math.floor(index / this.props.cols) * this.heightPerRow;
      ctx.fillStyle = `#${padNum(color.toString(16), 6)}`;
      ctx.fillRect(x, y, this.widthPerCol, this.heightPerRow);
    });
  }

}