import React from 'react';
import Iframe from 'react-iframe';
import colors from '../utils/colors';

const WeatherForecast = (props) => {
  let url = 'https://forecast.io/embed/#';
  url += `name=${props.city}`;
  url += `&lat=${props.latitude}`;
  url += `&lon=${props.longitude}`;
  url += `&color=${colors.primary}`;
  url += '&units=us';

  return (
    <Iframe
      title="WeatherForecast"
      id="forecast_embed"
      frameBorder={0}
      height={300}
      width="100%"
      url={url}
      display="initial"
      position="relative"
    />
  );
};

export default WeatherForecast;
