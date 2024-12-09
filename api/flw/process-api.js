import request from '@/utils/request'
export default {
	// 获取所有流程分页
	processMonitorPage(data) {
		return request({
			url: '/flw/process/monitor/monitorPage',
			method: 'GET',
			data: data
		})
	},
	// 删除流程
	processDelete(data) {
		return request({
			url: '/flw/process/monitor/delete',
			method: 'POST',
			data: data
		})
	},
	// 终止流程
	processEnd(data) {
		return request({
			url: '/flw/process/monitor/end',
			method: 'POST',
			data: data
		})
	},
	// 撤回流程
	processRevoke(data) {
		return request({
			url: '/flw/process/monitor/revoke',
			method: 'POST',
			data: data
		})
	},
	// 挂起流程
	processSuspend(data) {
		return request({
			url: '/flw/process/monitor/suspend',
			method: 'POST',
			data: data
		})
	},
	// 激活流程
	processActive(data) {
		return request({
			url: '/flw/process/monitor/active',
			method: 'POST',
			data: data
		})
	},
	// 转办流程
	processTurn(data) {
		return request({
			url: '/flw/process/monitor/turn',
			method: 'POST',
			data: data
		})
	},
	// 跳转流程
	processJump(data) {
		return request({
			url: '/flw/process/monitor/jump',
			method: 'POST',
			data: data
		})
	},
	// 复活流程
	processRestart(data) {
		return request({
			url: '/flw/process/monitor/restart',
			method: 'POST',
			data: data
		})
	},
	// 迁移流程
	processMigrate(data) {
		return request({
			url: '/flw/process/monitor/migrate',
			method: 'POST',
			data: data
		})
	},
	// 获取流程变量分页
	processVariablePage(data) {
		return request({
			url: '/flw/process/monitor/variablePage',
			method: 'GET',
			data: data
		})
	},
	// 获取流程详情
	processDetail(data) {
		return request({
			url: '/flw/process/monitor/detail',
			method: 'GET',
			data: data
		})
	},
	// 获取可跳转节点列表
	processGetCanJumpNodeInfoList(data) {
		return request({
			url: '/flw/process/monitor/getCanJumpNodeInfoList',
			method: 'GET',
			data: data
		})
	},
	// 获取可复活到节点列表
	processGetCanRestartNodeInfoList(data) {
		return request({
			url: '/flw/process/monitor/getCanRestartNodeInfoList',
			method: 'GET',
			data: data
		})
	},
	// 获取可迁移到节点列表
	processGetCanMigrateNodeInfoList(data) {
		return request({
			url: '/flw/process/monitor/getCanMigrateNodeInfoList',
			method: 'GET',
			data: data
		})
	},
	// 获取组织树选择器
	processOrgTreeSelector(data) {
		return request({
			url: '/flw/process/monitor/orgTreeSelector',
			method: 'GET',
			data: data
		})
	},
	// 获取用户选择器
	processUserSelector(data) {
		return request({
			url: '/flw/process/monitor/userSelector',
			method: 'GET',
			data: data
		})
	}
}