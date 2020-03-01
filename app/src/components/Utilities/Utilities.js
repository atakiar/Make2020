import React from 'react';
import { GiWaterDrop, GiElectric } from 'react-icons/gi';
import { IoMdFlame } from 'react-icons/io';
import UtilityModal from './UtilityModal';
import colors from '../../utils/colors';

const Utilities = (props) => {
  const utilities = [
    {
      name: 'Electricity Usage',
      trigger: {
        name: 'Electric',
        icon: <GiElectric />,
      },
      chart: {
        options: {
          dataLabels: { enabled: false },
          stroke: { curve: 'smooth' },
          xaxis: { categories: props.data.dayArray },
          yaxis: { title: { text: 'Usage (kW)' } },
          colors: [colors.electric],
        },
        series: [{ name: 'kW', data: props.data.electric }],
      },
    },
    {
      name: 'Natural Gas Usage',
      trigger: {
        name: 'Natural Gas',
        icon: <IoMdFlame />,
      },
      chart: {
        options: {
          dataLabels: { enabled: false },
          stroke: { curve: 'smooth' },
          xaxis: { categories: props.data.monthArray },
          yaxis: { title: { text: 'Usage (CCF)' } },
          colors: [colors.naturalgas],
        },
        series: [{ name: 'CCF', data: props.data.naturalgas }],
      },
    },
    {
      name: 'Water Usage',
      trigger: {
        name: 'Water',
        icon: <GiWaterDrop />,
      },
      chart: {
        options: {
          dataLabels: { enabled: false },
          stroke: { curve: 'smooth' },
          xaxis: { categories: props.data.monthArray },
          yaxis: { title: { text: 'Usage (gallons)' } },
          colors: [colors.water],
        },
        series: [{ name: 'gallon', data: props.data.water }],
      },
    },
  ];

  return (
    <div style={{ flexDirection: 'column' }}>
      {utilities.map((utility) => (
        <div style={{ marginBottom: '10px' }}>
          <UtilityModal
            name={utility.name}
            chartOptions={utility.chart.options}
            chartSeries={utility.chart.series}
            triggerName={utility.trigger.name}
            triggerIcon={utility.trigger.icon}
          />
        </div>
      ))}
    </div>
  );
};

export default Utilities;
