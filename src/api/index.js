import axios from 'axios'
// Vue.prototype.$axios = axios //将axios挂载在Vue实例原型上
axios.defaults.withCredentials = true; //让ajax携带cookie

// import user from '@/api/user';
// import survey from '@/api/survey';

const Api = {

  // 获得登录用户信息
  // ...user,

  // ...survey
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

  // 问卷
  async addSurvey(data) {
    return (await axios.post('/api/survey', data)).data
  },
  async getSurvey() {
    return (await axios.get('/api/survey')).data
  },

  async updateSurvey(data) {
    return (await axios.put('/api/survey', data)).data
  },

  async delSurvey(data) {
    return (await axios.delete('/api/survey', {
      params: data
    })).data
  },


}

export default Api;
