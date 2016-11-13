import * as React from 'react';

import { padNum } from '../util';

interface ColorPickerProps {
  onClick: Function
}

export default class ColorPicker extends React.Component<ColorPickerProps, {}> {
  private colors: Array<Number> = [
    0xffffff,
    0xff0000,
    0x00ff00,
    0x0000ff,
    0x000000
  ];

  handleColorClick(evt: any) {
    this.props.onClick(parseInt(evt.currentTarget.getAttribute('data-color')));
  }

  render() {
    return (
      <ul>
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