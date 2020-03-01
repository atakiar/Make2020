import React, { Component } from 'react';
import ModeButton from './ModeButton';

class Modes extends Component {
  constructor() {
    super();

    this.state = {
      selected: 0,
    };

    this.modes = [
      {
        id: 0,
        name: 'Home',
        icon: 'home',
        desiredTemperature: 68,
      },
      {
        id: 1,
        name: 'Work',
        icon: 'briefcase',
        desiredTemperature: 62,
      },
      {
        id: 2,
        name: 'Night',
        icon: 'moon',
        desiredTemperature: 65,
      },
      {
        id: 3,
        name: 'Vacation',
        icon: 'plane',
        desiredTemperature: 62,
      },
    ];
  }

  onClick = (mode) => {
    this.props.setDesiredTemperate(mode.desiredTemperature);
    this.setState({ selected: mode.id });
  };

  render() {
    return (
      <div style={{ flexDirection: 'column' }}>
        {this.modes.map((mode) => (
          <div style={{ marginBottom: '10px' }}>
            <ModeButton
              name={mode.name}
              icon={mode.icon}
              selected={mode.id === this.state.selected}
              onClick={() => this.onClick(mode)}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default Modes;
