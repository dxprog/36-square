import * as React from 'react';

import { padNum } from '../util';

interface ColorPickerProps {
  onClick: Function
}

export default class ColorPicker extends React.Component<ColorPickerProps, {}> {
  private colors: Array<Number> = [
    0x800000,
    0xff0000,
    0xff8000,
    0xffff00,
    0x80ff00,
    0x008000,
    0x00ff00,
    0x00ff80,
    0x00ffff,
    0x0080ff,
    0x000080,
    0x0000ff,
    0x8000ff,
    0xff00ff,
    0xff0080,
    0xffffff,
    0x000000
  ];

  handleColorClick(evt: any) {
    this.props.onClick(parseInt(evt.currentTarget.getAttribute('data-color')));
  }

  render() {
    return (
      <ul className="color-picker">
        {this.colors.map((color, index) => {
          const style = {
            'background-color': `#${padNum(color.toString(16), 6)}`
          };
          return <li key={index} className="picker-color" data-color={color} style={style} onClick={this.handleColorClick.bind(this)}>{color}</li>;
        })}
      </ul>
    );
  }

}