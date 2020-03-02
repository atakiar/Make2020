const getRandomInRange = (min, max) => (Math.random() * (max - min + 1) + min).toFixed(2);

export default getRandomInRange;
