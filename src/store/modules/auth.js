import authApi from '@/api/auth'
import { setItem } from '@/helpers/persistanceStorage'

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null
}

export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure'
}

const mutations = {
  // REGISTER
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationTypes.registerFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },

  // LOGIN
  loginStart(state) {
    state.isSubmitting = true
  },
  loginSuccess(state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  loginFailure(state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

export const actionTypes = {
  register: '[auth] register'
}

const actions = {
  // REGISTER
  [actionTypes.register]({ commit }, credentials) {
    return new Promise((resolve) => {
      commit(mutationTypes.registerStart)
      authApi
        .register(credentials)
        .then((response) => {
          commit(mutationTypes.registerSuccess)
          setItem('accessToken', response.data.user.token)
          resolve(response.data.user)
        })
        .catch((result) => {
          console.log('result errors', result)
          commit(mutationTypes.registerFailure, result.response.data.errors)
        })
    })
  },
  // LOGIN
  login({ commit }, credentials) {
    return new Promise((resolve) => {
      commit('loginStart')
      authApi
        .login(credentials)
        .then((response) => {
          commit('loginSuccess')
          setItem('accessToken', response.data.user.token)
          resolve(response.data.user)
        })
        .catch((result) => {
          commit('loginFailure', result.response.data.errors)
          console.log(result.response.data.errors)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
