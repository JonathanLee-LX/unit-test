import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(res => res.data);
  }
}

module.exports = Users;
