const arrayRotate = (array, times) => {
  for (let i = 0; i < times; i += 1) {
    array.push(array.shift());
  }

  return array;
};

const getDayArray = () => {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const currentDay = new Date().getDay();
  return arrayRotate(weekdays, currentDay);
};

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

const getRandomArray = (length, min, max) => Array.from({ length }, () => (Math.random() * (max - min + 1) + min).toFixed(2));

export {
  arrayRotate, getDayArray, getMonthArray, getRandomArray,
};
