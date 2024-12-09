import store from '@/store'
import config from '@/config'
// #ifdef H5
import { pathAddRedirectUrl } from '@/util/common'
// #endif
const TokenKey = 'App-Token'
export function getToken() {
	return uni.getStorageSync(TokenKey)
}
export function setToken(token) {
	return uni.setStorageSync(TokenKey, token)
}
export function removeToken() {
	return uni.removeStorageSync(TokenKey)
}
// 页面跳转 校验权限
export function checkPermission(path) {
	if (!getToken()) {
		// 没有token
		if (config.NO_TOKEN_WHITE_LIST.includes(path)) {
			return true
		} else {
			uni.$snowy.modal.alert("页面【" + path + "】需要进行登录，才能进行访问！")
			// #ifdef H5
			uni.$snowy.tab.reLaunch(pathAddRedirectUrl(config.NO_TOKEN_BACK_URL, path))
			// #endif
			// #ifndef H5
			uni.$snowy.tab.reLaunch(config.NO_TOKEN_BACK_URL)
			// #endif
			return false
		}
	} else {
		// 有token
		if (config.NO_TOKEN_WHITE_LIST.includes(path) || config.HAS_TOKEN_WHITE_LIST.includes(path)) {
			return true
		} else {
			// 路径正则过滤：/pages/biz/user/index =》 /pages/biz/user/**			
			const isVisit = uni.$xeu.findTree(store.getters.userMobileMenus, item => {
				if (item.category === 'MENU' && item.menuType === 'MENU') {
					const itemPath = item.path
					// 不使用正则表达式（只有路径相同的时候才可以进行访问）
					if (item.regType === 'NO') {
						return path === itemPath
					}
					// 使用正则表达式规则（相同的文件夹路径下页面可进行访问）
					if (item.regType === 'YES') {
						const regExp = new RegExp("^" + itemPath.substr(0, itemPath.lastIndexOf("/") + 1))
						return regExp.test(path)
					}
				}
			})
			if (isVisit) {
				return true
			} else {
				uni.$snowy.modal.alert("页面【" + path + "】需要进行授权，才能进行访问！")
				// 无权访问
				uni.$snowy.tab.reLaunch(config.HAS_TOKEN_BACK_URL)
				return false
			}
		}
	}
}