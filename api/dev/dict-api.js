import request from '@/util/request'
export default {
	// 获取字典分页
	dictPage(data) {
		return request({
			url: '/dev/dict/page',
			method: 'GET',
			data: data
		})
	},
	// 获取字典列表
	dictList(data) {
		return request({
			url: '/dev/dict/list',
			method: 'GET',
			data: data
		})
	},
	// 获取字典树
	dictTree(data) {
		return request({
			url: '/dev/dict/tree',
			method: 'GET',
			data: data
		})
	},
	// 提交表单 add为false时为编辑，默认为新增
	submitForm(data, add = true) {
		return request({
			url: '/dev/dict/' + (add ? 'add' : 'edit'),
			method: 'POST',
			data: data
		})
	},
	// 删除字典
	dictDelete(data) {
		return request({
			url: '/dev/dict/delete',
			method: 'POST',
			data: data
		})
	},
	// 获取字典详情
	dictDetail(data) {
		return request({
			url: '/dev/dict/detail',
			method: 'GET',
			data: data
		})
	}
}