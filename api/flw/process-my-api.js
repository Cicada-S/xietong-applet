import request from '@/util/request'
export default {
	// 获取我可以发起的流程模型列表
	processMyModelList(data) {
		return request({
			url: '/flw/process/myModelList',
			method: 'GET',
			data: data
		})
	},
	// 保存草稿
	processSaveDraft(data) {
		return request({
			url: '/flw/process/saveDraft',
			method: 'POST',
			data: data
		})
	},
	// 发起流程
	processStart(data) {
		return request({
			url: '/flw/process/start',
			method: 'POST',
			data: data
		})
	},
	// 获取我的草稿分页
	processMyDraftPage(data) {
		return request({
			url: '/flw/process/myDraftPage',
			method: 'GET',
			data: data
		})
	},
	// 获取草稿详情
	processDraftDetail(data) {
		return request({
			url: '/flw/process/draftDetail',
			method: 'GET',
			data: data
		})
	},
	// 删除草稿
	processDeleteDraft(data) {
		return request({
			url: '/flw/process/deleteDraft',
			method: 'POST',
			data: data
		})
	},
	// 获取我发起的流程分页
	processMyPage(data) {
		return request({
			url: '/flw/process/myPage',
			method: 'GET',
			data: data
		})
	},
	// 获取我的待阅流程分页
	processMyCopyUnreadPage(data) {
		return request({
			url: '/flw/process/myCopyUnreadPage',
			method: 'GET',
			data: data
		})
	},
	// 设置待阅流程为已阅
	processReadMyCopyProcess(data) {
		return request({
			url: '/flw/process/readMyCopyProcess',
			method: 'POST',
			data: data
		})
	},
	// 获取我的已阅流程分页
	processMyCopyHasReadPage(data) {
		return request({
			url: '/flw/process/myCopyHasReadPage',
			method: 'GET',
			data: data
		})
	},
	// 删除我的已阅流程
	processDeleteMyHasReadProcess(data) {
		return request({
			url: '/flw/process/deleteMyHasReadProcess',
			method: 'POST',
			data: data
		})
	},
	// 撤回流程
	processRevoke(data) {
		return request({
			url: '/flw/process/revoke',
			method: 'POST',
			data: data
		})
	},
	// 获取流程详情
	processDetail(data) {
		return request({
			url: '/flw/process/detail',
			method: 'GET',
			data: data
		})
	},
	// 获取流程模型详情
	modelDetail(data) {
		return request({
			url: '/flw/process/modelDetail',
			method: 'GET',
			data: data
		})
	}
}