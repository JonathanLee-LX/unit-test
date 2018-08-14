import axios from 'axios';

export class Users {
  static all() {
    return axios.get('http://mock.com/getUsers').then(res => res.data);
  }
  static createNewUser(user) {
    return axios
      .post('http://mock.com/createUser', user)
      .then(res => res.data)
      .catch(err => err);
  }
  static deleteUser(user) {
    return axios
      .delete('http://mock.com/deleteUser', user)
      .then(res => res.data)
      .catch(err => err);
  }
  static updateUser(user) {
    return axios
      .put('http://mock.com/updateUser', user)
      .then(res => res.data)
      .catch(err => err);
  }
}
