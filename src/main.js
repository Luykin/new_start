// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import store from './store'
import router from './router'
import VueScroller from 'vue-scroller'
// import VueI18n from 'vue-i18n'
// // import ElementUI from 'element-ui'
// // import 'element-ui/lib/theme-chalk/index.css'
// // Vue.use(ElementUI)
// Vue.use(VueI18n)

Vue.config.productionTip = false

const app = new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  data: {
    eventHub: new Vue(),
    user: {
      avatar: null,
      nickname: '登录中',
      score: 0,
      price: 0,
      username: null,
      user_id: null
    },
    serverCache: {
      service_ratio: 0.2,
      ret: []
    }
  }
})

export function getuser() {
  if (!app) {
    return false
  }
  return app.user
}
export function getEventHub() {
  if (!app) {
    return false
  }
  return app.eventHub
}
export function loading(loading) {
  if (!app) {
    return false
  }
  app.eventHub.$emit('loading', loading)
}
