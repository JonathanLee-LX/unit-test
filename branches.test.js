const branches = require('./branches')

describe('Mutiple branches test', ()=> {
    test('should get Hello lx', () =>{
        expect(branches('lx')).toBe('Hello lx')
    })
    test('should get A dynamic name', () =>{
        expect(branches('wpl')).toBe('Hello jlx')
    })
})