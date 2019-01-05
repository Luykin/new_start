import Vue from 'vue'
import Router from 'vue-router'
import {
  getuser,
  loading
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
    children:[{
      path: ':id',
      component: () =>
        import (`components/detail/task-detail`),
      children: [{
        path: '/submitJob',
        name: 'submitJob',
        component: () =>
          import(`components/detail/submitJob`)
      }]
    }]
	},{
	  path: '/release',
    name: 'release',
    component: () =>
      import (`components/index/release`)
  },{
    path: '/user',
    name: 'user',
    component: () =>
      import (`components/index/user`)
  },{
    path: '/commision',
    name: 'commision',
    component: () =>
      import (`components/index/commision`)
  },{
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
        children: [{
          path: '/submitJob',
          name: 'al-submitJob',
          component: () =>
            import(`components/detail/submitJob`)
        }]
      }]
    }]
  //   , {
  //   path: '/audit-list',
  //   name: 'audit-list',
  //   component: () =>
  //     import(`components/detail/audit-list`)
  // }

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
      import(`components/index/hall`),
    children:[{
      path: ':id',
      component: () =>
        import (`components/detail/task-detail`),
      children: [{
        path: '/submitJob',
        name: 'submitJob',
        component: () =>
          import(`components/detail/submitJob`)
      }]
    }]
  }, {
    path: '/recharge',
    name: 'recharge',
    component: () =>
      import(`components/record/recharge`)
  }, {
    path: '/myTask',
    name: 'myTask',
    component: () =>
      import(`components/record/myTask`),
    children: [{
      path: '/submitMyJob',
      name: 'submitMyJob',
      component: () =>
        import(`components/detail/submitJob`)
    }]
  }, {
    path: '/report',
    name: 'report',
    component: () =>
      import(`components/record/report`)
  }, {
    path: '/phone',
    name: 'phone',
    component: () =>
      import(`components/detail/phone`)
  }, {
    path: '/submit-success',
    name: 'submit-success',
    component: () =>
      import(`components/detail/submit-success`)
  }]
})
//audit-list
//manage-detail
routerconst.beforeEach((to, from, next) => {
	loading(true)
	if ((to.path === '/' || to.path === '/index') || getuser()) {
      next()
	} else {
		next({
			path: '/index'
		})
	}
})
routerconst.afterEach((to, from) => {
	loading(null)
})

export default routerconst
