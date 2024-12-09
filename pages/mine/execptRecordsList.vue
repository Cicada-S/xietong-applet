<template>
	<view class="container" :style="{minHeight:$height()}">
		<view class="box">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="order-no king-align__center king-flex__between">
					<view class="left king-align__center">
						<view class="line"></view>
						<text>异常名称：{{item.execptName}}</text>
					</view>
					<view class="right king-align__center">
						<u-button type="primary" size="mini" @click="$next(`/pages/mine/messageDetail?id=${item.messageId}`)"
							text="详情"></u-button>
					</view>
				</view>
				<u-line margin="20rpx 0px"></u-line>
				<view class="info">
					<view class="king-flex king-flex__column">
						<view class="king-align__center info-item">
							<text>岗位：</text>
							<text>{{item.workStepName}}</text>
						</view>

						<view class="king-align__center info-item">
							<text>开始时间：</text>
							<text>{{item.startTime||''}}</text>
						</view>
						<view class="king-align__center info-item">
							<text>结束时间：</text>
							<text>{{item.endTime||''}}</text>
						</view>
						<view class="king-align__center info-item">
							<text>持续时长：</text>
							<text>{{getDiffTime(item)}}分钟</text>
						</view>
						<view class="king-align__center info-item">
							<text>处理状态：</text>
							<u-tag type="success" size="mini" v-if="item.endTime" text="已处理"></u-tag>
							<u-tag type="error" size="mini" v-else text="未处理"></u-tag>
						</view>
						
					</view>
				</view>
				<u-line margin="20rpx 0px"></u-line>
				<view class="footer king-align king-flex__between">
					<view class="report u-line-1">
				     发送人：{{item.createUserName||''}}
					</view>
					<view class="report u-line-1">
					 {{item.createTime}}
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
				more:'loading',
				page: 1,
				list: [],

			}
		},
		onLoad() {
			this.getExecptRecordsRes()
		},
		onShow() {
			
		},
		methods: {
			//下拉刷新
			onPullDownRefresh() {
				this.page = 1
				this.getExecptRecordsRes()
			},
			//上拉加载
			onReachBottom() {
				if (this.page == 1) {
					return
				}
				if (this.more == 'loadmore') {
					this.getExecptRecordsRes()
				}
			},
			getDiffTime(record){
				let endTime 
				if(record.endTime){
					endTime = record.endTime
				}else{
					endTime = new Date().getTime()
				}
				return parseInt((new Date(endTime).getTime() - new Date(record.startTime))/60/1000)
			},
			getExecptRecordsRes() {
				this.more = 'loading'
				this.$axios.request(this.$api.getExecptRecordsRes, "GET", {
					current: this.page,
					size: 10,
					sortField: "id",
					sortOrder: "descend",
				}).then((val) => {
					uni.stopPullDownRefresh();
					this.list = this.page == 1 ? val.data.records : this.list.concat(val.data.records)
					if (this.page / 1 < val.data.total / 10) {
						this.more = 'loadmore';
						this.page++
					} else {
						this.more = 'nomore';
					}

				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		width: 96%;
		margin: 10px auto;

		.search {
			background-color: #FFFFFF;

			.search-box {
				flex-wrap: wrap;

				.search-item {
					width: 48%;
					margin-bottom: 20rpx;
				}
			}
		}

		.item {
			background-color: #ffffff;
			margin-bottom: 20rpx;
			box-shadow: 0px 2px 6px 2px #eaeaea;
			border-radius: 10rpx;
			border-radius: 10rpx;
			box-sizing: border-box;
			padding: 20rpx;
			font-size: 14px;

			.left {
				.line {
					width: 9rpx;
					height: 30rpx;
					background-color: #0081ff;
				}

				text {
					margin: 0 5px;
					font-size: 18px;
					font-weight: bold;
				}
			}

			.right {
				text {
					color: #0081ff;
					font-size: 28rpx;
				}

				.progress {
					width: 156rpx;
				}
			}

			.info {
				font-size: 14px;
			}

			.info-item {
				margin-bottom: 5px;
				justify-content: space-between;
			}

			.info-item:last-child {
				margin-bottom: 0px;
			}

			.footer {
				.report {
					color: #0081ff;
					font-size: 28rpx;
				}
			}
		}
	}
</style>