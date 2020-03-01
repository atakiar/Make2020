import React from 'react';
import { GiWaterDrop, GiElectric } from 'react-icons/gi';
import { IoMdFlame } from 'react-icons/io';
import UtilityModal from './UtilityModal';
import colors from '../../utils/colors';
import { getDayArray, getMonthArray, getRandomArray } from '../../utils/functions';

const Utilities = () => {
  const dayArray = getDayArray();
  const monthArray = getMonthArray();

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
          xaxis: { categories: dayArray },
          yaxis: { title: { text: 'Usage (kW)' } },
          colors: [colors.electric],
        },
        series: [{ name: 'kW', data: getRandomArray(dayArray.length, 1, 10) }],
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
          xaxis: { categories: monthArray },
          yaxis: { title: { text: 'Usage (gallons)' } },
          colors: [colors.water],
        },
        series: [{ name: 'gallon', data: getRandomArray(monthArray.length, 18, 54) }],
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
          xaxis: { categories: monthArray },
          yaxis: { title: { text: 'Usage (CCF)' } },
          colors: [colors.naturalgas],
        },
        series: [{ name: 'CCF', data: getRandomArray(monthArray.length, 2000, 10000) }],
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
