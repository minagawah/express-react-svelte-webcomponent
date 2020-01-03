import { addOne } from '../utils.js';

describe('Testing: addOne()', () => {
  test('addsOne successful', () => {
    expect(addOne(1)).toEqual(2);
  })
});
