import request from '@/util/request'
export default {
	// 获取待办任务分页
	taskTodoPage(data) {
		return request({
			url: '/flw/task/todoPage',
			method: 'GET',
			data: data
		})
	},
	// 获取已办任务分页
	taskDonePage(data) {
		return request({
			url: '/flw/task/donePage',
			method: 'GET',
			data: data
		})
	},
	// 调整申请
	taskAdjust(data) {
		return request({
			url: '/flw/task/adjust',
			method: 'POST',
			data: data
		})
	},
	// 审批同意
	taskPass(data) {
		return request({
			url: '/flw/task/pass',
			method: 'POST',
			data: data
		})
	},
	// 审批拒绝
	taskReject(data) {
		return request({
			url: '/flw/task/reject',
			method: 'POST',
			data: data
		})
	},
	// 审批退回
	taskBack(data) {
		return request({
			url: '/flw/task/back',
			method: 'POST',
			data: data
		})
	},
	// 任务转办
	taskTurn(data) {
		return request({
			url: '/flw/task/turn',
			method: 'POST',
			data: data
		})
	},
	// 审批跳转
	taskJump(data) {
		return request({
			url: '/flw/task/jump',
			method: 'POST',
			data: data
		})
	},
	// 任务加签
	taskAddSign(data) {
		return request({
			url: '/flw/task/addSign',
			method: 'POST',
			data: data
		})
	},
	// 任务详情
	taskDetail(data) {
		return request({
			url: '/flw/task/detail',
			method: 'GET',
			data: data
		})
	},
	// 获取可驳回节点列表
	taskGetCanBackNodeInfoList(data) {
		return request({
			url: '/flw/task/getCanBackNodeInfoList',
			method: 'GET',
			data: data
		})
	},
	// 获取可跳转节点列表
	taskGetCanJumpNodeInfoList(data) {
		return request({
			url: '/flw/task/getCanJumpNodeInfoList',
			method: 'GET',
			data: data
		})
	},
	// 获取组织树选择器
	taskOrgTreeSelector(data) {
		return request({
			url: '/flw/task/orgTreeSelector',
			method: 'GET',
			data: data
		})
	},
	// 获取用户选择器
	taskUserSelector(data) {
		return request({
			url: '/flw/task/userSelector',
			method: 'GET',
			data: data
		})
	},
	// 获取机构选择器
	taskOrgSelector(data) {
		return request({
			url: '/flw/task/orgSelector',
			method: 'GET',
			data: data
		})
	},
	// 获取职位选择器
	taskPositionSelector(data) {
		return request({
			url: '/flw/task/positionSelector',
			method: 'GET',
			data: data
		})
	},
	// 获取角色选择器
	taskRoleSelector(data) {
		return request({
			url: '/flw/task/roleSelector',
			method: 'GET',
			data: data
		})
	}
}