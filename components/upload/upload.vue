<template>
	<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" :maxCount="10">
	</u-upload>
</template>

<script>
	export default {
		data() {
			return {
				fileList1: [],
			}
		},
		props: {
			value: {
				type: String,
				default: null
			}
		},
		mounted(){
			if(this.value){
				let arr = new Array()
				this.value.split(",").forEach((item,index) => {
					arr.push({
						status: 'success',
						message: '',
						url: `https://cdn.hjgbsop.com${item}`
					})
				})
				this.fileList1 = arr
			}
		},
		methods: {
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
				let arr = new Array()
				this.fileList1.map(item => {
					arr.push(item.url.replace("https://cdn.hjgbsop.com",""))
				})
				this.$emit("upload", arr.join(","))
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}

				let arr = new Array()
				this.fileList1.map(item => {
					arr.push(item.url.replace("https://cdn.hjgbsop.com",""))
				})
				this.$emit("upload", arr.join(","))
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: this.$axios.interfaceUrl()+"/webapp/dev/file/uploadAliyunReturnUrl", // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						header: {
							'Domain': this.$axios.frontUrl(),
							'Token': this.$axios.getToken()
						},
						success: (res) => {
							let data = JSON.parse(res.data)
							setTimeout(() => {
								resolve(data.data)
							}, 500)
						}
					});
				})
			},
		}

	}
</script>
