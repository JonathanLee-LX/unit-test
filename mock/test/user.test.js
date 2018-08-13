import axios from 'axios';
import { Users } from '../examples/user';

jest.mock('axios');

test('should get users', () => {
  const res = { data: [{ name: 'Blob' }] };
  axios.get.mockResolvedValue(res);
  return Users.all().then(users => expect(users).toBe(res.data));
});
