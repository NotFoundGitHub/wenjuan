import axios from 'axios'
axios.defaults.withCredentials = true; //让ajax携带cookie

const Survey = {
  async addSurvey(data) {
    return (await axios.post('/api/survey', data)).data
  },
  async getSurvey() {
    return (await axios.get('/api/survey')).data
  },

  async updateSurvey(data) {
    return (await axios.get('/api/survey', data)).data
  },

  async delSurvey(data) {
    return (await axios.get('/api/survey', {
      params: data
    })).data
  },




}

export default Survey;
