import { ID_DATA_TYPE } from './enum'

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
 * 处理id数据
 */
export const handleIdData = (idData, idDataType, map = { id: "id", url: "url" }) => {
	let idArr = []
	if (isEmpty(idData)) {
		return idArr
	}
	if (uni.$xeu.isString(idData)) {
		if (ID_DATA_TYPE.idArrJsonStr.code === idDataType) {
			JSON.parse(idData).forEach(item => {
				if (isEmpty(item[map.id])) {
					return
				}
				idArr.push(item[map.id])
			})
		}
		if (ID_DATA_TYPE.idStr.code === idDataType) {
			idData.split(ID_DATA_TYPE.idStr.separation).forEach(item => {
				if (isEmpty(item)) {
					return
				}
				idArr.push(item)
			})
		}
		if (ID_DATA_TYPE.urlStr.code === idDataType) {
			idData.split(ID_DATA_TYPE.urlStr.separation).forEach(item => {
				const urlId = uni.$xeu.parseUrl(item[map.url])?.searchQuery[map.id]
				if (isEmpty(urlId)) {
					return
				}
				idArr.push(urlId)
			})
		}
	}
	if (uni.$xeu.isArray(idData)) {
		idData.forEach(item => {
			if (ID_DATA_TYPE.idArr.code === idDataType) {
				if (isEmpty(item)) {
					return
				}
				idArr.push(item)
			}
			if (ID_DATA_TYPE.urlArr.code === idDataType) {
				const urlId = uni.$xeu.parseUrl(item)?.searchQuery[map.id]
				if (isEmpty(urlId)) {
					return
				}
				idArr.push(urlId)
			}
			if (ID_DATA_TYPE.objArr.code === idDataType) {
				// 优先取url中的id
				const urlId = uni.$xeu.parseUrl(item[map.url])?.searchQuery[map.id] || item[map.id]
				if (isEmpty(urlId)) {
					return
				}
				idArr.push(urlId)
			}
		})
	}
	return idArr
}
/**
 * 根据id获取文件数据
 */
export const getFileDataById = (idDataType, fileList = [], map= { id: "id", url: "url" }) => {
	if (ID_DATA_TYPE.objArr.code === idDataType) {
		return fileList
	}
	if (ID_DATA_TYPE.idArrJsonStr.code === idDataType) {
		return JSON.stringify(fileList)
	}
	let fileData = null
	const tempData = []
	if (ID_DATA_TYPE.idStr.code === idDataType || ID_DATA_TYPE.idArr.code === idDataType) {
		fileList.forEach(image => {
			tempData.push(image[map.id])
		})
	}
	if (ID_DATA_TYPE.urlStr.code === idDataType || ID_DATA_TYPE.urlArr.code === idDataType) {
		fileList.forEach(image => {
			tempData.push(image[map.url])
		})
	}
	if (ID_DATA_TYPE.idArr.code === idDataType || ID_DATA_TYPE.urlArr.code === idDataType) {
		fileData = tempData
	}
	if (ID_DATA_TYPE.idStr.code === idDataType) {
		fileData = tempData.join(ID_DATA_TYPE.idStr.separation)
	}
	if (ID_DATA_TYPE.urlStr.code === idDataType) {
		fileData = tempData.join(ID_DATA_TYPE.urlStr.separation)
	}
	return fileData
}


