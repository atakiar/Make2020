import arrayRotate from './arrayRotate';

const getMonthArray = () => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const currentMonth = new Date().getMonth();
  return arrayRotate(monthNames, currentMonth);
};

export default getMonthArray;
