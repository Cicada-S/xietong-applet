const msg = {
	/**
	 * 轻提示
	 * @param {Object} msg
	 */
	toast(msg) {

		uni.showToast({
			title: msg,
			icon: 'none',
			duration: 1000
		})
	},
	/**
	 * 提示
	 * @param {Object} msg
	 * @param {Object} callback
	 */
	toastCallback(msg, callback) {
		uni.showToast({
			title: msg,
			icon: 'none',
			duration: 1000
		})
		setTimeout(() => {
			callback && callback()
		}, 1500)
	},
	/**
	 * 提示并返回上一步
	 */
	toastBack(msg, step = 1) {
		uni.showToast({
			title: msg,
			icon: 'none',
			duration: 1000
		})
		setTimeout(function() {
			uni.navigateBack({
				delta: step
			})
		}, 1500)
	},
	/**
	 * 提示并跳转URL
	 * @param {Object} msg
	 * @param {Object} url
	 */
	toastJump(msg, url) {
		uni.showToast({
			title: msg,
			icon: 'none',
			duration: 1000
		})
		setTimeout(function() {
			uni.navigateTo({
				url: url
			})
		}, 1500)
	},
	/**
	 * 提示并跳转URL
	 * @param {Object} msg
	 * @param {Object} url
	 */
	toastSwitch(msg, url) {
		uni.showToast({
			title: msg,
			icon: 'none',
			duration: 1000
		})
		setTimeout(function() {
			uni.switchTab({
				url: url
			})
		}, 1500)
	}
}


export default msg
