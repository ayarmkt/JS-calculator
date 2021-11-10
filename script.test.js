//import { expect } from '@jest/globals';
import { calculate } from './script';
//const { calculate } = require('./script');

describe('check basic calculations', () => {
  test('check if 1 + 2 = 3', () => {
    const add1And2 = calculate('add', 1, 2);
    expect(add1And2).toBe(3);
  });
});
