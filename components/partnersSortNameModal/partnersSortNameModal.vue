<template>
	<view :style="{minHeight:$height(),padding:'0px 3%'}">
		<view>
			<u-search placeholder="请输入合作伙伴名称" :clearabled="true" :showAction="false" @search="search" @clear="clear" v-model="partnersName" :customStyle="{margin:'10rpx 10rpx 30rpx 10rpx'}"></u-search>
		</view>
		<view class="king-flex" style="height: 100%;justify-content: space-between;">
			<view style="border-right:1px solid #eaeaea;width:48%;">
				<view v-for="(item,index) in orgTree" :key="index">
					<view class="org-name" :class="{active:item.id == orgId}" @click="choosePartners(item.id)">
						{{item.name}}
					</view>
					<view class="org-name" :class="{active:item1.id == orgId}" v-for="(item1,index1) in item.children"
						:key="index1" @click="choosePartners(item1.id)" style="margin-left:20px;">
						{{item1.name}}
					</view>
				</view>
			</view>

			<view style="width:48%;" v-if="type == 'radio'">
				<u-radio-group placement="column" iconPlacement="right" @change="change" :value="value">
					<u-radio v-for="(item,index) in list" :key="index" :customStyle="{marginBottom: '8px'}"
						:label="`${item.account}`" :name="item.id">
					</u-radio>
				</u-radio-group>
				<u-empty v-if="list.length == 0" :icon="$utils.imagePath('/assets/img/data.png')" mode="data"></u-empty>
			</view>
			<view style="width:48%;" v-else>
				<u-checkbox-group placement="column" iconPlacement="right" @change="changeCheckbox" :value="value">
					<u-checkbox v-for="(item,index) in list" :checked="value.split(',').includes(item.id)" :key="index" :customStyle="{marginBottom: '8px'}"
						:label="`${item.account}`" :name="item.id">
					</u-checkbox>
				</u-checkbox-group>
				<u-empty v-if="list.length == 0" :icon="$utils.imagePath('/assets/img/data.png')" mode="data"></u-empty>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		name: "partnersSortNameModal",
		data() {
			return {
				loadText: {
					loadmore: '轻轻上拉，加载更多',
					loading: '努力加载中',
					nomore: '我也是有底线的'
				},
				partnersName: "",
				orgId: "",
				orgTree: [],
				more: 'loading',
				selectRows:[],
				page: 1,
				list: [],
			};
		},
		props: {
			value: {
				type: String,
				default: ""
			},
			idList: {
				type: String,
				default: ""
			},
			type: {
				type: String,
				default: "radio"
			}
		},
		created() {
			this.getPartnersSortTree()
			this.getPartners()
		},
		methods: {
			getPartnersSortTree() {
				this.$axios.request(this.$api.getPartnersSortTree, "GET").then((val) => {
					this.orgTree = val.data
				})
			},
			choosePartners(e) {
				this.orgId = e
				this.page = 1
				this.getPartners()
			},
			loadMore() {
				if (this.more == 'loadmore') {
					this.getPartners()
				}
			},
			change(e) {
				let idx = this.$utils.findArrIndex(this.list, e)
				this.selectRows = [this.list[idx]]
				this.$emit("change", this.list[idx])
			},
			changeCheckbox(e){
				let arr = new Array()
				e.forEach((item,index) => {
					let idx = this.$utils.findArrIndex(this.list, item)
					arr.push(this.list[idx])
				})
				this.selectRows = arr
			},
			close() {
				this.$emit("close")
			},
			clear() {
				this.partnersName = ""
				this.search()
			},
			search() {
				this.page = 1
				this.getPartners()
			},
			getPartners() {
				this.more = 'loading'
				this.$axios.request(this.$api.getPartners, "GET", {
					current: this.page,
					size: 30,
					orgId: this.orgId,
					searchKey: this.partnersName,
					idList:this.idList,
					sortField: "id",
					sortOrder: "descend"
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.org-name {
		color: #606266;
		font-size: 15px;
		line-height: 15px;
		margin-bottom: 8px;
	}

	.active {
		color: #0083ff;
	}

	/deep/ .u-search {
		flex: none !important;
	}


</style>