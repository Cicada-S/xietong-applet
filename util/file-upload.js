import store from '@/store'
import { getToken } from '@/util/auth'
import { errorCodeMap, reloadCodes } from '@/util/errorCode'
import { tansParams } from '@/util/common'
import config from '@/config'
import { prefixUrl } from "@/util/api-adaptive"
// #ifdef H5
import { pathAddRedirectUrl } from '@/util/common'
import { getH5RouteByUrl } from '@/util/common'
// #endif
const { TIMEOUT, TOKEN_NAME, TOKEN_PREFIX, NO_TOKEN_BACK_URL } = config
//todo 待优化
const fileUpload = (config) => {
	// 适配URL路径
	config.url = prefixUrl(config.url)
	// 是否需要设置 token
	const isToken = (config.extConf || {}).isToken === false
	config.header = config.header || {}
	if (getToken() && !isToken) {
		config.header[TOKEN_NAME] = TOKEN_PREFIX + getToken()
	}
	config.header.Domain = store.getters.tenantDomain
	// get请求映射params参数
	if (config.params) {
		let url = config.url + '?' + tansParams(config.params)
		url = url.slice(0, -1)
		config.url = url
	}
	return new Promise((resolve, reject) => {
		uni.$snowy.modal.loading('努力加载中')
		uni.uploadFile({
			timeout: config.timeout || TIMEOUT,
			url: config.actionUrl || ((config.baseUrl || store.getters.allEnv[store.getters.envKey].baseUrl) + config.url),
			file: config.file,
			filePath: config.filePath,
			name: config.name || 'file',
			header: config.header,
			formData: config.formData,
			success: (response) => {
				if ('string' == typeof(response.data)) {
					// JSON.stringify(str);
					response.data = JSON.parse(response.data)
				}
				const code = response.data.code || 200
				const msg = response.data.msg || errorCodeMap[code] || errorCodeMap['default']
				if (reloadCodes.includes(code)) {
					uni.$snowy.modal.confirm(msg || '登录状态已过期，您可以清除缓存，重新进行登录?').then(() => {
						store.commit('CLEAR_cache')
						// #ifdef H5
						uni.$snowy.tab.reLaunch(pathAddRedirectUrl(NO_TOKEN_BACK_URL, getH5RouteByUrl()))
						// #endif
						// #ifndef H5
						uni.$snowy.tab.reLaunch(NO_TOKEN_BACK_URL)
						// #endif
					})
					reject('无效的会话，或者会话已过期，请重新登录。')
				} else if (code !== 200) {
					uni.$snowy.modal.alert(msg)
					reject(code)
				}
				// 是否返回服务端原数据
				if (config.isReturnOriginalData) {
					resolve(response?.data)
				} else {
					resolve(response?.data?.data)
				}
			},
			fail: (error) => {
				let {
					errMsg
				} = error
				if (errMsg === 'Network Error') {
					errMsg = '后端接口连接异常'
				} else if (errMsg.includes('timeout')) {
					errMsg = '系统接口请求超时'
				} else if (errMsg.includes('Request failed with status code')) {
					errMsg = '系统接口' + errMsg.substr(errMsg.length - 3) + '异常'
				} else if (errMsg.includes('request:fail')) {
					errMsg = '请求失败'
				}
				uni.$snowy.modal.alert(errMsg)
				reject(error)
			},
			complete: () => {
				uni.$snowy.modal.closeLoading()
			}
		})
	})
}
export default fileUpload