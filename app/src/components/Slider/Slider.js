import React from 'react';
import './Slider.css';

const Slider = (props) => (
  <input
    className="slider"
    id="ThermostatRange"
    type="range"
    step={1}
    min={props.min}
    max={props.max}
    value={props.value}
    onInput={props.onChange}
    onChange={props.onChange}
  />
);

export default Slider;
