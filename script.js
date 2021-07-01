const buttons = document.querySelectorAll('button');
const calculation = document.querySelector('.calculation');
const result = document.querySelector('.result');

let lastTyped;
let calcResult;
let lastNum = '';
let curNum = '';

/////FUNCTION/////
//

const clear = function () {
  result.textContent = '0';
  calculation.textContent = '';

  lastNum = '';
  curNum = '';
};

const calculate = function (prev, cur) {
  if (calculation.textContent.includes('+'))
    calcResult = Number(prev) + Number(cur);
  if (calculation.textContent.includes('-'))
    calcResult = Number(prev) - Number(cur);
  if (calculation.textContent.includes('÷'))
    calcResult = Number(prev) / Number(cur);
  if (calculation.textContent.includes('×'))
    calcResult = Number(prev) * Number(cur);
};

const displayResults = function (res) {
  result.textContent = res.toFixed(8);
  calculation.textContent = '';
};

const displayProcessResult = function (res, cur) {
  result.textContent = '';
  calculation.textContent = res + cur;
};

const displayNumber = function (cur) {
  //if there's no previous number(if string zero is inside)
  if (result.textContent === '0' || lastTyped.classList.value !== 'number') {
    result.textContent = cur.textContent;
  } else {
    result.textContent += cur.textContent;
  }
};

const displayOperator = function (cur) {
  calculation.textContent = result.textContent + cur.textContent;
  result.textContent = '';
};

const plusMinus = function () {
  if (lastTyped.classList.value === 'number' || lastTyped.id === 'plusminus') {
    result.textContent = Number(result.textContent) * -1;
  }
};

const percentage = function () {
  result.textContent = Number(result.textContent) / 100;
};

/////EVENT/////
//
window.addEventListener('DOMContentLoaded', clear);

buttons.forEach((btn) =>
  btn.addEventListener('click', function (e) {
    const key = e.target;
    const keyType = key.classList.value;
    const keyId = key.id;

    //if number
    if (keyType === 'number') {
      displayNumber(key);
      curNum += key.textContent;
    }

    //if it's operator except =
    if (keyType === 'operator') {
      //if it's =
      if (e.target.textContent === '=') {
        calculate(lastNum, curNum);
        displayResults(calcResult);
        lastNum = '';
        curNum = '';
      } else if (calculation.textContent !== '') {
        //if other than = && calculation exists
        displayProcessResult(calcResult, curNum);
      } else {
        displayOperator(key);
        lastNum = curNum;
        curNum = '';
      }
    }

    if (keyId === 'ac') {
      clear();
    }

    if (keyId === 'plusminus') {
      plusMinus();
    }

    if (keyId == 'percentage') {
      percentage();
    }

    lastTyped = key;
  })
);
