<template>
	<view class="container" :style="{minHeight:$height()}">
		<image class="mine-bg" src="@/static/img/mine-bg.png" mode="widthFix"></image>
		<view class="mine-box">
			<view class="message" @click="$next(`/pages/mine/messageList`)">
				<u-badge max="99" :value="unReadCount"></u-badge>
				<image class="message-icon" src="@/static/img/message.png" mode="widthFix"></image>
			</view>
			<view class="king-flex__center king-flex__column userinfo">
				<image class="avatar" src="@/static/logo.png"></image>
				<text class="nickname">
					{{userinfo.account}}
				</text>
				<text class="post">
					{{userinfo.positionName}}
				</text>
			</view>
		</view>

		<view class="func" style="position: relative;">
			<view class="items" style="justify-content: space-around;">

			</view>

		</view>
		<view class="func"
			v-if="$utils.hasMenu(['/flw/newTask','/flw/myApply','/flw/todoTask','/flw/doneTask','/flw/copyTask','/flw/processMonitor'])">
			<view class="title">在线办公</view>
			<view class="items">
				<view v-if="$utils.hasMenu('/flw/newTask')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/OA/index?type=1&actType=0`)">
					<image src="@/static/OA/4.png"></image>
					<text>发起流程</text>
				</view>
				<view v-if="$utils.hasMenu('/flw/myApply')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/OA/myApply/index?type=1&actType=1`)">
					<image src="@/static/OA/2.png"></image>
					<text>已发申请</text>
				</view>
				<view v-if="$utils.hasMenu('/flw/todoTask')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/OA/todoTask/index?type=1&actType=2`)">
					<image src="@/static/OA/3.png"></image>
					<text>待办事宜</text>
				</view>
				<view v-if="$utils.hasMenu('/flw/doneTask')"
					class="item king-align__center king-flex__column"
					@click="$next(`/pages/OA/doneTask/index?type=1&actType=3`)">
					<image src="@/static/OA/5.png"></image>
					<text>已办事宜</text>
				</view>
				<view v-if="$utils.hasMenu('/flw/copyTask')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/OA/copyTask/index?type=1&actType=4`)">
					<image src="@/static/OA/6.png"></image>
					<text>抄送事宜</text>
				</view>
				<view v-if="$utils.hasMenu('/flw/processMonitor')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/OA/processMonitore/index?type=1&actType=5`)">
					<image src="@/static/OA/7.png"></image>
					<text>流程监控</text>
				</view>
				

			</view>

		</view>

		<u-modal :show="show" :showCancelButton="true" @cancel="cancel" @confirm="confirm" @close="close"
			cancelText="再等等" confirmText="立即处理" :closeOnClickOverlay="true" :content="content" title="紧急提醒"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo: {},
				unReadCount: 0,
				show: false,
				content: ""
			}
		},
		onLoad() {

		},
		onShow() {
			this.getLoginUser()

			this.$axios.request(this.$api.getUnReadList, "GET").then((val) => {
				this.unReadCount = val.data.length
				if (val.data.length > 0) {
					if (new Date().getTime() >= uni.getStorageSync("messageModal") || !uni.getStorageSync("messageModal")) {
						this.content = `您有${val.data.length}条异常消息通知，请您及时处理`
						this.show = true
						//十分钟弹窗一次
						uni.setStorageSync("messageModal", new Date().getTime() + 600 * 1000)
					}

				}
			})




		},
		methods: {
			getLoginUser() {
				this.$axios.request(this.$api.getLoginUser, "GET").then((val) => {
					this.userinfo = val.data
					uni.setStorageSync("buttonCodeList", val.data.buttonCodeList)
					uni.setStorageSync("role",val.data.roleCodeList)
				})
			},
			logout() {
				uni.removeStorageSync("token")
				uni.removeStorageSync("domain")
				uni.reLaunch({
					url: `/pages/mine/login`
				})
			},
			callPhone() {
				uni.makePhoneCall({
					phoneNumber: "18556901315"
				})
			},
			cancel() {
				this.close()
			},
			confirm() {
				this.close()
				this.$next(`/pages/mine/execptRecordsList`)
			},
			close() {
				this.show = false
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #f5f7fb;
	}

	.mine-bg {
		width: 100%;
		position: absolute;
		top: 0;
	}

	.message {
		position: relative;
		width: 60rpx;
		right: -630rpx;

		.message-icon {
			width: 50rpx;
		}

		.u-badge {
			position: absolute;
			top: -3px;
			right: -13px;
		}
	}

	.func {
		width: 96%;
		margin: 0px auto;
		padding: 2%;

		.title {
			font-size: 31rpx;
			font-weight: bold;
			color: #101010;
			margin: 20rpx auto;
		}

		.items {
			padding-top: 30rpx;
			background-color: #FFFFFF;
			border-radius: 8px;
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;

			.item {
				width: 25%;
				margin-bottom: 30rpx;

				image {
					width: 107rpx;
					height: 107rpx;
				}

				text {
					font-size: 26rpx;
					color: #636363;
					margin-top: 18rpx;
				}
			}

		}

	}

	.mine-box {
		padding: 20rpx;
		align-items: center;
		position: relative;

		.avatar {
			width: 120rpx;
			height: 120rpx;
			border: 2px solid #FFFFFF;
			border-radius: 50%;
		}



		.nickname {
			font-size: 36rpx;
			font-weight: 500;
			line-height: 35rpx;
			margin: 10rpx auto;
			color: #FFFFFF;
		}

		.post {
			font-size: 26rpx;
			font-weight: 400;
			// line-height: 42rpx;
			margin-top: 6rpx;
			color: #FFFFFF;
		}

	}

	.u-modal__content {
		padding: 12px 25px 15px 25px !important;
	}
</style>