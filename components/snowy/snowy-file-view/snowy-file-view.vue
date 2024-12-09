<template>
	<view>
		<view class="view-box">
			<view class="file-item" v-for="(item,index) in localFileList" :key="index">
				<image :src="getFileSrc(item)" mode="aspectFill" @tap.stop="openFile(item)" class="img-item snowy-shadow" :style="imgCustomStyle">
				</image>
				<slot name="fileItemExt" :item="item" :index="index"></slot>
			</view>
			<slot name="fileListExt"></slot>
		</view>
		<snowy-video-view ref="previewVideo"></snowy-video-view>
	</view>
</template>
<script>
	import { getFileUrl } from './utils'
	import { FILE_TYPE } from './enum'
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
			imgCustomStyle: {
				type: Object,
				default: () => {
					return {
						width: '150rpx',
						height: '150rpx',
						borderRadius: '5rpx'
					}
				},
				required: false
			}
		},
		data() {
			return{
				previewVideo:null,
				localFileList:[],
				
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
				this.localFileList = this.modelValue
			},
			getFileSrc(item) {
				const fileType = item && item[this.map.ext] ? item[this.map.ext] : ''
				return this.getFileUrl(fileType, item[this.map.url])
			},
			openFile(item) {
				if (FILE_TYPE.image.exts.includes(item?.ext)) {
					uni.previewImage({
						current: item[props.map.url],
						loop: true,
						urls: this.localFileList.filter(img => FILE_TYPE.image.exts.includes(img.ext)).map(img => img.url)
					})
					return
				}
				
				if (FILE_TYPE.video.exts.includes(item?.ext)) {
					thispreviewVideo.open(item[props.map.url])
					return
				}
				
				// #ifdef H5
				self.location.href = item[props.map.url]
				// #endif
				// #ifndef H5
				// fileDownload(item[props.map.id]).then(response => {
				// 	uni.openDocument({
				// 		filePath: response.tempFilePath,
				// 		success: () => {}
				// 	});
				// })
				// #endif
			},
			
		}
		
	}
</script>
<style lang="scss" scoped>
	.view-box {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		background: #f4f4f5;
	}

	.file-item {
		position: relative;
		padding: 10rpx;
	}

	.img-item {
		display: block;
	}
</style>