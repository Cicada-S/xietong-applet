import request from '@/utils/request'
export default {
	// 添加当前用户日程
	indexScheduleAdd(data) {
		return request({
			url: '/sys/index/schedule/add',
			method: 'POST',
			data: data
		})
	},
	// 删除日程
	indexScheduleDeleteSchedule(data) {
		return request({
			url: '/sys/index/schedule/deleteSchedule',
			method: 'POST',
			data: data
		})
	},
	// 获取当前用户日程列表
	indexScheduleList(data) {
		return request({
			url: '/sys/index/schedule/list',
			method: 'GET',
			data: data
		})
	},
	// 获取当前用户站内信列表
	indexMessageList(data) {
		return request({
			url: '/sys/index/message/list',
			method: 'GET',
			data: data
		})
	},
	// 获取站内信详情
	indexMessageDetail(data) {
		return request({
			url: '/sys/index/message/detail',
			method: 'GET',
			data: data
		})
	},
	// 获取当前用户访问日志列表
	indexVisLogList(data) {
		return request({
			url: '/sys/index/visLog/list',
			method: 'GET',
			data: data
		})
	},
	// 获取当前用户操作日志列表
	indexOpLogList(data) {
		return request({
			url: '/sys/index/opLog/list',
			method: 'GET',
			data: data
		})
	}
}