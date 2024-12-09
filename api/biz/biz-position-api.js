import request from '@/utils/request'
export default {
	// 获取岗位分页
	positionPage(data) {
		return request({
			url: '/biz/position/page',
			method: 'GET',
			data: data
		})
	},
	// 获取岗位列表
	positionList(data) {
		return request({
			url: '/biz/position/list',
			method: 'GET',
			data: data
		})
	},
	// 提交表单 add为false时为编辑，默认为新增
	submitForm(data, add = true) {
		return request({
			url: '/biz/position/' + (add ? 'add' : 'edit'),
			method: 'POST',
			data: data
		})
	},
	// 删除岗位
	positionDelete(data) {
		return request({
			url: '/biz/position/delete',
			method: 'POST',
			data: data
		})
	},
	// 获取岗位详情
	positionDetail(data) {
		return request({
			url: '/biz/position/detail',
			method: 'GET',
			data: data
		})
	},
	// 获取机构树选择器
	positionOrgTreeSelector(data) {
		return request({
			url: '/biz/position/orgTreeSelector',
			method: 'GET',
			data: data
		})
	},
	// 获取动态字段的配置
	positionDynamicFieldConfigList(data) {
		return request({
			url: '/biz/position/dynamicFieldConfigList',
			method: 'GET',
			data: data
		})
	}
}