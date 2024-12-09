
const utils = {
	/**
	 * 截取第一张图片方法
	 * @param {Object} info
	 */
	imagePath(info) {
		if (info) {
			return "https://cdn.xietongcloud.net"+info.split(",")[0];
		} else {
			return ''
		}
	},
	formatTime() {
		var now = new Date();
	
		var year = now.getFullYear(); //年
		var month = now.getMonth() + 1; //月
		var day = now.getDate(); //日
		var clock = year + "-";
		if (month < 10)
			clock += "0";
		clock += month + "-";
		if (day < 10)
			clock += "0";
		clock += day;
	
		return (clock);
	},
	
	/**
	 * 查找数组下标
	 * @param {Object} data
	 * @param {Object} id
	 */
	findArrIndex(data, id) {
		return data.findIndex(item => {
			if (item.id == id) {
				return true;
			}
		})
	},
	dictList(dictValue) {
		const dictTypeTree = uni.getStorageSync("dictList")
		if (!dictTypeTree) {
			return []
		}
		const tree = dictTypeTree.find((item) => item.dictValue === dictValue)
		if (tree) {
			return tree.children.map((item) => {
				return {
					value: item['dictValue'],
					label: item['name']
				}
			})
		}
		return []
	},
	
	isImageFile(filename) {
	  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'];
	  const extension = filename.split('.').pop().toLowerCase();
	  return imageExtensions.includes(extension);
	},
	/**
	 * 获取UUID
	 */
	getUUID() {
		var d = new Date().getTime();
		if (window.performance && typeof window.performance.now === "function") {
			d += performance.now(); //use high-precision timer if available
		}
		var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		});
		return uuid;
	},
	
	getFileSuffix(fileName) {
		return fileName.split('.').pop().toLowerCase()
	},
	subStr(str, start, n) {
		if (str.replace(/[\u4e00-\u9fa5]/g, '**').length <= n) {
			return str;
		}
		let len = 0;
		let tmpStr = '';
		for (let i = start; i < str.length; i++) { // 遍历字符串
			if (/[\u4e00-\u9fa5]/.test(str[i])) { // 中文 长度为两字节
				len += 2;
			} else {
				len += 1;
			}
			if (len > n) {
				break;
			} else {
				tmpStr += str[i];
			}
		}
		return tmpStr;
	},
	/**
	 * JSON对象转字符串
	 * @param {Object} res
	 */
	encryption(res) {
		return encodeURIComponent(JSON.stringify(res))
	},
	/**
	 * 字符串转JSON对象
	 * @param {Object} res
	 */
	decrypt(res) {
		return JSON.parse(decodeURIComponent(res))
	},
	hasPerm(data, rule = 'or') {
		if (!data) {
			return false
		}
		
		const buttonCodeList  = uni.getStorageSync("buttonCodeList")
		if (!buttonCodeList) {
			return false
		}
		if (Array.isArray(data)) {
			const fn = rule === 'or' ? 'some' : 'every'
			return data[fn]((item) => buttonCodeList.includes(item))
		}
		return buttonCodeList.includes(data)
	},
	hasMenu(data, rule = 'or') {
		if (!data) {
			return false
		}
		
		const menuList  = uni.getStorageSync("menu")
		if (!menuList) {
			return false
		}
		if (Array.isArray(data)) {
			const fn = rule === 'or' ? 'some' : 'every'
			return data[fn]((item) => menuList.includes(item))
		}
		return menuList.includes(data)
	}
}


export default utils 


