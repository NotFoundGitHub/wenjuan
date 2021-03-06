import axios from 'axios'
// // Vue.prototype.$axios = axios //将axios挂载在Vue实例原型上
axios.defaults.withCredentials = true; //让ajax携带cookie

const User = {
  async getUser() {
    return (await axios.get('/api/user/get')).data;
  },
  async login(data) {
    return (await axios.post('/api/user/login', data)).data;
  },
  async regist(data) {
    return (await axios.post('/api/user/regist', data)).data
  },
  async getVerify(data) {
    return (await axios.post('/api/user/verify', data)).data
  },
  async modifyPassword(data) {
    return (await axios.post('/api/user/modifyPassword', data)).data
  },

}

export default User;
