export default {
	namespaced: true,
	state: {
		departmentId: '',
		departmentName: ''
	},
	mutations: {
		SET_DEPARTMENTID(state, data) {
			state.departmentId = data
		},
		SET_DEPARTMENTNAME(state, data) {
			state.departmentName = data
		}
	},
	actions: {
		save_departmentId({ commit }, data) {
			commit('SET_DEPARTMENTID', data)
		},
		save_departmentName({ commit }, data) {
			commit('SET_DEPARTMENTNAME', data)
		}
	}
}