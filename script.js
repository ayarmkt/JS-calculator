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

const displayInProcess = function (key) {
  process.textContent = `${firstNum} ${key.textContent}`;
};

const handleOperator = function (key, prevKey) {
  if (prevKey && prevKey.matches('.operator')) {
    displayInProcess(key);
  } else if (firstNum) {
    console.log('NEED TO SUM, AND MAKE THE SUM THE FIRST');
    console.log(firstNum, secondNum);
    calculate(prevOperator, firstNum);
    firstNum = sum;
    secondNum = '';
    sum = '';
    displayInProcess(key);
    result.textContent = '';
  } else if ((!firstNum && prevKey) || prevKey.dataset.action === 'calculate') {
    //when first key is operator
    //when you type only operators or funct
    //after equal, the result number becomes the first number and calculates again
    console.log('FIRST NUMBER TYPED, WAITING FOR SECOND NUMBER');
    console.log(firstNum, secondNum);
    firstNum = result.textContent;
    displayInProcess(key);
    result.textContent = '';
  } else if (!prevKey) {
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
      result.textContent = sum;
      firstNum = result.textContent;
      process.textContent = '';
      sum = '';
      //also want to change the operator color style back to default

      calculate(key, firstNum);
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
