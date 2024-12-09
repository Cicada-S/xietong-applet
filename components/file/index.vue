<template>
	<view class="box king-flex">
		<view class="item" v-for="(item,index) in urlList.split(',')" :key="index">
			<image v-if="$utils.isImageFile(item)" @click="lookFile(item,true)" :src="`${$utils.imagePath(item)}`">
			</image>
			<image @click="lookFile(item,false)" v-else src="@/static/img/image-icon.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "file",
		data() {
			return {

			};
		},
		props: {
			urlList: {
				type: String,
				default: ""
			}
		},
		methods: {
			lookFile(url, isImage) {
				if (isImage) {
					uni.previewImage({
						current: 1,
						urls: [this.$utils.imagePath(url)]
					})
				} else {

					// 使用uni.downloadFile下载PDF文件
					uni.downloadFile({
						url: this.$utils.imagePath(url),
						success: downloadResult => {
							if (downloadResult.statusCode === 200) {
								// 下载成功，打开PDF文件
								const filePath = downloadResult.tempFilePath;
								uni.openDocument({
									filePath: filePath,
									success: openResult => {
										console.log('PDF文件打开成功');
									},
									fail: openError => {
										console.error('打开PDF文件失败', openError);
									}
								});
							} else {
								console.error('下载PDF文件失败');
							}
						},
						fail: downloadError => {
							console.error('下载PDF文件失败', downloadError);
						}
					});
				}

			}
		}
	}
</script>

<style lang="less">
	.box {
		flex-wrap: wrap;

		.item {
			width: 33%;
		}

		image {
			width: 206rpx;
			height: 206rpx;
		}
	}
</style>