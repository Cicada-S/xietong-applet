<template>
	<view class="container" :style="{minHeight:$height()}">
		<view class="box">
			<view class="item king-flex king-flex__between" @click="$next(`/pages/report/workTaskReport`)">
				<view class="describe">
					<view class="title">
						工单报工
					</view>
					<view class="son-title">
						工单 ➜ 工序 ➜ 良品数 ➜ 报工
					</view>
				</view>
				<view>
					<u-button type="primary" text="点击报工"></u-button>
				</view>
			</view>

			<view class="item king-flex king-flex__between" @click="$next(`/pages/report/proReport`)">
				<view class="describe">
					<view class="title">
						产品报工
					</view>
					<view class="son-title">
						产品 ➜ 工序 ➜ 良品数 ➜ 报工
					</view>
				</view>
				<view>
					<u-button type="primary" text="点击报工"></u-button>
				</view>
			</view>
			<view class="item king-flex king-flex__between" @click="$next(`/pages/report/unicodeReport`)">
				<view class="describe">
					<view class="title">
						统一码报工
					</view>
					<view class="son-title">
						计划单号 ➜ 良品数 ➜ 报工
					</view>
				</view>
				<view>
					<u-button type="primary" text="点击报工"></u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.container {
		background-color: #f5f7fb;
	}

	.box {
		width: 94%;
		margin: 0px auto;

		.item {
			padding: 40rpx;
			background-color: #FFFFFF;
			border-radius: 10rpx;
			margin-top: 20rpx;

			.title {
				font-size: 36rpx;
				line-height: 55rpx;
				color: #09061b;
				font-weight: bold;
			}

			.son-title {
				font-size: 28rpx;
				line-height: 45rpx;
			}
		}
	}
</style>