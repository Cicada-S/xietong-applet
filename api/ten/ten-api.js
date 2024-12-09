import request from '@/utils/request'
import store from '@/store'
export default {
	// 租户选择器
	tenSelector(data) {
		return request({
			url: '/ten/storage/tenSelector',
			method: 'GET',
			header: {
				domain: store.getters.allEnv[store.getters.envKey].mainTenantDomain
			},
			data: data,
			isToken: false
		})
	}
}