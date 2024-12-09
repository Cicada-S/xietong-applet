import fileUpload from '@/util/file-upload'
import fileDownload from '@/util/file-download'
import request from '@/util/request'
import store from '@/store'
import { prefixUrl } from "@/util/api-adaptive"

export default {
	// 预览
	previewFile(fileId){
		return `${store.getters.allEnv[store.getters.envKey].baseUrl}${prefixUrl('/dev/')}file/download?id=${fileId}`
	},
	// 动态上传文件返回id
	fileUploadDynamicReturnId(param) {
		return fileUpload({
			url: '/dev/file/uploadDynamicReturnId',
			file: param.file,
			filePath: param.filePath
		})
	},
	// 动态上传文件返回url
	fileUploadDynamicReturnUrl(param) {
		return fileUpload({
			url: '/dev/file/uploadDynamicReturnUrl',
			file: param.file,
			filePath: param.filePath
		})
	},
	// 本地文件上传，返回文件id
	fileUploadReturnId(param) {
		return fileUpload({
			url: '/dev/file/uploadLocalReturnId',
			file: param.file,
			filePath: param.filePath
		})
	},
	// 阿里云文件上传，返回文件id
	fileUploadAliyunReturnId(param) {
		return fileUpload({
			url: '/dev/file/uploadAliyunReturnId',
			file: param.file,
			filePath: param.filePath
		})
	},
	// 腾讯云文件上传，返回文件id
	fileUploadTencentReturnId(param) {
		return fileUpload({
			url: '/dev/file/uploadTencentReturnId',
			file: param.file,
			filePath: param.filePath
		})
	},
	// MINIO文件上传，返回文件id
	fileUploadMinioReturnId(param) {
		return fileUpload({
			url: '/dev/file/uploadMinioReturnId',
			file: param.file,
			filePath: param.filePath
		})
	},
	// 本地文件上传，返回文件Url
	fileUploadLocalReturnUrl(param) {
		return fileUpload({
			url: '/dev/file/uploadLocalReturnUrl',
			file: param.file,
			filePath: param.filePath
		})
	},
	// 阿里云文件上传，返回文件Url
	fileUploadAliyunReturnUrl(param) {
		return fileUpload({
			url: '/dev/file/uploadAliyunReturnUrl',
			file: param.file,
			filePath: param.filePath
		})
	},
	// 腾讯云文件上传，返回文件Url
	fileUploadTencentReturnUrl(param) {
		return fileUpload({
			url: '/dev/file/uploadTencentReturnUrl',
			file: param.file,
			filePath: param.filePath
		})
	},
	// MINIO文件上传，返回文件Url
	fileUploadMinioReturnUrl(param) {
		return fileUpload({
			url: '/dev/file/uploadMinioReturnUrl',
			file: param.file,
			filePath: param.filePath
		})
	},
	// 获取文件分页列表
	filePage(data) {
		return request({
			url: '/dev/file/page',
			method: 'GET',
			data: data
		})
	},
	// 获取文件列表
	fileList(data) {
		return request({
			url: '/dev/file/list',
			method: 'GET',
			data: data
		})
	},
	// 下载文件，这里要带上blob类型
	fileDownload(id) {
		return fileDownload({
			url: '/dev/file/download?id=' + id,
		})
	},
	// 获取文件详情
	fileDetail(data) {
		return request({
			url: '/dev/file/detail',
			method: 'GET',
			data: data
		})
	},
	// 删除文件
	fileDelete(data) {
		return request({
			url: '/dev/file/delete',
			method: 'POST',
			data: data
		})
	}
}