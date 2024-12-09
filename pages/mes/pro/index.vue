<template>
	<view class="container" :style="{minHeight:$height()}">
		<view class="search-box">
			<view class="search-item king-flex">
				<u-button v-if="$utils.hasPerm('proAdd')" type="primary" size="small" @click="$next(`/pages/mes/pro/add`)" text="新增"></u-button>
				<u-button v-if="$utils.hasPerm('proEdit')" type="error" size="small" @click="edit" text="编辑"></u-button>
				<u-button v-if="$utils.hasPerm('proBatchDelete')" type="primary" size="small" @click="del" text="删除"></u-button>
			</view>
			
			<u-search placeholder="请输入产品名称" :clearabled="true" :showAction="false" @search="search" @clear="clear" v-model="formData.name" :customStyle="{margin:'10rpx 10rpx'}"></u-search>
				
		</view>
		<view class="box">
			
			<u-radio-group v-if="type == 'radio'" placement="column" @change="checkRadio">
				<view class="item" v-for="(item,index) in list" :key="index">
					<view class="order-no king-align__center king-flex__between">
						<view class="left king-align__center">
							<view class="line"></view>
							<text>产品名称：{{item.name || ''}}</text>
						</view>
						<view class="right king-align__center">
							<u-radio :name="item.id"></u-radio>
						</view>
					</view>
					<u-line margin="20rpx 0px"></u-line>
					<view class="info">
						<view class="king-flex king-flex__column">

							<view class="king-align__center info-item">
								<text>产品编码：</text>
								<text>{{item.code || ''}}</text>
							</view>
							<view class="king-align__center info-item">
								<text>产品类型：</text>
								<text>{{item.proTypeName || ''}}</text>
							</view>
                            <view class="king-align__center info-item">
								<text>产品角色：</text>
								<text>{{item.proRoleTypeName || ''}}</text>
							</view>
							<view class="king-align__center info-item">
								<text>合作伙伴：</text>
								<text>{{item.partnersSortName || ''}}</text>
							</view>
							<view class="king-align__center info-item">
								<text>工艺路线：</text>
								<text>{{item.workRouteName || ''}}</text>
							</view>
							<view class="king-align__center info-item">
								<text>计量单位：</text>
								<text>{{item.unit || ''}}</text>
							</view>

						</view>
					</view>
					<u-line margin="20rpx 0px"></u-line>
					<view class="footer king-align__center king-flex__between">
						<view class="createTime u-line-1">
							{{item.createTime || ''}}
						</view>
						
					</view>
				</view>
			</u-radio-group >
				
			<u-checkbox-group v-else placement="column" @change="changeCheckBox">
				<view class="item" v-for="(item,index) in list" :key="index">
					<view class="order-no king-align__center king-flex__between">
						<view class="left king-align__center">
							<view class="line"></view>
							<text>产品名称：{{item.name}}</text>
						</view>
						<view class="right king-align__center">
							<u-checkbox :name="item.id"></u-checkbox>
						</view>
					</view>
					<u-line margin="20rpx 0px"></u-line>
					<view class="info">
						<view class="king-flex king-flex__column">
			
							<view class="king-align__center info-item">
								<text>产品编码：</text>
								<text>{{item.code || ''}}</text>
							</view>
							<view class="king-align__center info-item">
								<text>产品类型：</text>
								<text>{{item.proTypeName || ''}}</text>
							</view>
                            <view class="king-align__center info-item">
								<text>产品角色：</text>
								<text>{{item.proRoleTypeName || ''}}</text>
							</view>
							<view class="king-align__center info-item">
								<text>合作伙伴：</text>
								<text>{{item.partnersSortName || ''}}</text>
							</view>
							<view class="king-align__center info-item">
								<text>工艺路线：</text>
								<text>{{item.workRouteName || ''}}</text>
							</view>
							<view class="king-align__center info-item">
								<text>库存单位：</text>
								<text>{{item.unit || ''}}</text>
							</view>
			
						</view>
					</view>
					<u-line margin="20rpx 0px"></u-line>
					<view class="footer king-align__center king-flex__between">
						<view class="createTime u-line-1">
							{{item.createTime}}
						</view>
						
					</view>
				</view>
			</u-checkbox-group >
			

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
				proTypeName: '',
				workRouteName:'',
				partnersName: '',
				proTypeList: [],
				formData: {
				proTypeId: '',
				},
				proTypeList:[],
				selectRows:[],
				page: 1,
				list: [],
				selectedOption: '',
			    selectRows: []
			}
		},
		props: {
			type: {
				type: String,
				default: "checkbox"
			}
		},
		created() {
			this.getProList()
			this.$axios.request(this.$api.getProTypeTree, "GET").then((val) => {
				this.proTypeList = val.data
			})
			this.$axios.request(this.$api.getPartnersSortTree, "GET").then((val) => {
				this.partnersSortTree = val.data
			})
		},
		onShow() {
			uni.$on('refresh', (val) => {
				this.refresh()
			})
		},
		methods: {
			checkRadio(e) {
				let idx = this.$utils.findArrIndex(this.list,e)
				this.selectRows = [this.list[idx]]
				this.$emit("change")
			},
			changeCheckBox(e){
				let arr = new Array()
				e.forEach((item,index) => {
					let idx = this.$utils.findArrIndex(this.list,item)
					arr.push(this.list[idx])
				})
				this.selectRows = arr
				this.$emit("change")
			},
			changeProType(e) {
				let cur = this.proTypeList[e.detail.value]
				this.formData.proTypeId = cur.id
				this.proTypeName = cur.name
			},
			changepartners(e) {
				let cur = this.partners[e.detail.value]
				this.formData.partnersId = cur.id
				this.partnersName = cur.name
			},
			
			edit(){
				if(this.selectRows.length !==1){
					this.$msg.toast("请选择一条数据")
					return
				}
				this.$next(`/pages/mes/pro/add?result=${this.$utils.encryption(this.selectRows[0])}`)
				
			},
			del(){
				if(this.selectRows.length ==0){
					this.$msg.toast("请选择数据")
					return
				}
				this.$axios.request(this.$api.delWorkStep,"POST",this.selectRows).then((val) => {
					this.$msg.toastCallback("操作成功",()=> {
						this.page = 1
						this.getProList()
					})
				})
				
			},

			query() {
				this.page = 1
				this.getProList()
			},
			reset() {
				this.formData = {}
				this.proTypeName = ""
				this.partnersName = ""
				this.page = 1
				this.getProList()
			},
			//下拉刷新
			onPullDownRefresh() {
				this.page = 1
				this.getProList()
			},
			//上拉加载
			onReachBottom() {
				if (this.page == 1) {
					return
				}
				if (this.more == 'loadmore') {
					this.getProList()
				}
			},
			refresh(options){
				this.page = 1
				if(options){
					this.formData = {...this.formData,...options}
				}
				this.getProList()
			},
			
			loadMore() {
				if (this.page == 1) {
					return
				}
				if (this.more == 'loadmore') {
					this.getProList()
				}
			},
			search() {
				this.page = 1
				this.getProList()
			},
			clear() {
				this.formData.name = ""
				this.search()
			},
			getProList() {
				this.more = 'loading'
				let params = Object.assign({
					current: this.page,
					size: 10,
					sortField: "id",
					sortOrder: "descend"
				}, this.formData)
				this.$axios.request(this.$api.getProPage, "GET", params).then((val) => {
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
		// margin-top:19%;
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