export default {
  namespaced: true,
  state: () => ({
    icons: {},
    balanceValue: 1
  }),
  mutations: {
    ['ADD_ICONS'](state, icons) {
      state.icons = icons
    },
    ['SET_BALANCE'](state, balanceValue) {
      state.balanceValue = balanceValue
    },
  },
  actions: {},
  getters: {}
}
