import request from '@/util/request'
export default {
	// 获取登录用户的移动端菜单
	userLoginMobileMenu() {
		return request({
			url: '/sys/userCenter/loginMobileMenu',
			method: 'GET'
		})
	},
	// 编辑个人信息
	userUpdateUserInfo(data) {
		return request({
			url: '/sys/userCenter/updateUserInfo',
			method: 'POST',
			data: data
		})
	},
	// 修改用户密码
	userUpdatePassword(data) {
		return request({
			url: '/sys/userCenter/updatePassword',
			method: 'POST',
			data: data
		})
	},
	// 获取登录用户的职位信息
	userLoginPositionInfo(data) {
		return request({
			url: '/sys/userCenter/loginPositionInfo',
			method: 'GET',
			data: data
		})
	},
	// 获取登录用户的站内信分页
	userLoginUnreadMessagePage(data) {
		return request({
			url: '/sys/userCenter/loginUnreadMessagePage',
			method: 'GET',
			data: data
		})
	},
	// 读取登录用户站内信详情
	userLoginUnreadMessageDetail(data) {
		return request({
			url: '/sys/userCenter/loginUnreadMessageDetail',
			method: 'GET',
			data: data
		})
	},
	// 根据id集合获取职位集合
	getPositionListByIdList(data) {
		return request({
			url: '/sys/userCenter/getPositionListByIdList',
			method: 'POST',
			data: data
		})
	},
	// 根据id集合获取用户集合
	userCenterGetUserListByIdList(data) {
		return request({
			url: '/sys/userCenter/getUserListByIdList',
			method: 'POST',
			data: data
		})
	},
	// 根据id集合获取组织集合
	userCenterGetOrgListByIdList(data) {
		return request({
			url: '/sys/userCenter/getOrgListByIdList',
			method: 'POST',
			data: data
		})
	},
	// 根据id集合获取职位集合
	userCenterGetPositionListByIdList(data) {
		return request({
			url: '/sys/userCenter/getPositionListByIdList',
			method: 'POST',
			data: data
		})
	},
	// 根据id集合获取角色集合
	userCenterGetRoleListByIdList(data) {
		return request({
			url: '/sys/userCenter/getRoleListByIdList',
			method: 'POST',
			data: data
		})
	},
}