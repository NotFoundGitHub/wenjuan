import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index';
import iView from 'iview';
Vue.use(iView);

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: '/survey/mySurvey'
    },
    {
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
        {
          path: 'surveyData',
          name: 'surveyData',
          component: () => import("@/views/survey/surveyData"),
          meta: {
            title: "问卷数据",
          }
        }
      ]
    },
    {
      path: '/quests',
      name: "quests",
      component: () => import("@/views/quests/index"),
      meta: {
        title: '我的问卷'
      },
      redirect: '/quests/addQuest',
      children: [{
          path: 'addQuest',
          name: 'addQuest',
          component: () => import("@/views/quests/addQuest"),
          meta: {
            title: '增加题目',
            next: 'questDeatil',
            index: 0,
          }
        },
        {
          path: 'questDeatil',
          name: 'questDeatil',
          component: () => import("@/views/quests/questDeatil"),
          meta: {
            title: '问卷详情',
            next: 'publishQuest',
            pre: 'addQuest',
            index: 1,
          }
        },
        {
          path: 'publishQuest',
          name: 'publishQuest',
          component: () => import("@/views/quests/publishQuest"),
          meta: {
            title: '发布问卷',
            pre: 'questDeatil',
            index: 2,
          }
        },

      ]
    },
    {
      path: '/home',
      component: () => import("@/views/home/index"),
      redirect: '/home/surveyPage',
      meta: {
        notLogin: true,

      },
      children: [{
        path: 'surveyPage',
        name: "surveyPage",
        component: () => import("@/views/home/surveyPage"),
        meta: {
          notLogin: true,
        }
      }]
    },
    {
      path: '/thanks',
      name: "thanks",
      component: () => import("@/views/home/thanks"),
      meta: {
        notLogin: true,
      }

    },
    {
      path: '*',
      name: "404",
      component: () => import("@/views/home/not"),
      meta: {
        notLogin: true,
      }
    }


  ]
})

router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  iView.LoadingBar.start();
  let username = store.state.username
  let user = window.localStorage.getItem("username");
  if (to.meta.notLogin || username || user) {
    next()
  } else {
    next({
      name: 'login'
    })
  }

});
router.afterEach(route => {
  iView.LoadingBar.finish();
});


export default router;
