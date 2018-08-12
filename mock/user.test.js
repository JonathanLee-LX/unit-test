const axios = require('axios') 
const Users = require('./user.js')

jest.mock('axios');

test('should get users', () => {
  const res = { data: [{ name: 'Blob' }] };
  axios.get.mockResolvedValue(res);
  return Users.all().then(users => expect(users).toBe(res.data));
});
