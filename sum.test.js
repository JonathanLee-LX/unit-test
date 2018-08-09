const { sum, fullEqual } = require('./sum');
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('whether is fullEqual to this object', () => {
  expect(fullEqual()).toEqual({
    a: 1,
    b: 2
  });
});

test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});

function compileAndroidCode() {
  throw new Error('occured compiling error');
}

test('occured a compiling error', () => {
  expect(compileAndroidCode).toThrow('occured compiling error');
});

// import $ from 'jquery'
// const $ = require('jquery');

// console.log($);
// $.get({
//   url: 'https://jestjs.io/docs/zh-Hans/asynchronous',
//   success: (data) =>{
//      console.log(data)
//   },
//   fail: (err) =>{
//       console.log(data)
//   }
// });


