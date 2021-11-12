import { expect, describe } from '@jest/globals';
import { calcPercentage, plusMinus } from './functionKeys';

describe('check if the percentage button is working properly', () => {
  test('percentage button working on positive integers', () => {
    const answer = calcPercentage(8);
    expect(answer).toBe(0.08);
  });

  test('percentage button working on negative integers', () => {
    const answer = calcPercentage(-8);
    expect(answer).toBe(-0.08);
  });

  test('percentage button working on positive decimal numbers', () => {
    const answer = calcPercentage(5.5);
    expect(answer).toBe(0.055);
  });

  test('percentage button working on negative decimal numbers', () => {
    const answer = calcPercentage(-5.5);
    expect(answer).toBe(-0.055);
  });
});

describe('check if the plusminus button is working properly', () => {
  test('plusminus button working on positive integers', () => {
    const answer = plusMinus(8);
    expect(answer).toBe(-8);
  });

  test('plusminus button working on negative integers', () => {
    const answer = plusMinus(-8);
    expect(answer).toBe(8);
  });

  test('plusminus button not working on zero', () => {
    const answer = plusMinus(0);
    expect(answer).toBe(0);
  });
});
