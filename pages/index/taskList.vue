<template>
	<view class="container" :style="{minHeight:$height()}">
		<view class="search-box">
			<view class="search-item king-flex">
				<u-button v-if="$utils.hasPerm('workTaskEdit')" type="error" size="small" @click="edit" text="编辑"></u-button>
				<u-button v-if="$utils.hasPerm('workTaskBatchDelete')" type="primary" size="small" @click="del" text="删除"></u-button>
				<u-button v-if="$utils.hasPerm('approvalOtherOk')" type="error" size="small" @click="batchStart" text="开始"></u-button>
				<u-button v-if="$utils.hasPerm('approvalOtherErr')" type="primary" size="small" @click="approvalErr" text="结束"></u-button>
			</view>
			<u-search placeholder="请输入任务编码" :clearabled="true" :showAction="false" @search="search" @clear="clear" v-model="formData.code" :customStyle="{margin:'10rpx 10rpx'}"></u-search>
		</view>
		<view class="box">
			<u-radio-group v-if="type == 'radio'" placement="column" @change="checkRadio">
				<view class="item" v-for="(item,index) in list" :key="index">
					<view class="order-no king-align__center king-flex__between">
						<view class="left king-align__center">
							<view class="line"></view>
							<text>{{item.workOrderNo}}</text>
						</view>
						<view class="right king-align__center">
							<text>进度：</text>
							<view class="progress">
								<u-line-progress :percentage="getProcress(item)" height="8" :showText="false" activeColor="#0081ff"></u-line-progress>
							</view>
						</view>
					</view>
					<u-line margin="20rpx 0px"></u-line>
					<view class="info">
						<view class="king-flex king-flex__column">
							<view class="king-align__center info-item">
								<text>任务编码：</text>
								<text>{{item.code}}</text>
							</view>
							<view class="king-align__center info-item">
								<text>工序名称：</text>
								<text>{{item.workStepName}}</text>
							</view>
							<view class="king-align__center info-item">
								<text>产品名称：</text>
								<text>{{item.proName}}</text>
							</view>
							<view class="king-align__center info-item">
								<text>产品编码：</text>
								<text>{{item.proCode}}</text>
							</view>
							<view class="king-align__center info-item">
								<text>计划开始时间：</text>
								<text>{{item.plaStartTime}}</text>
							</view>
							<view class="king-align__center info-item">
								<text>计划结束时间：</text>
								<text>{{item.plaEndTime}}</text>
							</view>
							<view class="king-align__center info-item">
								<text>计划数：</text>
								<text>{{item.plaNum}}</text>
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
								<text>任务状态：</text>
								<u-tag size="mini" v-if="item.status == 0" text="未开始"></u-tag>
								<u-tag type="success" size="mini" v-else-if="item.status == 1" text="执行中"></u-tag>
								<u-tag type="error" size="mini" v-else-if="item.status == 2" text="已结束"></u-tag>
								<u-tag type="warning" size="mini" v-else text="已取消"></u-tag>
							</view>
						</view>
					</view>
					<u-line margin="20rpx 0px"></u-line>
					<view class="footer king-align__center">
						<view class="report u-line-1">
							报工人员：{{item.reportRightName||''}}
						</view>
						<!-- <u-button :customStyle="{width:'20%'}" type="primary" size="small" @click="submit(item)"
							text="选择"></u-button> -->
						<view class="right king-align__center">
							<u-radio :name="item.id"></u-radio>
						</view>
					</view>
				</view>
			</u-radio-group>
			
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
				workOrderName: '',
				workStepName: '',
				proName: '',
				formData: {
					workOrderId: '',
					workStepId: '',
					proId: '',
				},
				selectRows: [],
				page: 1,
				list: [],
				workOrderList: [],
				proList: [],
				workStepList: []
			}
		},
		props: {
			type: {
				type: String,
				default: "checkbox"
			}
		},
		created() {
			this.getTaskList()
		},
		onShow() {
			
		},
		onLoad() {
			
			this.$axios.request(this.$api.getWorkStepList, "GET").then((val) => {
				this.workStepList = val.data
			})
			this.$axios.request(this.$api.getWorkOrderList, "GET").then((val) => {
				this.workOrderList = val.data
			})
			this.$axios.request(this.$api.getProList, "GET").then((val) => {
				this.proList = val.data
			})

		},
		methods: {
			submit(e) {
				uni.$emit('choose', e)
				this.$nextTick(() => {
					uni.navigateBack()
				})
			},
			refresh(){
				this.page = 1
				this.getTaskList()
			},
			loadMore() {
				if (this.page == 1) {
					return
				}
				if (this.more == 'loadmore') {
					this.getTaskList()
				}
			},
			search() {
				this.page = 1
				this.getTaskList()
			},
			clear() {
				this.formData.code = ""
				this.search()
			},
			changeWorkOrder(e) {
				let cur = this.workOrderList[e.detail.value]
				this.formData.workOrderId = cur.id
				this.workOrderName = cur.workOrderNo
			},
			changeWorkStep(e) {
				let cur = this.workStepList[e.detail.value]
				this.formData.workStepId = cur.id
				this.workStepName = cur.name
			},
			changePro(e) {
				let cur = this.proList[e.detail.value]
				this.formData.proId = cur.id
				this.proName = cur.name
			},
			query() {
				this.page = 1
				this.getTaskList()
			},
			reset() {
				this.formData = {}
				this.workOrderName = ""
				this.workStepName = ""
				this.proName = ""
			},
			checkRadio(e) {
				let idx = this.$utils.findArrIndex(this.list, e)
				this.selectRows = [this.list[idx]]
				this.$emit("change")
			},
			changeCheckBox(e) {
				let arr = new Array()
				e.forEach((item, index) => {
					let idx = this.$utils.findArrIndex(this.list, item)
					arr.push(this.list[idx])
				})
				this.selectRows = arr
				this.$emit("change")
			},
			edit(){
				if(this.selectRows.length !==1){
					this.$msg.toast("请选择一条数据")
					return
				}
				this.$next(`/pages/mes/unit/add?result=${this.$utils.encryption(this.selectRows[0])}`)
				
			},
			del(){
				if(this.selectRows.length ==0){
					this.$msg.toast("请选择数据")
					return
				}
				this.$axios.request(this.$api.delUnit,"POST",this.selectRows).then((val) => {
					this.$msg.toastCallback("操作成功",()=> {
						this.page = 1
						this.getTaskList()
					})
				})
				
			},
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
			getProcress(e) {
				return e.goodNum / e.plaNum * 100
			},
			getTaskList() {
				this.more = 'loading'
				let params = Object.assign({
					current: this.page,
					size: 10,
					sortField:"id",
					sortOrder:"descend"
				}, this.formData)
				this.$axios.request(this.$api.getTaskPage, "GET", params).then((val) => {
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
	.search {
		background-color: #FFFFFF;
	
		.search-box {
			flex-wrap: wrap;
	
			.search-item {
				width: 40%;
				margin-bottom: 20rpx;
			}
		}
	}
	.box {
		width: 96%;
		margin: 10px auto;
		margin-top:10%;
		

		.item {
			background-color: #ffffff;
			margin: 20rpx auto;
			box-shadow: 0px 2px 6px 2px #eaeaea;
			border-radius: 10rpx;
			border-radius: 10rpx;
			box-sizing: border-box;
			padding: 20rpx;
			font-size: 14px;
			width:100%;

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
			
			.info-item{
				margin-bottom:5px;
			}
			.info-item:last-child{
				margin-bottom:0px;
			}

			.footer {
				justify-content: space-between;
				.report {
					color: #0081ff;
					font-size: 28rpx;
					width: 80%;
				}

			}
		}
	}
	
</style>