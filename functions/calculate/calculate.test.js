import { expect, describe } from '@jest/globals';
import { calculate } from './calculate';

//BASIC OPERATIONS
describe('check if addition works', () => {
  test('check if addition of positive integers work', () => {
    const answer = calculate('add', 1, 2);
    expect(answer).toBe(3);
  });

  test('check if addition of negative integers work', () => {
    const answer = calculate('add', -1, -2);
    expect(answer).toBe(-3);
  });

  test('check if addition of positive decimal numbers work', () => {
    const answer = calculate('add', 1.4, 2.6);
    expect(answer).toBe(4);
  });

  test('check if addition of negative decimal numbers work', () => {
    const answer = calculate('add', -3.3, -2.4);
    expect(answer).toBe(-5.7);
  });
});

describe('check if subtraction works', () => {
  test('check if subtraction of positive integers work', () => {
    const answer = calculate('subtract', 2, 1);
    expect(answer).toBe(1);
  });

  test('check if subtraction of negative integers work', () => {
    const answer = calculate('subtract', -1, -2);
    expect(answer).toBe(1);
  });

  test('check if subtraction of positive decimal numbers work', () => {
    const answer = calculate('subtract', 2.6, 1.4);
    expect(answer).toBe(1.2);
  });

  test('check if subtraction of negative decimal numbers work', () => {
    const answer = calculate('subtract', -3.3, -2.4);
    expect(answer).toBe(-0.9);
  });
});

describe('check if multiplication works', () => {
  test('check if multiplication of positive integers work', () => {
    const answer = calculate('multiply', 2, 3);
    expect(answer).toBe(6);
  });

  test('check if multiplication of negative integers work', () => {
    const answer = calculate('multiply', -3, -2);
    expect(answer).toBe(6);
  });

  test('check if multiplication of positive decimal numbers work', () => {
    const answer = calculate('multiply', 2.6, 1.4);
    expect(answer).toBe(3.64);
  });

  test('check if multiplication of negative decimal numbers work', () => {
    const answer = calculate('multiply', -3.3, -2.4);
    expect(answer).toBe(7.92);
  });
});

describe('check if division works', () => {
  test('check if multiplication of positive integers work', () => {
    const answer = calculate('divide', 6, 2);
    expect(answer).toBe(3);
  });

  test('check if division of negative integers work', () => {
    const answer = calculate('divide', -4, -2);
    expect(answer).toBe(2);
  });

  test('check if division of positive decimal numbers work', () => {
    const answer = calculate('divide', 2.6, 1.3);
    expect(answer).toBe(2);
  });

  test('check if division of negative decimal numbers work', () => {
    const answer = calculate('divide', -2.4, -1.6);
    expect(answer).toBe(1.5);
  });
});
