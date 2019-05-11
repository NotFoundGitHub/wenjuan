import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      // redirect: '/home'
    }, {
      path: '/home',
      name: "home",
      component: () => import("@/components/Home"),
      // redirect: '/user/login'
    }, {
      path: '/user',
      component: () => import("@/views/user/index"),
      children: [{
        path: 'login',
        name: 'login',
        component: () => import("@/views/user/Login")
      }, {
        path: 'regist',
        name: 'regist',
        component: () => import("@/views/user/Regist")
      }],
    }


  ]
})
