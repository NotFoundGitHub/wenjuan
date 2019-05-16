// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import store from './store/index'; //引入store
import VueClipboard from 'vue-clipboard2'

VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)

// import axios from 'axios'
// Vue.prototype.$axios = axios //将axios挂载在Vue实例原型上
// axios.defaults.withCredentials = true; //让ajax携带cookie
// axios.defaults.headers.post["Content-type"] = "application/json"

Vue.config.productionTip = false
Vue.use(iView);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, //挂载store
  components: {
    App
  },
  template: '<App/>'
})
