import { wrapFunctional } from './utils'

export { default as Icon } from '../../components/Icon.vue'
export { default as PrimaryNav } from '../../components/PrimaryNav.vue'

export const LazyIcon = import('../../components/Icon.vue' /* webpackChunkName: "components/icon" */).then(c => wrapFunctional(c.default || c))
export const LazyPrimaryNav = import('../../components/PrimaryNav.vue' /* webpackChunkName: "components/primary-nav" */).then(c => wrapFunctional(c.default || c))
