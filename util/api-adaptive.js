import config from '@/config'
// 微服务环境下如果拆分为多个代码模块，那他的url是网关转发，这里就要配置，其次在api文件已经引用此类了
const PREFIX = [{
	label: '/mobile/',
	value: '/api/webapp'
},{
	label: '/sys/',
	value: '/api/webapp'
}, {
	label: '/auth/',
	value: '/api/webapp'
}, {
	label: '/client/',
	value: '/api/webapp'
}, {
	label: '/dev/',
	value: '/api/webapp'
}, {
	label: '/biz/',
	value: '/api/bizapp'
},{
	label: '/ten/',
	value: '/api/tenapp'
},{
	label: '/flw/',
	value: '/api/flwapp'
}]
// 匹配并返回接口前缀
export const prefixUrl = (url) => {
	if (config.SERVER_TYPE === 'SNOWY_CLOUD') {
		const prefixUrlArray = PREFIX.filter((f) => url.indexOf(f.label) > -1)
		if (prefixUrlArray && prefixUrlArray.length > 0) {
			return prefixUrlArray[0].value + url
		}
		return url
	} else {
		return url
	}
}