import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  Icon: () => import('../../components/Icon.vue' /* webpackChunkName: "components/icon" */).then(c => wrapFunctional(c.default || c)),
  PrimaryNav: () => import('../../components/PrimaryNav.vue' /* webpackChunkName: "components/primary-nav" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
