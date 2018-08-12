const getWeatherInfo = jest.fn();
const weatherInfo = {
  temprature: 22,
  wind: 2,
  windDirection: 'east-south'
};

getWeatherInfo.mockReturnValue(weatherInfo);

test('test getWeatherInfo', () => {
  expect(getWeatherInfo()).toBe({
    temprature: 22,
    wind: 2,
    windDirection: 'east-south'
  });
});

// jest.fn()返回一个mock函数，可以为这个函数进行配置已达到预期目的，然后用这个函数做mock测试。
const filterTestFn = jest.fn();
filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);
const result = [10, 100].filter(filterTestFn);

test('test filterTestFn', () => {
  expect(result).toEqual([10]);
});

// // 使用mock模拟时间
// const timeTestFn = jest.fn();
// timeTestFn.mockImplementation((callback, delayTime) => {
//   const now = Date.now();
//   while (Date.now() - now < delayTime) {}
//   callback();
// });

// test('test time delay function', () => {
//   expect(timeTestFn(() => {}, 2000));
// });

// mock现有的实现
jest.mock('./foo');
const foo = require('./foo');
foo.mockImplementation(() => 404);
test('test foo.js', () => {
  expect(foo()).toBe(404);
});
