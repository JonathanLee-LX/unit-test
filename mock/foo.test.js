// foo.test.js
jest.mock('./foo')
const foo = require('./foo')

test('test mock function', () => {
    expect(foo()).toBe(undefined)
})

// 这个测试失败，因为jest会先执行所有方法，最后在执行test中的代码
foo.mockReturnValue('bar')
test('test mockReturnValue function', () => {
    expect(foo()).toBe('bar')
})

foo.foo.mockReturnValue('')
test('test property', () => {
    expect(foo.foo()).toBe('')
})