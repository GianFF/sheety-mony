import Vuex from 'vuex'
import {
  MUTATION_SET_CECOS,
  MUTATION_SET_CECO,
  MUTATION_SET_GASTO,
  MUTATION_SET_BAD_TOAST,
  MUTATION_SET_GOOD_TOAST
} from './mutations'
import { ACTION_GET_CECOS, ACTION_SET_GASTO } from './actions'
import sheety_api from '../api/sheety-api'
import {BAD_MESSAGE, OK_MESSAGE} from "./constants";

const store = () => new Vuex.Store({
  state: {
    cecos: [],
    ceco: {},
    gasto: 0,
    goodToastMessage: '',
    badToastMessage: '',
  },
  mutations: {
    [MUTATION_SET_CECOS] (state, cecos) {
      state.cecos = cecos
    },
    [MUTATION_SET_CECO] (state, ceco) {
      state.ceco = ceco
    },
    [MUTATION_SET_GOOD_TOAST] (state, message) {
      state.goodToastMessage = message
    },
    [MUTATION_SET_BAD_TOAST] (state, message) {
      state.badToastMessage = message
    },
    [MUTATION_SET_GASTO] (state, gasto) {
      state.gasto = gasto
    },
  },
  actions: {
    async [ACTION_GET_CECOS] ({commit}) {
      const cecos = await sheety_api.cecos()
      commit(MUTATION_SET_CECOS, cecos)
    },
    async [ACTION_SET_GASTO] ({state, commit}) {
      const result = await sheety_api.putGasto(state.gasto, state.ceco)
      result.status == 200 ? commit(MUTATION_SET_GOOD_TOAST, OK_MESSAGE) : commit(MUTATION_SET_BAD_TOAST, BAD_MESSAGE)
      setTimeout(function () {
        commit(MUTATION_SET_GOOD_TOAST, '')
        commit(MUTATION_SET_BAD_TOAST, '')
      }, 2000)
    },
  }
})

export default store
