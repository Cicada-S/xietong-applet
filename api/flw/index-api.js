import request from '@/utils/request'
export default {
	// 获取首页指标
	indexFlwIndicator(data) {
		return request({
			url: '/flw/index/indicator',
			method: 'GET',
			data: data
		})
	},
}