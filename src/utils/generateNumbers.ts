const generateNumbers = (min: number, max: number) => {
  let nums: number[] = [];
  while (nums.length < 16) {
    let numero = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!nums.includes(numero)) nums.push(numero);
  }
  return nums.sort((a, b) => a - b);
};

export default generateNumbers;
