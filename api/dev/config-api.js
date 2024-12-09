import request from '@/util/request'

export default {
	configSysBaseList() {
		return request({
			url: '/dev/config/sysBaseList',
			method: 'GET',
			isToken: false
		})
	}
}