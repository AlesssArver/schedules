import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0decb95f = () => interopDefault(import('..\\pages\\schedules.vue' /* webpackChunkName: "pages_schedules" */))
const _081d1860 = () => interopDefault(import('..\\pages\\settings.vue' /* webpackChunkName: "pages_settings" */))
const _41fbd690 = () => interopDefault(import('..\\pages\\todos.vue' /* webpackChunkName: "pages_todos" */))
const _6a5fe3f5 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/schedules",
    component: _0decb95f,
    name: "schedules"
  }, {
    path: "/settings",
    component: _081d1860,
    name: "settings"
  }, {
    path: "/todos",
    component: _41fbd690,
    name: "todos"
  }, {
    path: "/",
    component: _6a5fe3f5,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
