import serviceAuth from '@/services/auth'
import axios from 'axios'
import Cookies from 'js-cookie'

export const state = () => ({
    users: [],
    user: {},
    token: Cookies.get("userData")
})

export const mutations = {
    register(state, user) {
        state.users.push(user)
    },
    login(state, user) {
        state.user = user
    },
    authError(state) {
        state.status = 'error'
    },
    logout() {
        Cookies.remove("userData")
    }
}

export const actions = {
    register({ commit }, user) {
        return serviceAuth
            .register(user)
            .then(({ data }) => {
                commit('register', data)
                Cookies.set("userData", data.token, { expires: 7 })
            })
    },
    async login({ commit }, user) {
        return serviceAuth
            .login(user)
            .then(({ data }) => {
                commit('login', data)
                Cookies.set("userData", data.token, { expires: 7 })
            })
    },
    logout({ commit }) {
        commit('logout')
        // delete axios.defaults.headers.common['Authorization']
    }
}

export const getters = {
    isAuthenticated: state => !!state.token
}