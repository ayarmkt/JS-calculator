const calculator = document.querySelector('.calculator');
const buttons = calculator.querySelector('.buttons');
const operators = calculator.querySelectorAll('.operator');
const process = calculator.querySelector('.process');
const result = calculator.querySelector('.result');

let prevKey = '';
let prevOperator = '';
let firstNum = 0;
let secondNum = 0;
let sum = 0;

//
/////HELPER FUNCTION/////
//
const onlySubtractAdd = function (key) {
  if (
    key &&
    (key.dataset.action === 'subtract' || key.dataset.action === 'add')
  ) {
    firstNum = result.textContent;
    process.textContent = `${firstNum} ${key.textContent}`;
    result.textContent = '';
  }
};

const displayFromResultToProcess = function (key) {
  displayProcess(key);
  result.textContent = '';
};

const displayProcess = function (key) {
  process.textContent = `${firstNum} ${key.textContent}`;
};

const resetVariables = function () {
  secondNum = 0;
  sum = 0;
};

//
/////FUNCTION/////
//
const calculate = function (key, firstNum) {
  secondNum = result.textContent;

  switch (key && key.dataset.action) {
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
};

const handleOperator = function (key, prevKey) {
  if (!prevKey) onlySubtractAdd(key);

  if (prevKey.dataset.action === 'calculate') {
    firstNum = result.textContent;
    displayFromResultToProcess(key);
    resetVariables();
  }

  if (prevKey.matches('.operator') && firstNum) {
    prevKey.classList.remove('isSelected');
    displayProcess(key);
  }

  if (prevKey.matches('.number') && !firstNum) {
    firstNum = result.textContent;
    displayFromResultToProcess(key);
  }

  if (
    firstNum &&
    result.textContent !== '' &&
    prevKey.dataset.action !== 'calculate'
  ) {
    calculate(prevOperator, firstNum);
    firstNum = sum;
    displayFromResultToProcess(key);
    resetVariables();
  }

  if (result.textContent === '0' && process.textContent === '') {
    onlySubtractAdd(key);
  }

  prevOperator = key;
  key.classList.add('isSelected');
};

const clear = function () {
  process.textContent = '';
  result.textContent = '0';
  prevKey = '';
  prevOperator = '';
  sum = 0;
  firstNum = 0;
  secondNum = 0;
  operators.forEach((op) => op.classList.remove('isSelected'));
};

const plusMinus = function () {
  result.textContent = -parseFloat(result.textContent);
};

const calcPercentage = function () {
  if (result.textContent !== '0') {
    result.textContent = parseFloat(
      (parseFloat(result.textContent) / 100).toFixed(12)
    );
  }
};

const displayDecimal = function (key) {
  if (prevKey && prevKey.dataset.action === 'decimal') return;
  if (prevKey && prevKey.dataset.action === 'calculate') clear();
  if (result.textContent === '') {
    result.textContent = `0${key.textContent}`;
  } else {
    result.textContent += key.textContent;
  }
};

const displayNumber = function (key) {
  if (prevKey && prevKey.dataset.action === 'calculate') clear();
  if (result.textContent === '0') {
    result.textContent = key.textContent;
  } else {
    result.textContent += key.textContent;
  }
};

//
/////EVENT/////
//
window.addEventListener('DOMContentLoaded', clear);

buttons.addEventListener('click', function (e) {
  const key = e.target;
  const action = key.dataset.action;

  if (!key.matches('button')) return;

  switch (action) {
    case 'add':
    case 'subtract':
    case 'multiply':
    case 'divide':
      handleOperator(key, prevKey);
      break;

    case 'calculate':
      calculate(prevOperator, firstNum);
      result.textContent = sum;
      process.textContent = '';
      sum = '';

      if (prevKey && prevKey.matches('.operator')) {
        result.textContent = firstNum;
        prevKey.classList.remove('isSelected');
      }
      break;

    case 'clear':
      clear();
      break;

    case 'plusminus':
      plusMinus();
      break;

    case 'percentage':
      calcPercentage();
      break;

    case 'decimal':
      displayDecimal(key);
      break;

    default:
      displayNumber(key);
      if (prevKey && prevKey.matches('.operator'))
        prevKey.classList.remove('isSelected');
  }

  prevKey = key;
});
