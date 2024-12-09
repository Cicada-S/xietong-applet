/**
 * 常用方法封装 请求，文件上传等
 * @author King. 
 **/

const axios = {
	//接口地址
	interfaceUrl: function() {
		return 'https://api.xietongcloud.net/api'
		return 'http://localhost:9003/api'
	},
	//前端地址
	frontUrl: function() {
		return uni.getStorageSync("domain") ? uni.getStorageSync("domain") : 'https://mes.xietongcloud.net'
		return uni.getStorageSync("domain") ? uni.getStorageSync("domain") : 'https://localhost:9000'
	},
	toast: function(text, duration, success) {
		uni.showToast({
			title: text || "出错啦~",
			icon: success ? 'success' : 'none',
			duration: duration || 2000
		})
	},
	modal: function(title, content, showCancel, callback, confirmColor, confirmText) {
		uni.showModal({
			title: title || '提示',
			content: content,
			showCancel: showCancel,
			cancelColor: "#555",
			confirmColor: confirmColor || "#5677fc",
			confirmText: confirmText || "确定",
			success(res) {
				if (res.confirm) {
					callback && callback(true)
				} else {
					callback && callback(false)
				}
			}
		})
	},
	isAndroid: function() {
		const res = uni.getSystemInfoSync();
		return res.platform.toLocaleLowerCase() == "android"
	},
	isPhoneX: function() {
		const res = uni.getSystemInfoSync();
		let iphonex = false;
		let models = ['iphonex', 'iphonexr', 'iphonexsmax', 'iphone11', 'iphone11pro', 'iphone11promax']
		const model = res.model.replace(/\s/g, "").toLowerCase()
		if (models.includes(model)) {
			iphonex = true;
		}
		return iphonex;
	},
	constNum: function() {
		let time = 0;
		// #ifdef APP-PLUS
		time = this.isAndroid() ? 300 : 0;
		// #endif
		return time
	},
	delayed: null,
	showLoading: function(title, mask = true) {
		uni.showLoading({
			mask: mask,
			title: title || '请稍候...'
		})
	},
	/**
	 * 请求数据处理
	 * @param string url 请求地址
	 * @param string method 请求方式
	 *  GET or POST
	 * @param {*} postData 请求参数
	 * @param bool isDelay 是否延迟显示loading
	 * @param bool isForm 数据格式
	 *  true: 'application/x-www-form-urlencoded'
	 *  false:'application/json'
	 * @param bool hideLoading 是否隐藏loading
	 *  true: 隐藏
	 *  false:显示
	 */
	request: async function(url, method, postData, isDelay, isForm, hideLoading) {
		//接口请求
		let loadding = false;
		axios.delayed && uni.hideLoading();
		clearTimeout(axios.delayed);
		axios.delayed = null;
		if (!hideLoading) {
			if (isDelay) {
				axios.delayed = setTimeout(() => {
					loadding = true
					axios.showLoading()
				}, 1000)
			} else {
				loadding = true
				axios.showLoading()
			}
		}

		return new Promise((resolve, reject) => {
			let header = {
				'content-type': isForm ? 'application/x-www-form-urlencoded' : 'application/json',
				'lat': uni.getStorageSync('lat'),
				'lng': uni.getStorageSync('lng'),
			}
			header.Domain = axios.frontUrl()
			header.Token = axios.getToken()
			const reloadCodes = [401, 1011007, 1011008]

			uni.request({
				url: axios.interfaceUrl() + url,
				data: postData,
				header: header,
				method: method, //'GET','POST'
				dataType: 'json',
				success: (res) => {
					clearTimeout(axios.delayed)
					axios.delayed = null;
					if (loadding && !hideLoading) {
						uni.hideLoading()
					}
					let code = res.data.code
					if (reloadCodes.includes(code)) {
						uni.removeStorageSync("token")
						uni.removeStorageSync("userinfo")
						uni.reLaunch({
							url: `/pages/mine/login`
						})
						return
					}else if (code === 200) {
						resolve(res.data)
					} else {
						uni.showToast({
							icon: "none",
							title: res.data.msg
						})
					}
				},
				fail: (res) => {
					clearTimeout(axios.delayed)
					axios.delayed = null;
					axios.toast("网络不给力，请稍后再试~")
					reject(res)
				}
			})
		})
	},
	/**
	 * 上传文件
	 * @param string url 请求地址
	 * @param string src 文件路径
	 */
	uploadFile: function(url, src) {
		axios.showLoading()
		return new Promise((resolve, reject) => {
			const uploadTask = uni.uploadFile({
				url: axios.interfaceUrl() + url,
				filePath: src,
				name: 'imageFile',
				header: {
					'Authorization': axios.getToken()
				},
				formData: {
					// sizeArrayText:""
				},
				success: function(res) {
					uni.hideLoading()
					let d = JSON.parse(res.data.replace(/\ufeff/g, "") || "{}")
					if (d.code % 100 == 0) {
						//返回图片地址
						let fileObj = d.data;
						resolve(fileObj)
					} else {
						that.toast(res.msg);
					}
				},
				fail: function(res) {
					reject(res)
					that.toast(res.msg);
				}
			})
		})
	},
	axiosJsonp: function(url, callback, callbackname) {
		// #ifdef H5
		window[callbackname] = callback;
		let axiosScript = document.createElement("script");
		axiosScript.src = url;
		axiosScript.type = "text/javascript";
		document.head.appendChild(axiosScript);
		document.head.removeChild(axiosScript);
		// #endif
	},

	//获取token
	getToken() {
		return uni.getStorageSync("token")
	},

}

export default axios