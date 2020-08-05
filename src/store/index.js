import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.modulo';
import { administrador } from './administrador.modulo';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    administrador
  }
})
