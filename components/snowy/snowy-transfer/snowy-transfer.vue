<template>
	<view>
		<tui-time-axis>
			<tui-timeaxis-item backgroundColor="transparent" v-for="(item,index) in commentList" :key="index">
				<template v-slot:node>
					<view class="st-node">
						<icon :type="getType(item.operateType)" size="20" :color="getColor(item.operateType)"/>
					</view>
				</template>
				<template v-slot:content>
					<view>
						<view class="st-title">{{item.taskName}}</view>
						<view class="st-desc">
							{{item.userName}} <text :style="{color: getColor(item.operateType)}">{{item.operateText}}</text>
						</view>
						<view class="st-desc st-gray">
							{{item.comment}}
						</view>
						<view class="st-desc">
							<view class="st-primary" style="margin: 10rpx 0;" v-for="(attachment,attachmentIndex) in item.attachmentList" :key="attachmentIndex" @tap="download(attachment.attachmentUrl)">
								{{attachment.attachmentName}}
							</view>
						</view>
						<view class="st-time st-gray">{{item.approveTime}}</view>
					</view>
				</template>
			</tui-timeaxis-item>
		</tui-time-axis>
	</view>
</template>
<script>
	export default{
		props:{
			commentList: {
				type: Array,
				default: [],
				required: true
			}
		},
		methods:{
			getType(value) {
				if (value === 'START') {
					return 'success'
				} else if (value === 'PASS') {
					return 'success'
				} else if (value === 'REJECT') {
					return 'warn'
				} else if (value === 'BACK') {
					return 'warn'
				} else if (value === 'REVOKE') {
					return 'warn'
				} else if (value === 'JUMP') {
					return 'waiting'
				} else if (value === 'TURN') {
					return 'waiting'
				} else if (value === 'END') {
					return 'success'
				} else {
					return 'success'
				}
			},
			getColor(value) {
				if (value === 'START') {
					return '#1890FF'
				} else if (value === 'PASS') {
					return '#52C41A'
				} else if (value === 'REJECT') {
					return '#FF4D4F'
				} else if (value === 'BACK') {
					return '#BFBFBF'
				} else if (value === 'REVOKE') {
					return '#BFBFBF'
				} else if (value === 'JUMP') {
					return '#BFBFBF'
				} else if (value === 'TURN') {
					return '#BFBFBF'
				} else if (value === 'END') {
					return '#FF4D4F'
				} else {
					return '#1890FF'
				}
			},
			download() {
				// #ifdef H5
				self.location.href = url
				// #endif
				// #ifndef H5
				const id = this.$xeu.parseUrl(url)?.searchQuery?.id
				if (this.$xeu.isEmpty(id)) {
					return
				}
				// fileApi.fileDownload(id).then(response => {
				// 	uni.openDocument({
				// 		filePath: response.tempFilePath,
				// 		success: () => {}
				// 	});
				// })
				// #endif
			}
		}
	}
</script>
<style lang="scss" scoped>
	.st-node {
		height: 40rpx;
		width: 40rpx;
		border-radius: 50%;
		background-color: #ddd;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		flex-shrink: 0;
	}

	.st-title {
		padding-bottom: 12rpx;
		font-size: 32rpx;
		color: #333;
		font-weight: bold;
	}

	.st-desc {
		padding-bottom: 12rpx;
		font-size: 28rpx;
		color: #333;
	}

	.st-time {
		font-size: 24rpx;
		font-weight: bold;
	}

	.st-gray {
		color: #848484 !important;
	}

	.st-light-gray {
		color: #888 !important;
	}

	.st-primary {
		color: #5677fc;
	}
</style>