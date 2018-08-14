import axios from 'axios';
import { Users } from '../examples/user';

jest.mock('axios');

test('should create a new user', () => {
  expect.assertions(1);
  const user = {
    data: {
      username: '小明'
    }
  };
  axios.post.mockResolvedValue(user);
  return Users.createNewUser(user).then(res => {
    expect(res).toBe(user.data);
  });
});

test('should get users', () => {
  expect.assertions(1);
  const res = { data: [{ name: '小华' }] };
  axios.get.mockResolvedValue(res);
  return Users.all().then(users => {
    expect(users).toBe(res.data);
  });
});

test('should delete user', () => {
  expect.assertions(1);
  const req = {
    delete: true
  };
  const res = {
    data: {
      hasDeleted: true
    }
  };
  const user = {
    data: {
      username: '小红'
    }
  };
  axios.delete.mockResolvedValue(res);
  return Users.deleteUser(user).then(res => {
    expect(res.hasDeleted).toBe(req.delete);
  });
});

test('should update user', () => {
  expect.assertions(1);
  const user = {
    data: {
      username: '小明',
      age: 22
    }
  };
  axios.put.mockResolvedValue(user);
  Users.updateUser().then(res => {
    expect(res).toEqual(user.data);
  });
});
