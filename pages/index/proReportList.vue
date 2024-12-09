<template>
	<view class="container" :style="{minHeight:$height()}">
		<view class="search-box">
			<view class="search-item king-flex">
				<u-button v-if="$utils.hasPerm('proReportEdit')" type="error" size="small" @click="edit" text="编辑"></u-button>
				<!-- <u-button v-if="$utils.hasPerm('proReportDelete')" type="primary" size="small" @click="del" text="删除"></u-button> -->
				<u-button type="primary" size="small" @click="doApproval(1)" text="审批"></u-button>
				<u-button type="error" size="small" @click="doApproval(0)" text="驳回"></u-button>
			</view>
			
		</view>
		<view class="box">
			<u-checkbox-group @change="changeCheckBox" placement="column">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="order-no king-align__center king-flex__between">
					<view class="left king-align__center">
						<view class="line"></view>
						<text>{{item.proName}}</text>
					</view>
					<view class="right king-align__center">
						<!-- <u-button type="primary" size="mini" @click="$next(`/pages/report/proReport?id=${item.id}`)" text="编辑"></u-button> -->
						<u-checkbox :name="item.id" :checked="selectRowKeys.includes(item.id)" />
					</view>
				</view>
				<u-line margin="20rpx 0px"></u-line>
				<view class="info">
					<view class="king-flex king-flex__column">
						<view class="king-align__center info-item">
							<text>项目号：</text>
							<text>{{item.proPlanCode}}</text>
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
			</u-checkbox-group>
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
				selectRowKeys: [],
				formData: {
					workOrderId: '',
					workStepId: '',
					proId: '',
					type:3
				},
				page: 1,
				list: [],
				dynamicList: [],

			}
		},
		onLoad() {
			this.getProReportList()
			this.$axios.request(this.$api.getWorkReportDynamic,"GET").then((val) => {
				this.dynamicList = val.data
			})
		},
		mounted() {
			uni.$on('reload', (val) => {
				this.page = 1
				this.getProReportList()
			})
		},
		methods: {
			//下拉刷新
			onPullDownRefresh() {
				this.page = 1
				this.getProReportList()
			},
			//上拉加载
			onReachBottom() {
				if (this.page == 1) {
					return
				}
				if (this.more == 'loadmore') {
					this.getProReportList()
				}
			},
			doApproval(approval){
				if(this.selectRowKeys.length ==0){
					this.$msg.toast("请选择数据")
					return
				}
				this.$axios.request(this.$api.batchApproval,"POST",{
					idList:this.selectRowKeys.join(','),
					approval: approval
				}).then((val) => {
					this.page = 1
					this.getProReportList()
				})
			},
			edit(){
				if(this.selectRowKeys.length !==1){
					this.$msg.toast("请选择一条数据")
					return
				}
				this.$next(`/pages/report/proReport?id=${this.selectRowKeys[0]}`)
			},
			
			changeCheckBox(e) {
				this.selectRowKeys = e
			},
			getProReportList() {
				this.more = 'loading'
				let roleList = uni.getStorageSync("role") || []
				let params = Object.assign({
					current: this.page,
					size: 10,
					sortField: "id",
					my: (roleList.includes('bizAdmin') || roleList.includes('superAdmin')) ? 0 : 1,
					sortOrder: "descend",
					type: 0
				}, this.formData)
				this.$axios.request(this.$api.getProReportPage, "GET", params).then((val) => {
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
		margin-top: 12%;
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