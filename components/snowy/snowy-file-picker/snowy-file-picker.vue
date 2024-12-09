<template>
	<snowy-file-view v-model="localFileList" :map="this.map">
		<template #fileItemExt="data">
			<view v-if="!forbidDel" class="file-del" @tap.stop="delFile(data.index)"></view>
		</template>
		<template #fileListExt>
			<view v-if="isShowAdd" class="upload-add snowy-shadow" @tap="chooseFile">
				<slot>
					<view class="upload-icon icon-plus"></view>
				</slot>
			</view>
		</template>
	</snowy-file-view>
</template>
<script>
	import { isEmpty, handleIdData, getFileDataById } from './utils'
	import { ID_DATA_TYPE, CALLBACK_STATE } from './enum'
	export default{
		props:{
			modelValue: {
				type: [String, Array]
			},
			map: {
				type: Object,
				default: () => {
					return {
						id: "id",
						name: "name",
						url: "url",
						ext: "ext"
					}
				},
				required: false
			},
			idDataType: {
				type: String,
				default: ID_DATA_TYPE.idStr.code,
				required: false
			},
			//禁用删除
			forbidDel: {
				type: Boolean,
				default: false
			},
			//禁用添加
			forbidAdd: {
				type: Boolean,
				default: false
			},
			// 媒体类型
			mediaType: {
				type: String,
				default: 'image', // image/video/all
				required: false
			},
			//限制数
			limit: {
				type: Number,
				default: 9
			},
			//original 原图，compressed 压缩图，默认二者都有
			sizeType: {
				type: Array,
				default () {
					return ['original', 'compressed']
				}
			},
			//album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
			sourceType: {
				type: Array,
				default () {
					return ['album', 'camera']
				}
			},
			//可上传图片类型，默认为空，不限制  Array<String> ['jpg','png','gif']
			imageFormat: {
				type: Array,
				default () {
					return []
				}
			},
			//单张图片大小限制 MB
			size: {
				type: Number,
				default: 50
			},
		},
		data() {
			return{
				localFileList:[],
				
			}
		},
		computed:{
		    isShowAdd(){   
		        let isShow = true;
		        if (this.forbidAdd || (this.limit && this.localFileList.length >= this.limit)) {
		        	isShow = false;
		        }
		        return isShow
		    } 
		},
		watch:{
			modelValue:{
				handler(newValue, oldValue){
					if (newValue !== oldValue) {
						this.setLocalFileList()
					}
				},
				immediate:true,
				deep:true
			},
		},
		mounted() {
			this.setLocalFileList()
		},
		methods:{
			setLocalFileList() {
				const idArr = this.handleIdData(this.modelValue, this.idDataType)
				const promiseList = []
				for (let i = 0; i < idArr.length; i++) {
					promiseList.push(new Promise((resolve, reject) => {
						this.$emit('getFileInfoById', { [this.map.id]: idArr[i] }, ({ state, data, msg }) => {
							// 回调错误异常处理
							if (state === CALLBACK_STATE.ERROR) {
								uni.showModal({
									title: '警告提示',
									content: msg,
									showCancel: false
								})
								return
							}
							resolve(data)
						})
					}))
				}
				Promise.all(promiseList).then((result) => {
					this.localFileList = result
				}).catch(err => {
					console.log(err)
				})
			},
			delFile() {
				uni.showModal({
					title: '提示',
					content: '确认删除该文件吗？',
					showCancel: true,
					cancelColor: "#555",
					confirmColor: "#eb0909",
					confirmText: "确定",
					success(res) {
						if (res.confirm) {
							emits('deleteFile', { file: this.localFileList[index] }, ({ state, data, msg }) => {
								// 回调错误异常处理
								if (state === CALLBACK_STATE.ERROR) {
									uni.showModal({
										title: '警告提示',
										content: msg,
										showCancel: false
									})
									return
								}						
								this.localFileList.splice(index, 1)
								emits('update:modelValue', getFileDataById(this.idDataType, this.localFileList, this.map))
							})
						}
					}
				})
			},
			chooseFile() {
				if ('image' == this.mediaType) {
					uni.chooseImage({
						count: this.limit - this.localFileList.length,
						sizeType: this.sizeType,
						sourceType: this.sourceType,
						success: (e) => {
							const promiseList = []
							for (let i = 0; i < e.tempFiles.length; i++) {
								let len = this.localFileList.length;
								if (len >= this.limit) {
									uni.showToast({
										title: `最多可上传${this.limit}个文件`,
										icon: "none"
									})
									break;
								}
								//过滤图片类型
								let path = e.tempFiles[i].path;
								if (this.imageFormat.length > 0) {
									let format = ""
									// #ifdef H5
									let type = e.tempFiles[i].type;
									format = type.split('/')[1]
									// #endif
									// #ifndef H5
									format = path.split(".")[(path.split(".")).length - 1];
									// #endif
									if (this.imageFormat.indexOf(format) == -1) {
										let text = `只能上传 ${this.imageFormat.join(',')} 格式图片！`
										uni.showToast({
											title: text,
											icon: "none"
										})
										continue;
									}
									//过滤超出大小限制文件
									let size = e.tempFiles[i].size;
									if (this.size * 1024 * 1024 < size) {
										let err = `单个文件大小不能超过：${this.size}MB`
										uni.showToast({
											title: err,
											icon: "none"
										})
										continue;
									}
								}
								promiseList.push(
									new Promise((resolve, reject) => {
										emits('uploadFile', { filePath: path }, ({ state, data, msg }) => {
											// 回调错误异常处理
											if (state === CALLBACK_STATE.ERROR) {
												uni.showModal({
													title: '警告提示',
													content: msg,
													showCancel: false
												})
												return
											}
											resolve(data)
										})
									})
								)
							}
							
							if (isEmpty(promiseList)) {
								return
							}
							Promise.all(promiseList).then((result) => {
								this.localFileList.push(...result)
								emits('update:modelValue', getFileDataById(this.idDataType, this.localFileList, this.map))
							}).catch(err => {
								console.log(err)
							})
						}
					})
				}
				if ('video' == this.mediaType) {
					uni.chooseVideo({
						sourceType: this.sourceType,
						success: function(e) {
							let len = this.localFileList.length;
							if (len >= this.limit) {
								uni.showToast({
									title: `最多可上传${this.limit}个文件`,
									icon: "none"
								})
								return;
							}
							// #ifdef H5
							//过滤超出大小限制文件
							let size = e.tempFile.size;
							if (this.size * 1024 * 1024 < size) {
								let err = `单个文件大小不能超过：${this.size}MB`
								uni.showToast({
									title: err,
									icon: "none"
								})
								return;
							}
							// #endif
							emits('uploadFile', { filePath: e.tempFilePath }, ({ state, data, msg }) => {
								// 回调错误异常处理
								if (state === CALLBACK_STATE.ERROR) {
									uni.showModal({
										title: '警告提示',
										content: msg,
										showCancel: false
									})
									return
								}
								this.localFileList.push(data)
								emits('update:modelValue', getFileDataById(this.idDataType, this.localFileList, this.map))
							})
							
						}
					})
				}
			}
		}
		
	}
</script>
<style lang="scss" scoped>
	@font-face {
		font-family: 'snowyUpload';
		src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAATcAA0AAAAAByQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAEwAAAABoAAAAciR52BUdERUYAAASgAAAAHgAAAB4AKQALT1MvMgAAAaAAAABCAAAAVjxvR/tjbWFwAAAB+AAAAEUAAAFK5ibpuGdhc3AAAASYAAAACAAAAAj//wADZ2x5ZgAAAkwAAADXAAABAAmNjcZoZWFkAAABMAAAAC8AAAA2FpiS+WhoZWEAAAFgAAAAHQAAACQH3QOFaG10eAAAAeQAAAARAAAAEgwAACBsb2NhAAACQAAAAAwAAAAMAEoAgG1heHAAAAGAAAAAHwAAACABEgA2bmFtZQAAAyQAAAFJAAACiCnmEVVwb3N0AAAEcAAAACgAAAA6OMUs4HjaY2BkYGAAYo3boY/i+W2+MnCzMIDAzb3qdQj6fwPzf+YGIJeDgQkkCgA/KAtvAHjaY2BkYGBu+N/AEMPCAALM/xkYGVABCwBZ4wNrAAAAeNpjYGRgYGBl0GJgZgABJiDmAkIGhv9gPgMADTABSQB42mNgZGFgnMDAysDA1Ml0hoGBoR9CM75mMGLkAIoysDIzYAUBaa4pDA7PGJ9xMjf8b2CIYW5gaAAKM4LkANt9C+UAAHjaY2GAABYIVmBgAAAA+gAtAAAAeNpjYGBgZoBgGQZGBhBwAfIYwXwWBg0gzQakGRmYnjE+4/z/n4EBQksxSf6GqgcCRjYGOIeRCUgwMaACRoZhDwCiLwmoAAAAAAAAAAAAAAAASgCAeNpdjkFKw0AARf/vkIR0BkPayWRKQZtYY90ohJju2kOIbtz0KD1HVm50UfEmWXoAr9ADOHFARHHzeY//Fx8Ci+FJfIgdJFa4AhgiMshbrCuIsLxhFJZVs+Vl1bT1GddtbXTC3OhohN4dg4BJ3zMJAnccyfm468ZzHXddrH9ZKbHzdf9n/vkY/xv9sPQXgGEvBrHHwst5kTbXLE+YpYVPkxepPmW94W16UbdNJd6f3SAzo5W7m1jaKd+8ZZIvk5nlKw9SK6Wle7BLS3f/bTzQLmfAF2T1NsQAeNp9kD1OAzEQhZ/zByQSQiCoXVEA2vyUKRMp9Ailo0g23pBo1155nUg5AS0VB6DlGByAGyDRcgpelkmTImvt6PObmeexAZzjGwr/3yXuhBWO8ShcwREy4Sr1F+Ea+V24jhY+hRvUf4SbuFUD4RYu1BsdVO2Eu5vSbcsKZxgIV3CKJ+Eq9ZVwjfwqXMcVPoQb1L+EmxjjV7iFa2WpDOFhMEFgnEFjig3jAjEcLJIyBtahOfRmEsxMTzd6ETubOBso71dilwMeaDnngCntPbdmvkon/mDLgdSYbh4FS7YpjS4idCgbXyyc1d2oc7D9nu22tNi/a4E1x+xRDWzU/D3bM9JIbAyvkJI18jK3pBJTj2hrrPG7ZynW814IiU68y/SIx5o0dTr3bmniwOLn8owcfbS5kj33qBw+Y1kIeb/dTsQgil2GP5PYcRkAAAB42mNgYoAALjDJyIAOWMGiTIxMjMxsKak5qSWpbFmZiRmJ+QAmgAUIAAAAAf//AAIAAQAAAAwAAAAWAAAAAgABAAMABAABAAQAAAACAAAAAHjaY2BgYGQAgqtL1DlA9M296nUwGgA+8QYgAAA=) format('woff');
		font-weight: normal;
		font-style: normal;
	}

	.upload-icon {
		font-family: "snowyUpload" !important;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		padding: 10rpx;
		color: #888;
		font-size: 50rpx;
	}

	.icon-plus:before {
		content: "\e609";
	}

	.file-del {
		width: 36rpx;
		height: 36rpx;
		position: absolute;
		right: 0rpx;
		top: -5rpx;
		border-radius: 50%;
		color: #ffffff;
		font-size: 34rpx;
		z-index: 5;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
		background: #EB0909;
	}

	.file-del::before {
		content: '';
		width: 15rpx;
		height: 1rpx;
		position: absolute;
		left: 10rpx;
		top: 18rpx;
		background-color: #fff;
	}

	.upload-add {
		font-weight: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		overflow: hidden;
		box-sizing: border-box;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
		width: 150rpx;
		height: 150rpx;
		margin: 10rpx;
	}
</style>