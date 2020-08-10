import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.modulo';
import { administrador } from './administrador.modulo';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    prueba: ""
  },
  mutations: {
    imprimir(state, valor) {
      state.prueba = valor;
    }
  },
  actions: {
  },
  modules: {
    auth,
    administrador
  }
})
