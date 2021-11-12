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
  prevKey = '';
  prevOperator = '';
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
      //START NEW CALCULATION: If the previous key was either the = button, clear button, or a first number, continue the calculation with the result moved to the process
      if (
        prevKey &&
        (prevKey.dataset.action === 'calculate' ||
          prevKey.dataset.action === 'clear' ||
          (prevKey.matches('.number') && !storedNum))
      ) {
        storedNum = result.textContent;
        process.textContent = displayProcess(
          result.textContent,
          currentKey.textContent
        );
        result.textContent = '';
      }

      //CONTINUE CALCULATION: If the result has a stored value, continue the calculation with the result displayed in the process
      if (
        storedNum &&
        prevOperator &&
        result.textContent &&
        prevKey.matches('.number')
      ) {
        storedNum = calculate(
          prevOperator.dataset.action,
          storedNum,
          result.textContent
        );
        process.textContent = displayProcess(storedNum, currentKey.textContent);
        result.textContent = '';
      }

      //STARTING FROM OPERATION: if the first key is × or ÷, noting changes.
      if (
        (!prevKey || prevKey.dataset.action === 'clear') &&
        (curAction === 'multiply' || curAction === 'divide')
      ) {
        return;
      }

      //STARTING FROM OPERATION: if the first key is + or -, calculation starts with 0 at the beginning
      if (
        (!prevKey || prevKey.dataset.action === 'clear') &&
        (curAction === 'subtract' || curAction === 'add')
      ) {
        process.textContent = displayProcess(
          result.textContent,
          currentKey.textContent
        );
        result.textContent = '';
      }

      //OPERATION CHANGE: If the operator is changed, the changed operator is displayed in the process
      if (prevKey && prevKey.matches('.operator')) {
        process.textContent = displayProcess(storedNum, currentKey.textContent);
        prevKey.classList.remove('isSelected');
      }

      //FUNCTION BUTTON INVOLVED: if previous key is +/- or % and changes the first number, continue calculation with the result displaying in the process
      if (
        //prevKey &&
        !storedNum &&
        !process.textContent &&
        (prevKey.dataset.action === 'plusminus' ||
          prevKey.dataset.action === 'percentage')
      ) {
        storedNum = result.textContent;
        process.textContent = displayProcess(storedNum, currentKey.textContent);
        result.textContent = '';
      }

      //FUNCTION BUTTON INVOLVED: if previous key is +/- or % and changes the second number, then continue the result with displaying in the process
      if (
        storedNum &&
        prevOperator &&
        process.textContent &&
        (prevKey.dataset.action === 'plusminus' ||
          prevKey.dataset.action === 'percentage')
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
      break;

    case 'clear':
      clear();
      break;

    case 'plusminus':
      if (result.textContent === '') return;
      result.textContent = plusMinus(result.textContent);
      break;

    case 'percentage':
      if (result.textContent === '') return;
      result.textContent = calcPercentage(result.textContent);
      break;

    case 'decimal':
      if (prevKey && prevKey.dataset.action === 'calculate') clear();
      result.textContent = displayDecimal(result.textContent);
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
  }

  prevKey = currentKey;
});
