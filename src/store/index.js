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

  actions: {
    getRows ({ commit }) {
      if (localStorage.getItem('rows')) {
        try {
          const rows = JSON.parse(localStorage.getItem('rows'))
          commit('setRows', rows)
        } catch {
          localStorage.removeItem('rows')
        }
      }
    },
    resetRows ({ commit }) {
      const rows = require('@/assets/rows.json')
      commit('setRows', rows)
    },
    removeRows ({ commit }) {
      commit('setRows', [])
    },
  },

  getters: {
    rows: s => s.rows
  }
})
