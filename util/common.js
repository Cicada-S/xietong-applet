import config from '@/config'
// #ifdef H5
// import manifest from '@/manifest.json'
// #endif
import XEUtils from '@/plugins/xe-utils'
/**
 * 参数处理
 * @param params 参数
 */
export function tansParams(params) {
	let result = ''
	for (const propName of Object.keys(params)) {
		const value = params[propName]
		var part = encodeURIComponent(propName) + "="
		if (value !== null && value !== "" && typeof(value) !== "undefined") {
			if (typeof value === 'object') {
				for (const key of Object.keys(value)) {
					if (value[key] !== null && value[key] !== "" && typeof(value[key]) !== 'undefined') {
						let params = propName + '[' + key + ']'
						var subPart = encodeURIComponent(params) + "="
						result += subPart + encodeURIComponent(value[key]) + "&"
					}
				}
			} else {
				result += part + encodeURIComponent(value) + "&"
			}
		}
	}
	return result
}
// #ifdef H5
/**
 * 为path添加重定向url（主要用于在web条件下，登录之后跳转至固定页面）
 * @param {Object} path
 * @param {Object} redirectUrl
 */
export function pathAddRedirectUrl(path, redirectUrl) {
	const { search, searchQuery, hashQuery } = $xeu.parseUrl(location.href)
	if ($xeu.isEmpty(redirectUrl) || redirectUrl == config.NO_TOKEN_BACK_URL || search.indexOf('redirect=')  != -1 ) {
		return path += `${search}`
	}
	path += `?redirect=${redirectUrl}`
	if (!$xeu.isEmpty(searchQuery)) {
		path += `&${$xeu.serialize(searchQuery)}`
	}
	if (!$xeu.isEmpty(hashQuery)) {
		path += `&${$xeu.serialize(hashQuery)}`
	}
	return path
}

/**
 * h5条件下通过url获取路由地址
 */
export function getH5RouteByUrl(){
	const { hashKey, pathname } = $xeu.parseUrl(location.href)
	if (!$xeu.isEmpty(hashKey)) {
		return hashKey
	}
	return pathname.substring(manifest.h5.router.base.length - 1)
	// if (manifest.h5.router.base.length > 0) {
	// 	return pathname.substring(manifest.h5.router.base.length - 1)
	// } else {
	// 	return pathname
	// }
	
}
// #endif