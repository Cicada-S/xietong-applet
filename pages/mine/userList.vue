<template>
	<view class="container" :style="{minHeight:$height()}">
		<u-checkbox-group borderBottom iconPlacement="right" v-model="formData.userIds" placement="column">
			<u-checkbox v-for="(item,index) in list" :key="index" :label="`${item.account}`"
				:name="item.id"></u-checkbox>
		</u-checkbox-group>
		<u-button @click="submit" :customStyle="{width:'80%',position:'fixed',right:'10%',bottom:'30px',zIndex:'999'}"
			type="primary" text="确定"></u-button>
		<u-loadmore v-if="list.length !== 0" :status="more" :load-text="loadText" />
		<u-empty v-else :icon="$utils.imagePath('/assets/img/data.png')" mode="data" marginTop="30%"></u-empty>
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
				formData: {
					userIds: []
				},
				page: 1,
				list: [],
			}
		},
		onLoad() {
			
			this.getUserRes()
		},
		methods: {
			//下拉刷新
			onPullDownRefresh() {
				this.page = 1
				this.getUserRes()
			},
			//上拉加载
			onReachBottom() {
				if (this.page == 1) {
					return
				}
				if (this.more == 'loadmore') {
					this.getUserRes()
				}
			},

			submit() {
				uni.$emit('choose', this.formData.userIds)
				this.$nextTick(() => {
					uni.navigateBack()
				})
			},
			getUserRes() {
				this.more = 'loading'
				this.$axios.request(this.$api.getUserRes, "GET", {
					current: this.page,
					size: 10,
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

<style lang="scss">
	.container {
		padding: 3%;
	}

	.u-checkbox-label--right {
		padding-top: 8px;
	}
</style>