import Vue from 'vue'
import Router from 'vue-router'
import {
  getuser,
  loading,
  getEventHub
} from '../main.js'

Vue.use(Router)

const routerconst = new Router({
  routes: [{
    path: '/',
    redirect: '/index'
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
      import(`components/detail/task-detail`)
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
    }]
  }, {
    path: '/commision',
    name: 'commision',
    component: () =>
      import (`components/index/commision`),
    children: [{
      path: '/detail',
      name: 'detail-commision',
      component: () =>
        import(`components/detail/commision`)
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
    path: '/group',
    name: 'group',
    component: () =>
      import(`components/detail/group`)
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
  }]
})
//entrance
let refreshList = ['/index', '/hall']
let updateUserInfoList = ['/user']
let updateUserInfoExcliude = ['/recharge', '/phone', '/withdrawal', '/good', '/hall', '/release', '/report']
// let IndexRefresh = ['/index']
routerconst.beforeEach((to, from, next) => {
  loading(true)
  if ((to.path === '/' || to.path === '/index') || getuser()) {
    next()
    if (refreshList.indexOf(to.path) > -1 && getEventHub()) {
      getEventHub().$emit(`refresh${to.path}`)
    }
    if (updateUserInfoList.indexOf(to.path) > -1 && updateUserInfoExcliude.indexOf(from.path) < 0 && getEventHub()) {
      getEventHub().$emit(`updateUserInfo`)
    }
    // if (IndexRefresh.indexOf(to.path) > -1 && getEventHub()) {
    //   getEventHub().$emit(`updateList`)
    // }
  } else {
    next({
      path: '/index'
    })
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
