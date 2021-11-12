export const calcPercentage = function (number) {
  if (number !== '0') {
    return parseFloat((parseFloat(number) / 100).toFixed(12));
  }
};

export const plusMinus = function (result) {
  if (result === 0) return result;
  return -parseFloat(result);
};
