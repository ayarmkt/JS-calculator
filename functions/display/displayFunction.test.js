import { expect, describe } from '@jest/globals';
import {
  displayDecimal,
  displayNumber,
  displayProcess,
} from './displayFunction';

describe('check if the decimal button is working properly', () => {
  test('check if decimal works after 1', () => {
    const answer = displayDecimal('1');
    expect(answer).toBe('1.');
  });

  test('check if there is already a decimal, the function will not add more decimals', () => {
    const answer = displayDecimal('1.1');
    expect(answer).toBe('1.1');
  });

  test('check if when the decimal button is the first key, 0. is displayed', () => {
    const answer = displayDecimal('');
    expect(answer).toBe('0.');
  });

  test('check if the result is empty, 0. is displayed', () => {
    const answer = displayDecimal('');
    expect(answer).toBe('0.');
  });
});

describe('check if the number is displayed properly', () => {
  test('check if when result is 0, only the key number is displayed in the result', () => {
    const answer = displayNumber('0', '3');
    expect(answer).toBe('3');
  });

  test('check if when the result is not 0, key number is added to the result', () => {
    const answer = displayNumber('3', '3');
    expect(answer).toBe('33');
  });
});

describe('check if the process is displayed correctly', () => {
  test('check if basic calculation is displayed properly', () => {
    expect(displayProcess('3', '+')).toBe('3 +');
  });
});
