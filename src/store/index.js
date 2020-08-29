import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    user: 'admin1',
  },
  getters: {
    countt: state => {
      return state.count + 100
    }
  },
  mutations: {
    add(state) {
      state.count++
    }
  },
  actions: {},
  modules: {}
})
