<template>
	<view class="container" :style="{minHeight:$height()}">
		<view class="box">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="order-no king-align__center king-flex__between">
					<view class="left king-align__center">
						<view class="line"></view>
						<text>工单号：{{item.workOrderNo}}</text>
					</view>
					<view class="right king-align__center">
					</view>
				</view>
				<u-line margin="20rpx 0px"></u-line>
				<view class="info">
					<view class="king-flex king-flex__column">
						<view class="king-align__center info-item">
							<text>产品：</text>
							<text>{{item.proName}}</text>
						</view>
						<view class="king-align__center info-item">
							<text>工序名称：</text>
							<text>{{item.workStepName}}</text>
						</view>
						<view class="king-align__center info-item" v-for="(item1,index1) in dynamicList" :key="index1">
							<text>{{item1.label}}：</text>
							<text v-if="Array.isArray(JSON.parse(item.extJson)[item1.name])">{{JSON.parse(item.extJson)[item1.name].join(',') || ""}}</text>
							<text v-else>{{JSON.parse(item.extJson)[item1.name] || ""}}</text>
						</view>
						
						
						<view class="king-align__center info-item">
							<text>报工数：</text>
							<text>{{item.reportNum}}</text>
						</view>
						<view class="king-align__center info-item">
							<text>良品数：</text>
							<text>{{item.goodNum}}</text>
						</view>
						<view class="king-align__center info-item">
							<text>不良数：</text>
							<text>{{item.badNum}}</text>
						</view>

						<view class="king-align__center info-item">
							<text>报工时间：</text>
							<text style="font-size: 24rpx;">{{item.startTime||''}}至{{item.endTime||''}}</text>
						</view>
						<view class="king-align__center info-item">
							<text>工作时长：</text>
							<text>{{item.workTime}}分钟</text>
						</view>
						<view class="king-align__center info-item">
							<text>操作人：</text>
							<text>{{item.createUserName}}</text>

						</view>
						<view class="king-align__center info-item">
							<text>工序状态：</text>
							<u-tag size="mini" v-if="item.taskStatus == 0" text="未开始"></u-tag>
							<u-tag type="success" size="mini" v-else-if="item.taskStatus == 1" text="执行中"></u-tag>
							<u-tag type="error" size="mini" v-else-if="item.taskStatus == 2" text="已结束"></u-tag>
							<u-tag type="warning" size="mini" v-else text="已取消"></u-tag>
						</view>
						
						<view class="king-align__center info-item">
							<text>是否入库：</text>
							<u-tag size="mini" v-if="item.inWareHouse == 0" text="未入库"></u-tag>
							<u-tag type="success" size="mini" v-else-if="item.inWareHouse == 1" text="已入库"></u-tag>
						</view>
						<view class="king-align__center info-item">
							<text>审批状态：</text>
							<u-tag size="mini" v-if="item.approval == 0" text="未审批"></u-tag>
							<u-tag type="success" size="mini" v-else-if="item.approval == 1" text="已审批"></u-tag>
						</view>
						<view class="king-align__center info-item">
							<text>操作时间：</text>
							<text>{{item.createTime}}</text>

						</view>

					</view>
				</view>
				<u-line margin="20rpx 0px"></u-line>
				<view class="footer king-align__center">
					<view class="report u-line-1">
						报工人员：{{item.productionUserText||''}}
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
				dynamicList:[],
				formData: {
					workOrderId: '',
					workStepId: '',
					proId: '',
				},
				page: 1,
				list: [],

			}
		},
		onLoad() {
			this.getTaskList()
			this.$axios.request(this.$api.getWorkReportDynamic,"GET").then((val) => {
				this.dynamicList = val.data
			})

		},
		
		methods: {
			//下拉刷新
			onPullDownRefresh() {
				this.page = 1
				this.getTaskList()
			},
			//上拉加载
			onReachBottom() {
				if (this.page == 1) {
					return
				}
				if (this.more == 'loadmore') {
					this.getTaskList()
				}
			},
			getTaskList() {
				this.more = 'loading'
				let roleList = uni.getStorageSync("role") || []
				let params = Object.assign({
					current: this.page,
					size: 10,
					sortField: "id",
					sortOrder: "descend",
					my:(roleList.includes('bizAdmin') || roleList.includes('superAdmin')) ? 0 : 1,
					type: 0
				}, this.formData)
				this.$axios.request(this.$api.getWorkReportPage, "GET", params).then((val) => {
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
					width: 80%;
				}
			}
		}
	}
</style>