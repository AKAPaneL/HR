export default {
  namespaced: true,
  state: {
    routes: []
  },
  getters: {},
  mutations: {
    saveRoutes(state, routes) {
      state.routes = routes
    }
  },
  actions: {}
}
