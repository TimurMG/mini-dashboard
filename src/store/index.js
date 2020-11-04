import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    rows: []
  },

  mutations: {
    setRows (state, payload) {
      state.rows = payload
      localStorage.setItem('rows', JSON.stringify(payload))
    },
  },

  actions: {},

  getters: {
    rows: s => s.rows
  }
})
