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
			import (`components/index/user`)
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
  }]
})
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
