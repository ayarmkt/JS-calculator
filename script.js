const calculator = document.querySelector('.calculator');
const buttons = calculator.querySelector('.buttons');

const process = calculator.querySelector('.process');
const result = calculator.querySelector('.result');

// let lastTyped;
// let calcResult;
// let lastNum = '';
// let curNum = '';

let prevKey = '';
let prevOperator = '';
let firstNum = '';
let secondNum = '';
let sum = '';

/////HELPER FUNCTION/////
//

const displayInProcess = function (key) {
  process.textContent = `${firstNum} ${key.textContent}`;
};

const resetVariables = function () {
  secondNum = '';
  sum = '';
};

const emptyResult = function () {
  result.textContent = '';
};

/////FUNCTION/////
//

const calculate = function (key, firstNum) {
  secondNum = result.textContent;
  switch (key && key.dataset.action) {
    case 'add':
      sum = parseFloat(firstNum) + parseFloat(secondNum);
      break;
    case 'subtract':
      sum = parseFloat(firstNum) - parseFloat(secondNum);
      break;
    case 'multiply':
      sum = parseFloat(firstNum) * parseFloat(secondNum);
      break;
    case 'divide':
      sum = parseFloat(firstNum) / parseFloat(secondNum);
      break;
  }
};

const handleOperator = function (key, prevKey) {
  if (prevKey && prevKey.matches('.operator')) {
    if (prevKey.dataset.action === 'calculate' && result.textContent !== '0') {
      console.log('NEED TO SUM, AND MAKE THE SUM THE FIRST');
      calculate(prevOperator, firstNum);
      firstNum = result.textContent;
      displayInProcess(key);
      resetVariables();
      emptyResult();
    } else if (process.textContent) {
      console.log('CHANGE OPERATOR');
      displayInProcess(key);
    } else {
      console.log('error 2');
    }
  } else if (firstNum) {
    console.log('NEED TO SUM, AND MAKE THE SUM THE FIRST');
    calculate(prevOperator, firstNum);
    firstNum = sum;
    displayInProcess(key);
    resetVariables();
    result.textContent = '';
  } else if (
    !firstNum &&
    prevKey &&
    (key.dataset.action === 'subtract' || key.dataset.action === 'add')
  ) {
    console.log('FIRST NUMBER TYPED, WAITING FOR SECOND NUMBER');
    firstNum = result.textContent;
    displayInProcess(key);
    emptyResult();
  } else if (
    key.dataset.action === 'divide' ||
    key.dataset.action === 'multiply'
  ) {
    console.log('NEED TO TYPE NUMBER');
  } else {
    console.log('error');
  }

  prevOperator = key;

  key.classList.add('isSelected');
};

const clear = function () {
  process.textContent = '';
  result.textContent = '0';
  prevKey = '';
  prevOperator = '';
  sum = '';
  firstNum = '';
  secondNum = '';
  console.log(firstNum, secondNum);
};

const plusMinus = function () {
  result.textContent = -parseFloat(result.textContent);
};

const calcPercentage = function () {
  if (result.textContent !== '0') {
    result.textContent = parseFloat(result.textContent) / 100;
  }
};

const displayDecimal = function (key) {
  result.textContent += key.textContent;
  //decimal not 2 or more in a row
};

const displayNumber = function (key) {
  if (result.textContent === '0') {
    result.textContent = key.textContent;
  } else {
    result.textContent += key.textContent;
  }
};

/////EVENT/////
//
//window.addEventListener('DOMContentLoaded', clear);
buttons.addEventListener('click', function (e) {
  const key = e.target;
  const action = key.dataset.action;

  if (!key.matches('button')) return;
  //if ((prevKey.dataset.action = 'calculate')) clear();

  switch (action) {
    case 'add':
    case 'subtract':
    case 'multiply':
    case 'divide':
      //change color to hold button, also when you press other operators the button will change

      handleOperator(key, prevKey);

      break;

    case 'calculate':
      //its equal
      console.log(`its equal`);
      calculate(prevOperator, firstNum);
      console.log(firstNum);
      console.log(sum);
      result.textContent = sum === '' ? '0' : sum;
      firstNum = result.textContent;
      process.textContent = '';
      sum = '';
      //also want to change the operator color style back to default
      break;

    case 'clear':
      clear();
      //also want to change the operator color style back to default
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
      if (prevKey && prevKey.dataset.action === 'calculate') {
        clear();
        displayNumber(key);
      } else {
        displayNumber(key);
      }
      //also want to change the operator color style back to default
      break;
  }

  prevKey = key;
});
