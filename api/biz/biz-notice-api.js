import request from '@/utils/request'
export default {
	// 获取通知公告分页
	page(data) {
		return request({
			url: '/biz/notice/page',
			method: 'GET',
			data: data
		})
	},
	// 提交表单 add为false时为编辑，默认为新增
	submitForm(data, add = true) {
		return request({
			url: '/biz/notice/' + (add ? 'add' : 'edit'),
			method: 'POST',
			data: data
		})
	},
	// 删除通知公告
	delete(data) {
		return request({
			url: '/biz/notice/delete',
			method: 'POST',
			data: data
		})
	},
	// 获取通知公告详情
	detail(data) {
		return request({
			url: '/biz/notice/detail',
			method: 'GET',
			data: data
		})
	},
	// 禁用通知公告
	disableStatus(data) {
		return request({
			url: '/biz/notice/disableStatus',
			method: 'GET',
			data: data
		})
	},
	// 启用通知公告
	enableStatus(data) {
		return request({
			url: '/biz/notice/enableStatus',
			method: 'GET',
			data: data
		})
	}
}