import store from '@/store'
import { prefixUrl } from "@/util/api-adaptive"

// 判断不为空
export const isNotEmpty = (value) => {
	if (typeof value === 'object') {
		for (const key in value) {
			return true
		}
		return false
	}
	return !(value === null || value === undefined || value === 'undefined' || value === '')
}
// 判断为空
export const isEmpty = (value) => {
	return !isNotEmpty(value)
}

/**
 * 获取文件的地址
 */
export const getFileUrl = (fileType, imgUrl) => {
	if (isEmpty(fileType)){
		return imgUrl;
	}
	if (['png', 'jpg', 'jpng', 'ico', 'gif', 'image/png'].includes(fileType)) {
		return imgUrl
	}
	if (['doc'].includes(fileType)) {
		return store.getters.allEnv[store.getters.envKey].baseUrl + prefixUrl('/mobile/') + 'fileImg/docx.png'
	}
	if (['xls'].includes(fileType)) {
		return store.getters.allEnv[store.getters.envKey].baseUrl + prefixUrl('/mobile/') + 'fileImg/xlsx.png'
	}
	if (['zip'].includes(fileType)) {
		return store.getters.allEnv[store.getters.envKey].baseUrl + prefixUrl('/mobile/') + 'fileImg/zip.png'
	}
	if (['rar'].includes(fileType)) {
		return store.getters.allEnv[store.getters.envKey].baseUrl + prefixUrl('/mobile/') + 'fileImg/rar.png'
	}
	if (['ppt'].includes(fileType)) {
		return store.getters.allEnv[store.getters.envKey].baseUrl + prefixUrl('/mobile/') + 'fileImg/ppt.png'
	}
	if (['txt'].includes(fileType)) {
		return store.getters.allEnv[store.getters.envKey].baseUrl + prefixUrl('/mobile/') + 'fileImg/txt.png'
	}
	if (['html'].includes(fileType)) {
		return store.getters.allEnv[store.getters.envKey].baseUrl + prefixUrl('/mobile/') + 'fileImg/html.png'
	}
	return store.getters.allEnv[store.getters.envKey].baseUrl + prefixUrl('/mobile/') + 'fileImg/file.png'
}