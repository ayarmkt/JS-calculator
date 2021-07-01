const buttons = document.querySelectorAll('button');
const calculation = document.querySelector('.calculation');
const result = document.querySelector('.result');

let lastTyped;
//let lastResult;

/////FUNCTION/////
//
const clear = function () {
  result.textContent = '0';
  calculation.textContent = '';
};

const calculate = function (prev, cur) {
  let calcResult;

  //no prev
  if (e.target.textContent === '+') calcResult = prev + cur;
  if (e.target.textContent === '-') calcResult = prev - cur;
  if (e.target.textContent === '÷') calcResult = prev / cur;
  if (e.target.textContent === '×') calcResult = prev * cur;
};

const displayNumber = function (cur) {
  //if there's no previous number(if string zero is inside)
  if (result.textContent === '0' || lastTyped !== 'number') {
    result.textContent = cur.textContent;
  } else {
    result.textContent += cur.textContent;
  }
};

const displayOperator = function (cur) {
  if (cur.textContent === '=') {
    //result.textContent = calculationresult;
  } else {
    calculation.textContent = result.textContent + cur.textContent;
    result.textContent = '';
  }
};

const plusMinus = function () {
  //if previous button is only a number
  if (lastTyped.classList.value === 'number' || lastTyped.id === 'plusminus') {
    if (result.textContent.includes('-')) {
      result.textContent = '-' + result.textContent;
    } else {
      result.textContent;
    }
  }
  console.log('fired plusminus');
};

const percentage = function () {
  //if previous button is only a number
  result.textContent = parseInt(result.textContent) / 100;
};

/////EVENT/////
//
window.addEventListener('DOMContentLoaded', clear);

buttons.forEach((btn) =>
  btn.addEventListener('click', function (e) {
    console.log(e.target);
    console.log(typeof e.target.classList.value);
    console.log(e.target.textContent);

    const keyType = e.target.classList.value;
    const keyId = e.target.id;

    //if number
    if (keyType === 'number') {
      displayNumber(e.target);
    }

    //if it's operator
    if (keyType === 'operator') {
      displayOperator(e.target);
    }

    //if it's ac
    if (keyId == 'ac') {
      clear();
    }

    //if its +-
    if (keyId == 'plusminus') {
      plusMinus();
    }
    //if its %
    if (keyId == 'percentage') {
      percentage();
      console.log('fired percentage');
    }

    lastTyped = e.target;
  })
);
