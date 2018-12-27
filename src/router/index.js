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
			import (`components/index/index`)
	}]
})

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
