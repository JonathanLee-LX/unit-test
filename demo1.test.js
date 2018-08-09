const msg = () => {
    return "Hello World"
}

test('should output Hello World', () => {
    expect(msg()).toBe('Hello World')
})
