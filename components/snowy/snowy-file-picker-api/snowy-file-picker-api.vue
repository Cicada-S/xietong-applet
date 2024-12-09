<template>
	<view>
		<snowy-file-picker
			v-model="localData"
			:map="map"
			:idDataType="idDataType"
			@getFileInfoById="getFileInfoById"
			@uploadFile="uploadFile"
			@deleteFile="deleteFile"
			:mediaType="props.mediaType"
			:sourceType="props.sourceType"
			:forbidAdd="props.disabled"
			:forbidDel="props.disabled"
			:limit="props.limit"
		>
		</snowy-file-picker>
	</view>
</template>
<script>
	import fileApi from '@/api/dev/file-api'
	import { prefixUrl } from "@/util/api-adaptive"
	import { ID_DATA_TYPE, CALLBACK_STATE } from "@/components/snowy/snowy-file-picker/enum"
	import store from '@/store'
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
			disabled: {
				type: Boolean,
				default: false,
				required: false
			},
			// 媒体类型
			mediaType: {
				type: String,
				default: 'image', // image/video/all
				required: false
			},
			//album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
			sourceType: {
				type: Array,
				default () {
					return ['album', 'camera']
				}
			},
			uploadType: {
				type: String,
				default: 'Dynamic' // Dynamic || Local || Aliyun || Tencent
			},
			//限制数
			limit: {
				type: Number,
				default: 9
			},
		},
		data(){
			return{
				localData:'',
				
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
						this.setLocalData()
					}
				},
				immediate:true,
				deep:true
			},
			localData:{
				handler(newValue, oldValue){
					if (newValue !== oldValue) {
						this.$emit('update', this.localData)
					}
				},
				immediate:true,
				deep:true
			},
		},
		mounted() {
			this.setLocalData()
		},
		methods:{
			setLocalData() {
				this.localData.value = this.modelValue
			},
			getFileInfoById(param, callback){
				fileApi.fileDetail({ id: param[this.map.id] }).then(data => {
					// #ifndef APP-PLUS
					callback({
						state: CALLBACK_STATE.SUCCESS,
						data: {
							[this.map.id]: data.id,
							[this.map.name]: data.name,
							[this.map.url]: fileApi.previewFile(data.id),
							[this.map.ext]: data?.suffix,
						},
					})
					// #endif
					// #ifdef APP-PLUS
					fileApi.fileDownload(data.id).then(response => {
						callback({
							state: CALLBACK_STATE.SUCCESS,
							data: {
								[this.map.id]: data.id,
								[this.map.name]: data.name,
								[this.map.url]: response.tempFilePath,
								[this.map.ext]: data?.suffix,
							},
						})
					})
					// #endif
				})
			},
			uploadApi(param) {
				return new Promise((resolve, reject) => {
					if ('Local' == this.uploadType) {
						fileApi.fileUploadReturnId(param).then(data => {
							resolve(data)
						}).catch((e) => {
							reject(e)
						})
					} else if ('Aliyun' == this.uploadType) {
						fileApi.fileUploadAliyunReturnId(param).then(data => {
							resolve(data)
						}).catch((e) => {
							reject(e)
						})
					} else if ('Tencent' == this.uploadType) {
						fileApi.fileUploadTencentReturnId(param).then(data => {
							resolve(data)
						}).catch((e) => {
							reject(e)
						})
					} else {
						fileApi.fileUploadDynamicReturnId(param).then(data => {
							resolve(data)
						}).catch((e) => {
							reject(e)
						})
					}
				})
			},
			uploadFile(param, callback) {
				uploadApi({ filePath: param.filePath }).then(data => {
					fileApi.fileDetail({ id: data }).then(detailData => {
						callback({
							state: CALLBACK_STATE.SUCCESS,
							data: {
								[props.map.id]: detailData.id,
								[props.map.name]: detailData.name,
								[props.map.url]: fileApi.previewFile(detailData.id),
								[props.map.ext]: detailData.suffix
							},
						})
					})
				})
			},
			deleteFile(param, callback){
				fileApi.fileDelete([ { id: param.file[props.map.id] } ]).then(data => {
					callback({
						state: CALLBACK_STATE.SUCCESS,
						data: null,
					})
				})
			}
		}
	}



</script>
<style lang="scss" scoped>
	::v-deep .uni-row {
		display: flex;
		align-items: center;
		height: 100%;
	}
</style>