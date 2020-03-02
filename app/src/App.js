import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Thermostat from './components/Thermostat';
import Slider from './components/Slider';
import Modes from './components/Modes';
import Utilities from './components/Utilities';
import WeatherForecast from './components/WeatherForecast';
import Statistic from './components/Statistic';
import {
  getDayArray,
  getMonthArray,
  getRandomInRange,
  getRandomArray,
  request,
} from './utils/functions';

const { Row, Column } = Grid;

class App extends Component {
  constructor() {
    super();

    this.state = {
      ambientTemperature: 65,
      desiredTemperature: 68,
      currentElectricityUsage: 7,
      electricalEfficiency: 80,
    };

    this.minTemperature = 50;
    this.maxTemperature = 85;

    const dayArray = getDayArray();
    const monthArray = getMonthArray();
    this.data = {
      dayArray,
      monthArray,
      other: {
        co2: getRandomInRange(1, 5),
      },
      electric: getRandomArray(dayArray.length, 1, 10),
      naturalgas: getRandomArray(monthArray.length, 18, 54),
      water: getRandomArray(monthArray.length, 2000, 10000),
    };
  }

  componentDidMount() {
    this.interval = setInterval(async () => {
      const data = await request('/');
      if (data) {
        if (Number.isInteger(data.ambientTemperature)) {
          this.setState({ ambientTemperature: data.ambientTemperature });
        }

        if (Number.isInteger(data.currentElectricityUsage)) {
          this.setState({ currentElectricityUsage: data.currentElectricityUsage });
        }

        if (Number.isInteger(data.electricalEfficiency)) {
          this.setState({ electricalEfficiency: data.electricalEfficiency });
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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

        <Row centered style={{ marginTop: '20px' }}>
          <Column width={4}>
            <Statistic
              title={`${this.state.currentElectricityUsage} kW`}
              subtitle="Current Electricity Usage"
            />
            <Statistic
              title={`${this.data.naturalgas[this.data.naturalgas.length - 1]} CCF`}
              subtitle="Current Natural Gas Usage"
            />
          </Column>
          <Column width={4}>
            <Statistic
              title={`${this.state.electricalEfficiency}%`}
              subtitle="Electricity Efficiency"
            />
            <Statistic title={`${this.data.other.co2} lbs`} subtitle={'CO\u{2082} Conserved'} />
          </Column>
          <Column width={8}>
            <WeatherForecast city="Columbus" latitude={40.014191} longitude={-83.030914} />
          </Column>
        </Row>
      </Grid>
    );
  }
}

export default App;
