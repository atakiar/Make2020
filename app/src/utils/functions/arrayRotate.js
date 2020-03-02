const arrayRotate = (array, times) => {
  for (let i = 0; i < times; i += 1) {
    array.push(array.shift());
  }

  return array;
};

export default arrayRotate;
