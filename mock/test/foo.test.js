// foo.test.js
// const foo = require('./foo');
import { foo } from '../examples/foo';
jest.mock('../examples/foo.js');

test('test mock function', () => {
  expect(foo()).toBe('bar');
});

// 这个测试失败，因为jest会先执行所有方法，最后在执行test中的代码
foo.mockReturnValueOnce('bar');
test('test mockReturnValue function', () => {
  expect(foo()).toBe('foo');
});

test('test mockReturnValue function', () => {
  expect(foo()).toBe('foo');
});

foo.foo.mockReturnValue('foofoo');
test('test property', () => {
  expect(foo.foo()).toBe('foofoo');
});

foo.mockReturnValue('foo');
