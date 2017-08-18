// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import moment from 'moment'
import config from './config'
import App from './App'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuex)
Vue.prototype.$moment = moment

// vue-route
const routes = [
  {path: '/test', component: (r) => { require(['./SignalR/Test.vue'], r) }},
  {path: '/jq_test', component: (r) => { require(['./SignalR/test2.vue'], r) }}
]
const router = new VueRouter({
  routes
})

// Vuex
const store = new Vuex.Store({
  state: {
    token: JSON.parse(window.sessionStorage.getItem('token'))
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      window.sessionStorage.setItem('token', JSON.stringify(token))
    }
  }
})
// vue-resource
Vue.http.options.root = config.api
Vue.http.options.before = r => {
  var token = store.state.token
  if (r.url !== 'token' && token && token.access_token) {
    r.headers.append('Authorization', token.token_type + ' ' + token.access_token)
  }
}
Vue.http.interceptors.push((request, next) => {
  next(response => {
    if (response.status === 401) {
      router.replace('/login')
    }
  })
})
FastClick.attach(document.body)

Vue.config.productionTip = false

// 加载jquery
/* var jquery = require('jquery')
require('signalr')
Vue.prototype.$ = jquery */

/* eslint-disable no-new */
var vm = new Vue({
  router,
  render: h => h(App),
  store
})
window.vm = vm
vm.$mount('#app-box')
