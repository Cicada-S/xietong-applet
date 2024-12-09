import request from '@/utils/request'
export default {
	// 获取人员分页
	userPage(data) {
		return request({
			url: '/biz/user/page',
			method: 'GET',
			data: data
		})
	},
	// 提交表单 add为false时为编辑，默认为新增
	submitForm(data, add = true) {
		return request({
			url: '/biz/user/' + (add ? 'add' : 'edit'),
			method: 'POST',
			data: data
		})
	},
	// 删除人员
	userDelete(data) {
		return request({
			url: '/biz/user/delete',
			method: 'POST',
			data: data
		})
	},
	// 获取人员详情
	userDetail(data) {
		return request({
			url: '/biz/user/detail',
			method: 'GET',
			data: data
		})
	},
	// 禁用人员
	userDisableUser(data) {
		return request({
			url: '/biz/user/disableUser',
			method: 'POST',
			data: data
		})
	},
	// 启用人员
	userEnableUser(data) {
		return request({
			url: '/biz/user/enableUser',
			method: 'POST',
			data: data
		})
	},
	// 重置人员密码
	userResetPassword(data) {
		return request({
			url: '/biz/user/resetPassword',
			method: 'POST',
			data: data
		})
	},
	// 获取组织选择器
	userOrgTreeSelector(data) {
		return request({
			url: '/biz/user/orgTreeSelector',
			method: 'GET',
			data: data
		})
	},
	// 获取职位选择器
	userPositionSelector(data) {
		return request({
			url: '/biz/user/positionSelector',
			method: 'GET',
			data: data
		})
	},
	// 获取角色选择器
	userRoleSelector(data) {
		return request({
			url: '/biz/user/roleSelector',
			method: 'GET',
			data: data
		})
	},
	// 获取人员选择器
	userSelector(data) {
		return request({
			url: '/biz/user/userSelector',
			method: 'GET',
			data: data
		})
	},
	// 人员拥有角色
	userOwnRole(data) {
		return request({
			url: '/biz/user/ownRole',
			method: 'GET',
			data: data
		})
	},
	// 给人员授权角色
	grantRole(data) {
		return request({
			url: '/biz/user/grantRole',
			method: 'POST',
			data: data
		})
	},
	// 获取动态字段的配置
	userDynamicFieldConfigList(data) {
		return request({
			url: '/biz/user/dynamicFieldConfigList',
			method: 'GET',
			data: data
		})
	}
}