<template>
	<view class="container" :style="{minHeight:$height()}">
		<view class="search-box">
			<view class="search-item king-flex">
				<u-button v-if="$utils.hasPerm('cusSortAdd')" type="primary" size="small" @click="$next(`/pages/crm/cus/cusSort/add`)" text="新增"></u-button>
				<u-button v-if="$utils.hasPerm('cusSortEdit')" type="error" size="small" @click="edit" text="编辑"></u-button>
				<u-button v-if="$utils.hasPerm('cusSortBatchDelete')" type="primary" size="small" @click="del" text="删除"></u-button>
			</view>
			
			<u-search placeholder="请输入名称" :clearabled="true" :showAction="false" @search="search" @clear="clear" v-model="formData.name" :customStyle="{margin:'10rpx 10rpx'}"></u-search>
				
		</view>
		<view class="box">

			<u-radio-group v-if="type == 'radio'" placement="column" @change="checkRadio">
				<view class="item" v-for="(item,index) in list" :key="index">
					<view class="order-no king-align__center king-flex__between">
						<view class="left king-align__center">
							<view class="line"></view>
							<text>客户类型：{{item.sortName}}</text>
							</view>
							<view class="right king-align__center">
								<u-checkbox :name="item.id"></u-checkbox>
							</view>
					</view>
					<u-line margin="20rpx 0px"></u-line>
					<view class="info">
						<view class="king-flex king-flex__column">
							<view class="king-align__center info-item">
								<text>备注：</text>
								<text>{{item.remark}}</text>
							</view>

						</view>
					</view>
					<u-line margin="20rpx 0px"></u-line>
					<view class="footer king-align__center king-flex__between">
						<view class="createTime u-line-1">
							{{item.createTime}}
						</view>
						<!-- <u-radio :name="item.id"></u-radio> -->
					</view>
				</view>

			</u-radio-group>

			<u-checkbox-group v-else placement="column" @change="changeCheckBox">
				<view class="item" v-for="(item,index) in list" :key="index">
					<view class="order-no king-align__center king-flex__between">
						<view class="left king-align__center">
							<view class="line"></view>
							<text>客户类型：{{item.sortName}}</text>
						</view>
						<view class="right king-align__center">
							<u-checkbox :name="item.id"></u-checkbox>
						</view>
					</view>
					<u-line margin="20rpx 0px"></u-line>
					<view class="info">
						<view class="king-flex king-flex__column">
							<view class="king-align__center info-item">
								<text>备注：</text>
								<text>{{item.remark}}</text>
							</view>

						</view>
					</view>
					<u-line margin="20rpx 0px"></u-line>
					<view class="footer king-align__center king-flex__between">
						<view class="createTime u-line-1">
							{{item.createTime}}
						</view>
						<!-- <u-radio :name="item.id"></u-radio> -->
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
		name:"cusSortName",
		data() {
			return {
				loadText: {
					loadmore: '轻轻上拉，加载更多',
					loading: '努力加载中',
					nomore: '我也是有底线的'
				},
				formData:{},
				page: 1,
				list: [],
				selectRows: []
			}
		},
		created() {
			this.getcusSortRes()
		},
		props: {
			type: {
				type: String,
				default: "checkbox"
			}
		},
		onLoad() {

		},
		onShow() {
			uni.$on('refresh', (val) => {
				this.refresh()
			})
		},
		methods: {
			//下拉刷新
			onPullDownRefresh() {
				this.page = 1
				this.getcusSortRes()
			},
			//上拉加载
			onReachBottom() {
				if (this.page == 1) {
					return
				}
				if (this.more == 'loadmore') {
					this.getcusSortRes()
				}
			},
			refresh(){
				this.page = 1
				this.getcusSortRes()
			},
			loadMore() {
				console.log(11)
				if (this.page == 1) {
					return
				}
				if (this.more == 'loadmore') {
					this.getcusSortRes()
				}
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
				this.$next(`/pages/test/cusSort/add?result=${this.$utils.encryption(this.selectRows[0])}`)
				
			},
			del(){
				if(this.selectRows.length ==0){
					this.$msg.toast("请选择数据")
					return
				}
				this.$axios.request(this.$api.delcusSort,"POST",this.selectRows).then((val) => {
					this.$msg.toastCallback("操作成功",()=> {
						this.page = 1
						this.getcusSortRes()
					})
				})
				
			},
			search() {
				this.page = 1
				this.getcusSortRes()
			},
			clear() {
				this.formData.name = ""
				this.search()
			},
			getcusSortRes() {
				this.more = 'loading'
				let params = Object.assign({
					current: this.page,
					size: 20,
					sortField: "id",
					sortOrder: "descend"
				}, this.formData)
				this.$axios.request(this.$api.getcusSortRes, "GET", params).then((val) => {
					uni.stopPullDownRefresh();
					this.list = this.page == 1 ? val.data.records : this.list.concat(val.data.records)
					if (this.page / 1 < val.data.total / 20) {
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
		margin-top:20%;
		.item {
			background-color: #ffffff;
			margin: 20rpx auto;
			width: 100%;
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
				.createTime {
					font-size: 28rpx;
					width: 80%;
				}

			}
		}
	}
</style>