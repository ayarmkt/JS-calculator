const calculator = document.querySelector('.calculator');
const buttons = calculator.querySelector('.buttons');

const process = calculator.querySelector('.process');
const result = calculator.querySelector('.result');

let prevKey = '';
let prevOperator = '';
let firstNum = 0;
let secondNum = 0;
let sum = 0;

//NEED TO FIX STYLE FOR BUTTON HOLD LATER
//change color to hold button, also when you press other operators the button will change
//FIX RESULT NUMBER LENGTH
//after equal you decide to continue the calculation with other operations
//when i do 0.3-0.2 the result get super big
//smthg wrong when i do 6*9*

/////HELPER FUNCTION/////
//

const displayInProcess = function (key) {
  process.textContent = `${firstNum} ${key.textContent}`;
};

const resetVariables = function () {
  secondNum = 0;
  sum = 0;
};

const emptyResult = function () {
  result.textContent = '';
};

const onlySubtractAdd = function (key) {
  if (key.dataset.action === 'subtract' || key.dataset.action === 'add') {
    console.log('you can only subtract or add');
    firstNum = result.textContent;
    displayInProcess(key);
    emptyResult();
  } else {
    console.log('cant type this key');
  }
};

/////FUNCTION/////
//

const calculate = function (key, firstNum) {
  secondNum = result.textContent;
  console.log(firstNum, secondNum);
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
      console.log(sum);

      firstNum = sum === '' ? '0' : sum;
  }
};

const handleOperator = function (key, prevKey) {
  console.log('function working');
  console.log(prevKey);

  if (!prevKey) {
    onlySubtractAdd(key);
  }

  if (prevKey) {
    if (prevKey.matches('.operator') && firstNum) {
      //change op
      console.log('CHANGE OPERATOR');
      displayInProcess(key);
    } else if (prevKey.matches('.number') && !firstNum) {
      console.log('FIRST NUMBER TYPED, WAITING FOR SECOND NUMBER');
      firstNum = result.textContent;
      displayInProcess(key);
      emptyResult();
      console.log(firstNum, secondNum);
    } else if (
      key.matches('.operator') ||
      (prevKey.dataset.action ===
        ('calculate' || 'plusminus' || 'percentage') &&
        firstNum)
    ) {
      console.log('NEED TO SUM, AND MAKE THE SUM THE FIRST');
      calculate(prevOperator, firstNum);
      firstNum = result.textContent;
      console.log(firstNum);
      displayInProcess(key);
      resetVariables();
      emptyResult();
    } else if (result.textContent === '' || process.textContent === '') {
      onlySubtractAdd(key);
    } else {
      console.log('smthgs wrong');
    }
  }

  prevOperator = key;
  //key.classList.add('isSelected');
};

const clear = function () {
  process.textContent = '';
  result.textContent = '0';
  prevKey = '';
  prevOperator = '';
  sum = 0;
  firstNum = 0;
  secondNum = 0;
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
  if (prevKey && prevKey.dataset.action === 'decimal') return;
  if (result.textContent === '') {
    result.textContent = `0${key.textContent}`;
  } else {
    result.textContent += key.textContent;
  }
};

const displayNumber = function (key) {
  if (result.textContent === '0') {
    console.log(result.textContent);
    console.log('there is a zero');
    result.textContent = key.textContent;
    console.log(result.textContent);
  } else {
    console.log(result.textContent);
    console.log('there is a number');
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

  if (prevKey && prevKey.dataset.action === 'calculate') clear();

  switch (action) {
    case 'add':
    case 'subtract':
    case 'multiply':
    case 'divide':
      handleOperator(key, prevKey);
      break;

    case 'calculate':
      //its equal
      console.log(`CALCULATION DONE`);
      calculate(prevOperator, firstNum);
      console.log(firstNum, secondNum);
      console.log(sum);
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
      displayNumber(key);
    //also want to change the operator color style back to default
  }

  prevKey = key;
});
