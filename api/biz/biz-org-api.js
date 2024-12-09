import request from '@/util/request'
export default {
	// 获取机构分页
	orgPage(data) {
		return request({
			url: '/biz/org/page',
			method: 'GET',
			data: data
		})
	},
	// 获取机构树
	orgTree(data) {
		return request({
			url: '/biz/org/tree',
			method: 'GET',
			data: data
		})
	},
	// 提交表单 add为false时为编辑，默认为新增
	submitForm(data, add = true) {
		return request({
			url: '/biz/org/' + (add ? 'add' : 'edit'),
			method: 'POST',
			data: data
		})
	},
	// 删除机构
	orgDelete(data) {
		return request({
			url: '/biz/org/delete',
			method: 'POST',
			data: data
		})
	},
	// 获取机构详情
	orgDetail(data) {
		return request({
			url: '/biz/org/detail',
			method: 'GET',
			data: data
		})
	},
	// 获取机构树选择器
	orgTreeSelector(data) {
		return request({
			url: '/biz/org/orgTreeSelector',
			method: 'GET',
			data: data
		})
	},
	// 获取人员选择器
	orgUserSelector(data) {
		return request({
			url: '/biz/org/userSelector',
			method: 'GET',
			data: data
		})
	},
	// 获取动态字段的配置
	orgDynamicFieldConfigList(data) {
		return request({
			url: '/biz/org/dynamicFieldConfigList',
			method: 'GET',
			data: data
		})
	}
}