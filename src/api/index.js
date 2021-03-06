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
  async getSurvey(data) {
    return (await axios.get('/api/survey', {
      params: data
    })).data
  },

  async updateSurvey(data) {
    return (await axios.put('/api/survey', data)).data
  },

  async delSurvey(data) {
    return (await axios.delete('/api/survey', {
      params: data
    })).data
  },

  // 问卷详情页面

  async addQuest(data) {
    return (await axios.post('/api/quest', data)).data
  },
  async getQuest(data) {
    return (await axios.get('/api/quest', {
      params: data
    })).data
  },
  async delQuest(data) {
    return (await axios.delete('/api/quest', {
      params: data
    })).data
  },

  //回答页面
  async addAnswer(data) {
    return (await axios.post('/api/answer', data)).data
  },

  async getAnswer(data) {
    return (await axios.get('/api/answer', {
      params: data
    })).data
  },
  async getHandleArr(data) {
    return (await axios.get('/api/handleArr', {
      params: data
    })).data
  },

  async getPythonData(data) {
    return (await axios.post('/pyapi/', data)).data;
  }


}

export default Api;
