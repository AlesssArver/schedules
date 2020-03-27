import axios from 'axios'

export default {
    login(user) {
        return axios.post('/api/auth/login', user)
    },
    register(user) {
        return axios.post('/api/auth/register', user)
    },
    googleOauth() {
        return axios.get('/api/auth/google')
    },
    facebookOauth() {
        return axios.get('/api/auth/facebook')
    },
    vkontakteOauth() {
        return axios.get('/api/auth/vkontakte')
    }
};