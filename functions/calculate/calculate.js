export const calculate = function (keyAction, firstNum, secondNum) {
  let sum;
  switch (keyAction) {
    case 'add':
      sum = (parseFloat(firstNum) * 10 + parseFloat(secondNum) * 10) / 10;
      break;
    case 'subtract':
      sum = (parseFloat(firstNum) * 10 - parseFloat(secondNum) * 10) / 10;
      break;
    case 'multiply':
      sum = parseFloat(
        (parseFloat(firstNum) * parseFloat(secondNum)).toFixed(12)
      );
      break;
    case 'divide':
      sum = parseFloat(
        (parseFloat(firstNum) / parseFloat(secondNum)).toFixed(12)
      );
      break;
  }
  return sum;
};
