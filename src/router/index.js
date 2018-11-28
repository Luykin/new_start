import Vue from 'vue'
import Router from 'vue-router'
import {
	getuser,
  getEventHub,
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
		  path: 'course',
      component: () =>
        import (`components/details/course`),
    }]
	}, {
		path: '/commision',
		name: 'commision',
		component: () =>
			import (`components/index/commision`)
	}, {
		path: '/user',
		name: 'user',
		component: () =>
			import (`components/index/user`),
    children:[{
      path: 'course',
      component: () =>
        import (`components/details/course`),
    }]
	}, {
		path: '/withdraw',
		name: 'withdraw',
		component: () =>
			import (`components/withdraw/withdraw`)
	}, {
		path: '/recharge-record',
		name: 'recharge-record',
		component: () =>
			import (`components/record/recharge-record`)
	}, {
		path: '/transaction-record',
		name: 'transaction-record',
		component: () =>
			import (`components/record/transaction-record`)
	}, {
		path: '/details-commision',
		name: 'details-commision',
		component: () =>
			import (`components/details/commision`)
	}, {
		path: '/strategy',
		name: 'strategy',
		component: () =>
			import (`components/userlist/strategy`)
	}, {
		path: '/introduce',
		name: 'introduce',
		component: () =>
			import (`components/userlist/introduce`)
	}, {
		path: '/skill',
		name: 'skill',
		component: () =>
			import (`components/userlist/skill`)
	}, {
		path: '/inlet',
		name: 'inlet',
		component: () =>
			import (`components/userlist/inlet`)
	}, {
    path: '/order-record',
    name: 'order-record',
    component: () =>
      import (`components/record/order-record`)
  }, {
    path: '/resource',
    name: 'resource',
    component: () =>
      import (`components/details/resource`)
  }, {
    path: '/custom',
    name: 'custom',
    component: () =>
      import (`components/details/custom`)
  }, {
    path: '/team-detail',
    name: 'team-detail',
    component: () =>
      import (`components/details/team-detail`)
  }, {
    path: '/spread',
    name: 'spread',
    component: () =>
      import (`components/details/spread`)
  }, {
    path: '/secret',
    name: 'secret',
    component: () =>
      import (`components/index/secret`),
    children:[{
      path: ':id',
      component: () =>
        import (`components/details/secret`),
    }]
  }]
})
routerconst.beforeEach((to, from, next) => {
	loading(true)
	if ((to.path === '/' || to.path === '/index') || getuser()) {
    if (to.path.indexOf('secret/')> -1 && !getuser().is_agent) {
      getEventHub().$emit('titps', '您还未成为合伙人')
      loading(null)
    } else {
      next()
    }
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
