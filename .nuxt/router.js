import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _10b2429c = () => interopDefault(import('../pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _67de4e04 = () => interopDefault(import('../pages/privacy.vue' /* webpackChunkName: "pages/privacy" */))
const _d20b1c54 = () => interopDefault(import('../pages/_cvt.vue' /* webpackChunkName: "pages/_cvt" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/contact",
    component: _10b2429c,
    name: "contact___en"
  }, {
    path: "/privacy",
    component: _67de4e04,
    name: "privacy___en"
  }, {
    path: "/:cvt?",
    component: _d20b1c54,
    name: "cvt___en"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
