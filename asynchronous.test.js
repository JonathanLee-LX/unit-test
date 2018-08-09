const async = require('./asynchronous');

// test('read package.json', (done) => {
// //   expect(async('./package.json').name).toBe('lx-test');
//     expect.assertions(1)
//   async('./package.json').then( data => {
//       expect(data).toBe('lx-test')
//   })
// });

test('This project name is lx-test', (done) => {
    function callback(data) {
        expect(data).toBe('lx-test')
        done()
    }
    async('./package.json', callback)
})
    // async('./package.json', data => {
    //     console.log(data)
    // })
