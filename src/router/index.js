import Vue from 'vue'
import Router from 'vue-router'
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
      import(`components/detail/manage`)
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
      import(`components/record/myTask`)
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
// submitJob
// recharge
// submit-success
// routerconst.beforeEach((to, from, next) => {
// 	loading(true)
// 	if ((to.path === '/' || to.path === '/index') || getuser()) {
//     if (to.path.indexOf('secret/')> -1 && !getuser().is_agent) {
//       getEventHub().$emit('titps', '您还未成为合伙人')
//       loading(null)
//     } else {
//       next()
//     }
// 	} else {
// 		next({
// 			path: '/index'
// 		})
// 	}
// })
// routerconst.afterEach((to, from) => {
// 	loading(null)
// })

export default routerconst
