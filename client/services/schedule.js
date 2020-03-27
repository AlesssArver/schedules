import axios from 'axios'

export default {
    getSchedules () {
        return axios.get('/api/schedule')
    },
    getSchedule (id) {
        return axios.get(`/api/schedule/${id}`)
    },
    createSchedule (schedule) {
        return axios.post('/api/schedule/create', schedule)
    },
    editSchedule (id) {
        return axios.put(`/api/scheudle/${id}`)
    },
    deleteSchedule (id) {
        return axios.delete(`/api/scheudle/${id}`)
    }
};