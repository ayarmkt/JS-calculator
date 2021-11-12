import { calculate } from './functions/calculate/calculate.js';
import {
  calcPercentage,
  plusMinus,
} from './functions/functionKeys/functionKeys.js';
import {
  displayDecimal,
  displayNumber,
  displayProcess,
} from './functions/display/displayFunction.js';

const calculator = document.querySelector('.calculator');
const buttons = calculator.querySelector('.buttons');
const operators = calculator.querySelectorAll('.operator');
const process = calculator.querySelector('.process');
const result = calculator.querySelector('.result');

let prevKey;
let prevOperator;
let storedNum = 0;

//
/////FUNCTION/////
//
const clear = function () {
  process.textContent = '';
  result.textContent = '0';
  prevKey;
  prevOperator;
  storedNum = 0;
  operators.forEach((op) => op.classList.remove('isSelected'));
};

//
/////EVENT/////
//
window.addEventListener('DOMContentLoaded', clear);

buttons.addEventListener('click', function (e) {
  //Get buttons
  const currentKey = e.target;
  if (!currentKey.matches('button')) return;
  const curAction = currentKey.dataset.action;

  switch (curAction) {
    case 'add':
    case 'subtract':
    case 'multiply':
    case 'divide':
      //If the first button is the operation key
      if (!prevKey || prevKey.dataset.action === 'clear') {
        //if the first key is × or ÷, noting changes.
        if (curAction === 'multiply' || curAction === 'divide') return;

        //if the first key is + or -, calculation starts with 0 at the beginning
        process.textContent = displayProcess(
          result.textContent,
          currentKey.textContent
        );
        result.textContent = '';
      }

      //If the operator is changed, the changed operator is displayed in the process
      if (prevKey && prevKey.matches('.operator') && storedNum) {
        process.textContent = displayProcess(storedNum, currentKey.textContent);
        prevKey.classList.remove('isSelected');
      }

      //If the previous key was either the = button or a first number, continue the calculation with the result moved to the process
      if (
        prevKey &&
        (prevKey.dataset.action === 'calculate' ||
          (prevKey.matches('.number') && !storedNum))
      ) {
        storedNum = result.textContent;
        process.textContent = displayProcess(
          result.textContent,
          currentKey.textContent
        );
        result.textContent = '';
      }

      //If the process and result has a value (2 numbers are already given), continue the calculation with the result displayed in the process
      if (
        storedNum &&
        result.textContent !== '' &&
        prevKey.dataset.action !== 'calculate'
      ) {
        storedNum = calculate(
          prevOperator.dataset.action,
          storedNum,
          result.textContent
        );
        process.textContent = displayProcess(storedNum, currentKey.textContent);
        result.textContent = '';
      }

      prevOperator = currentKey;
      prevKey = currentKey;
      currentKey.classList.add('isSelected');
      break;

    case 'calculate':
      //change operation to =
      if (prevKey === prevOperator) {
        result.textContent = storedNum;
        process.textContent = '';
      } else if (result.textContent !== '' && !storedNum) {
        //only first value is in the result
        result.textContent = result.textContent;
      } else {
        //ordinary calculation
        storedNum = calculate(
          prevOperator.dataset.action,
          storedNum,
          result.textContent
        );
        result.textContent = storedNum;
        process.textContent = '';
      }

      if (prevKey) prevKey.classList.remove('isSelected');
      prevKey = currentKey;
      break;

    case 'clear':
      clear();
      prevKey = currentKey;
      break;

    case 'plusminus':
      result.textContent = plusMinus(result.textContent);
      prevKey = currentKey;
      break;

    case 'percentage':
      result.textContent = calcPercentage(result.textContent);
      prevKey = currentKey;
      break;

    case 'decimal':
      if (prevKey && prevKey.dataset.action === 'calculate') clear();
      result.textContent = displayDecimal(result.textContent);
      prevKey = currentKey;
      break;

    default:
      if (prevKey && prevKey.dataset.action === 'calculate') {
        clear();
      }
      result.textContent = displayNumber(
        result.textContent,
        currentKey.textContent
      );
      if (prevKey && prevKey.matches('.operator'))
        prevKey.classList.remove('isSelected');
      prevKey = currentKey;
  }

  prevKey = currentKey;
});
