import Vue from 'vue'
import Router from 'vue-router'
import {isWx} from 'common/js/util'
import {ENVIRONMENT} from 'api/config'
import {
  getuser,
  loading,
  getEventHub
} from '../main.js'

Vue.use(Router)

const routerconst = new Router({
  // maintain
  routes: [{
    path: '/',
    name: 'calibrator',
    component: () =>
      import (`components/index/calibrator`),
    children: [{
      path: '/login',
      name: 'login',
      component: () =>
        import (`components/index/login`),
    }]
  }, {
    path: '/browser-login',
    name: 'browser-login',
    component: () =>
      import (`components/index/browser-login`),
  }, {
    path: '/home',
    name: 'home',
    component: () =>
      import (`components/index/home`),
  }, {
    path: '/wx-index',
    name: 'wx-index',
    meta: {wx: true},
    component: () =>
      import (`components/index/wx-index`),
    children: [{
      path: '/wx-index-tips',
      name: 'wx-index-tips',
      meta: {wx: true},
      component: () =>
        import(`components/index/wx-index-tips`)
    }]
  }, {
    path: '/index',
    name: 'index',
    component: () =>
      import (`components/index/index`),
    children: [{
      path: '/entrance',
      name: 'entrance',
      component: () =>
        import(`components/detail/entrance`)
    }]
  }, {
    path: '/task-detail',
    name: 'task-detail',
    component: () =>
      import(`components/detail/task-detail`),
    children: [{
      path: '/sub-loading',
      name: 'sub-loading',
      component: () =>
        import(`components/detail/subJobLoading`),
    }]
  }, {
    path: '/submit-job',
    name: 'submit-job',
    component: () =>
      import(`components/detail/submitJob`)
  }, {
    path: '/release',
    name: 'release',
    component: () =>
      import (`components/index/release`),
    children: [{
      path: '/course',
      name: 'course',
      component: () =>
        import(`components/detail/course`),
    }]
  }, {
    path: '/user',
    name: 'user',
    component: () =>
      import (`components/index/user`),
    children: [{
      path: '/report',
      name: 'report',
      component: () =>
        import(`components/record/report`)
    }, {
      path: '/recharge',
      name: 'recharge',
      component: () =>
        import(`components/record/recharge`),
    }, {
      path: '/myTask',
      name: 'myTask',
      component: () =>
        import(`components/record/myTask`),
    }, {
      path: '/user-commision',
      name: 'user-commision',
      component: () =>
        import(`components/index/commision`),
      children: [{
        path: '/detail',
        name: 'detail-commision',
        component: () =>
          import(`components/detail/commision`)
      }]
    }]
  }, {
    path: '/commision',
    name: 'commision',
    component: () =>
      import (`components/index/new-commision`),
    children: [{
      path: '/group',
      name: 'group',
      component: () =>
        import(`components/detail/group`)
    }]
  }, {
    path: '/success',
    name: 'success',
    component: () =>
      import (`components/detail/success`)
  }, {
    path: '/manage',
    name: 'manage',
    component: () =>
      import(`components/detail/manage`),
    children: [{
      path: '/manage-detail',
      name: 'manage-detail',
      component: () =>
        import(`components/detail/manage-detail`),
      children: [{
        path: '/audit-list',
        name: 'audit-list',
        component: () =>
          import(`components/detail/audit-list`),
      }]
    }]
  }, {
    path: '/good',
    name: 'good',
    component: () =>
      import(`components/detail/good`)
  }, {
    path: '/withdrawal',
    name: 'withdrawal',
    component: () =>
      import(`components/detail/withdrawal`)
  }, {
    path: '/hall',
    name: 'hall',
    component: () =>
      import(`components/index/hall`)
  }, {
    path: '/phone',
    name: 'phone',
    component: () =>
      import(`components/detail/phone`)
  }, {
    path: '/inlet',
    name: 'inlet',
    component: () =>
      import(`components/detail/inlet`)
  }, {
    path: '/cooperate',
    name: 'cooperate',
    component: () =>
      import(`components/detail/cooperate`)
  }, {
    path: '/submit-success',
    name: 'submit-success',
    component: () =>
      import(`components/detail/submit-success`)
  }, {
    path: '/maintain',
    name: 'maintain',
    component: () =>
      import(`components/index/maintain`)
  }, {
    path: '/reputation',
    name: 'reputation',
    component: () =>
      import(`components/index/reputation`)
  }]
})
//choice
//reputation
//entrance
let viewingPage = ['/', '/index', '/login', '/hall', '/commision', '/home']
if (isWx()) {
  viewingPage = ['/', '/login', '/home']
}
let refreshList = ['/index', '/hall']
let updateUserInfoList = ['/user']
let updateUserInfoExcliude = ['/recharge', '/phone', '/withdrawal', '/good', '/hall', '/release', '/report', '/commision', '/group', '/inlet', '/cooperate', '/user-commision']
routerconst.beforeEach((to, from, next) => {
  loading(true)
  if (viewingPage.indexOf(to.path) > -1 || getuser()) {
    if (refreshList.indexOf(to.path) > -1 && getEventHub()) {
      if (getEventHub()) {
        getEventHub().$emit(`refresh${to.path}`)
      }
    }
    if (updateUserInfoList.indexOf(to.path) > -1 && updateUserInfoExcliude.indexOf(from.path) < 0 && getEventHub()) {
      if (getEventHub()) {
        getEventHub().$emit(`updateUserInfo`)
      }
    }
    next()
  } else {
    next({
      path: '/'
    })
    if (getEventHub()) {
      getEventHub().$emit(`flushAll`)
    }
  }
})
routerconst.afterEach((to, from) => {
  loading(null)
  if (to.name === 'task-detail') {
    if (to.params.id) {
      getEventHub().$emit(`taskDetail`, to.params.id)
    }
  }
  if (to.name === 'submit-job') {
    if (to.params.info) {
      getEventHub().$emit(`submitJob`, to.params.info)
    }
  }
})

export default routerconst
