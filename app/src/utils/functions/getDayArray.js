import arrayRotate from './arrayRotate';

const getDayArray = () => {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const currentDay = new Date().getDay();
  return arrayRotate(weekdays, currentDay);
};

export default getDayArray;
