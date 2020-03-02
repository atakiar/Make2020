import getRandomInRange from './getRandomInRange';

const getRandomArray = (length, min, max) => Array.from({ length }, () => getRandomInRange(min, max));

export default getRandomArray;
