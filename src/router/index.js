import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import store from '@/store/index';

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      // redirect: '/home'
    },
    {
      path: '/form',
      name: "form",
      component: () => import("@/components/Home"),
      // redirect: '/user/login'
    }, {
      path: '/user',
      component: () => import("@/views/user/index"),
      children: [{
        path: 'login',
        name: 'login',
        component: () => import("@/views/user/Login"),
        meta: {
          notLogin: true
        }
      }, {
        path: 'regist',
        name: 'regist',
        component: () => import("@/views/user/Regist"),
        meta: {
          notLogin: true
        }
      }, {
        path: 'updatePass',
        name: 'updatePass',
        component: () => import("@/views/user/UpdatePass"),
        meta: {
          notLogin: true
        }
      }],

    },
    {
      path: '/survey',
      name: "survey",
      component: () => import("@/views/survey/index"),
      meta: {
        title: "问卷",
      },
      redirect: '/survey/mySurvey',
      children: [{
          path: 'addSurvey',
          name: 'addSurvey',
          component: () => import("@/views/survey/addSurvey"),
          meta: {
            title: "增加问卷",
          },

        },
        {
          path: 'mySurvey',
          name: 'mySurvey',
          component: () => import("@/views/survey/mySurvey"),
          meta: {
            title: "我的问卷",
          },
        },
        {
          path: 'updateSurvey',
          name: 'updateSurvey',
          component: () => import("@/views/survey/updateSurvey"),
          meta: {
            title: "更新问卷",
          },
        },



      ]
    },
    {
      path: '/surveyPage',
      name: "surveyPage",
      component: () => import("@/views/survey/surveyPage"),
      meta: {
        notLogin: true
      }
    }



  ]
})

router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

  let username = store.state.username
  if (to.meta.notLogin || username) {
    next()
  } else {
    next({
      name: 'login'
    })
  }
  // 未登录状态；当路由到nextRoute指定页时，跳转至login
  // if (nextRoute.indexOf(to.name) >= 0) {  
  //   if (!isLogin) {
  //     console.log('what fuck');
  //     router.push({ name: 'login' })
  //   }
  // }
  // // 已登录状态；当路由到login时，跳转至home 
  // if (to.name === 'login') {
  //   if (isLogin) {
  //     router.push({ name: 'home' });
  //   }
  // }
  // next();
});


export default router;
