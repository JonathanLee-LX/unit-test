import { getTotal } from '../examples/getTotal';

jest.mock('../examples/getTotal.js');
// const getTotal = require('../examples/getTotal');

getTotal.mockImplementation((price, quality) => price * quality);

let price = 10,
  quality = 5;

describe('test mock function', () => {
  test('mock function implementation', () => {
    expect(getTotal(price, quality)).toEqual(price * quality);
  });
});
