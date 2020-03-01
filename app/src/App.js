import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Thermostat from './components/Thermostat';
import Slider from './components/Slider';
import Modes from './components/Modes';
import Utilities from './components/Utilities';
import WeatherForecast from './components/WeatherForecast';
import { getDayArray, getMonthArray, getRandomArray } from './utils/functions';

const { Row, Column } = Grid;

class App extends Component {
  constructor() {
    super();

    this.state = {
      ambientTemperature: 65,
      desiredTemperature: 68,
    };

    this.minTemperature = 50;
    this.maxTemperature = 85;

    const dayArray = getDayArray();
    const monthArray = getMonthArray();
    this.data = {
      dayArray,
      monthArray,
      electric: getRandomArray(dayArray.length, 1, 10),
      naturalgas: getRandomArray(monthArray.length, 18, 54),
      water: getRandomArray(monthArray.length, 2000, 10000),
    };
  }

  handleThermostatChange = (event) => {
    this.setState({ desiredTemperature: event.target.value });
  };

  setDesiredTemperate = (desiredTemperature) => {
    this.setState({ desiredTemperature });
  };

  render() {
    return (
      <Grid style={{ margin: '20px' }}>
        <Row centered>
          <Column width={6}>
            <Thermostat
              minValue={this.minTemperature}
              maxValue={this.maxTemperature}
              ambientTemperature={this.state.ambientTemperature}
              desiredTemperature={this.state.desiredTemperature}
            />
            <Slider
              min={this.minTemperature}
              max={this.maxTemperature}
              value={this.state.desiredTemperature}
              onChange={this.handleThermostatChange}
            />
          </Column>

          <Column width={6}>
            <Modes setDesiredTemperate={this.setDesiredTemperate} />
          </Column>

          <Column width={4}>
            <Utilities data={this.data} />
          </Column>
        </Row>

        <Row centered style={{ marginTop: '40px' }}>
          <Column>
            <WeatherForecast city="Columbus" latitude={40.014191} longitude={-83.030914} />
          </Column>
        </Row>
      </Grid>
    );
  }
}

export default App;
