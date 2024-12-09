import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		userinfo: uni.getStorageSync('userinfo'),
		token: uni.getStorageSync('token'),
		initAppData: uni.getStorageSync('initAppData'),

	},
	mutations: {
		setUserinfo(state, userinfo) {
			state.userinfo = userinfo
		},
		setInitAppData(state, initAppData) {
			state.initAppData = initAppData
		},
	},
	actions: {

	}
})
export default store
