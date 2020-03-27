import axios from 'axios'

export default {
    getTodos () {
        return axios.get('/todos')
    },
    getTodo (id) {
        return axios.get(`/todos/${id}`)
    },
    createTodo (todo) {
        return axios.post('/todos/create', todo)
    },
    editTOdo (id) {
        return axios.put(`/todos/${id}`)
    },
    deleteTodo (id) {
        return axios.delete(`/todos/${id}`)
    }
};