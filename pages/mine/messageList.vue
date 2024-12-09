<template>
	<view class="container" :style="{minHeight:$height()}">
		<view class="items">
			<view class="item king-align__center king-flex__between" v-for="(item,index) in list" :key="index"
				@click="jumpUrl(item)">
				<image v-if="item.category == 'BIZ'" class="icon" src="@/static/img/execpt-icon.png" mode="widthFix"></image>
				<image v-else class="icon" src="@/static/img/work-order-icon.png" mode="widthFix"></image>
				<view class="message-box king-flex king-flex__between">
					<view class="message-content king-flex king-flex__column">
						<view class="title u-line-1">
							{{item.subject}}
						</view>
						<view class="content u-line-1">
							{{item.content}}
						</view>
					</view>
					<view class="other">
						<view class="date">
							{{$u.timeFormat(item.createTime, 'mm月dd日')}}
						</view>
						<view class="dot">
							<u-badge v-if="item.read == false" :isDot="true"></u-badge>
						</view>
					</view>
				</view>

			</view>

			<u-loadmore v-if="list.length !== 0" :status="more" :load-text="loadText" />
			<u-empty v-else :icon="$utils.imagePath('/assets/img/data.png')" mode="data" marginTop="30%"></u-empty>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadText: {
					loadmore: '轻轻上拉，加载更多',
					loading: '努力加载中',
					nomore: '我也是有底线的'
				},
				more: 'loading',
				page: 1,
				list: [],
			}
		},
		onLoad() {
			this.getMessageRes()
		},
		methods: {
			//下拉刷新
			onPullDownRefresh() {
				this.page = 1
				this.getMessageRes()
			},
			//上拉加载
			onReachBottom() {
				if (this.page == 1) {
					return
				}
				if (this.more == 'loadmore') {
					this.getMessageRes()
				}
			},
			jumpUrl(item) {
				item.read = true
				this.$next(`/pages/mine/messageDetail?id=${item.id}`)
			},
			getMessageRes() {
				this.more = 'loading'
				this.$axios.request(this.$api.getMessageRes, "GET", {
					current: this.page,
					size: 20,
					sortField: "id",
					sortOrder: "descend",
					// category: 'BIZ'
				}).then((val) => {
					uni.stopPullDownRefresh();
					this.list = this.page == 1 ? val.data.records : this.list.concat(val.data.records)
					if (this.page / 1 < val.data.total / 20) {
						this.more = 'loadmore';
						this.page++
					} else {
						this.more = 'nomore';
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 3%;
	}

	.icon {
		width: 90rpx;
		border-radius: 50%;
	}

	.item {
		margin: 10rpx 0rpx;
	}

	.item:last-child {
		.message-box {
			border-bottom: none;
		}
	}

	.message-box {
		width: 600rpx;
		margin-left: 20rpx;
		border-bottom: 1px solid #f5f5f5;
		padding: 15rpx 0px;

		.message-content {
			width: 470rpx;

			.title {
				font-size: 30rpx;
				color: #111111;
				font-weight: bold;
				line-height: 40rpx;
			}

			.content {
				font-size: 24rpx;
				color: #7f7f7f;
			}


		}

		.other {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 55rpx;


		}

		.date {
			font-size: 24rpx;
			color: #7f7f7f;
		}

		.dot {
			display: flex;
			justify-content: flex-end;
		}


	}
</style>