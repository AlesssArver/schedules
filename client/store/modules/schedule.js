import scheduleService from '@/services/schedule'

export const state = () => ({
    schedules: [],
    schedule: {}
})

export const mutations = {
    getSchedules(state, schedules) {
        state.schedules = schedules
    },
    getSchedule(state, schedule) {
        state.schedule = schedule
    },
    createSchedule(state, schedule) {
        state.schedules.push(schedule)
    },
    editSchedule(state, mySchedule) {
        state.schedule = mySchedule
    },
    // editSchedule(state, {schedule, key, value}) {
    //     schedule[key] = value
    // },
    deleteSchedule(state, schedule) {
        state.schedules.pop(schedule)
    }
}

export const actions = {
    getSchedules({ commit }) {
        return scheduleService
            .getSchedules()
            .then(({ data }) => commit('getSchedules', data))
    },
    getSchedule({ commit, getters }, id) {
        const schedule = getters.getScheduleById(id)

        if (schedule) commit('getSchedule', schedule)
        else {
            scheduleService.getSchedule(id)
                .then(({ data }) => commit('getSchedule', data))
                // .catch(err => console.log("There was an error:", err.response))
        }
    },
    createSchedule({ commit }, schedule) {
        return scheduleService.createSchedule(schedule)
            .then(({ data }) => {
                commit('createSchedule', data)
                // commit('getSchedule', data)
            })
    },
    editSchedule({ commit }, schedule) {
        return scheduleService.editSchedule(schedule).then(({ data }) => commit('editSchedule', data))
    },
    deleteSchedule({ commit }, schedule) {
        return scheduleService.deleteSchedule(schedule).then(({ data }) => commit('deleteSchedule', data))
    }
}

export const getters = {
    getScheduleById(state, id) {
        return state.schedules.find(schedule => schedule._id === id)
    }
}