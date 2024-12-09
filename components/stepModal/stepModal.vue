<template>
	<view :style="{minHeight:$height(),padding:' 0px 3%'}">
		<u-radio-group placement="column" iconPlacement="right" @change="change" :value="value">
			<u-radio v-for="(item,index) in list" :key="index" :customStyle="{marginBottom: '8px'}"
				:label="`${item.name}`" :name="item.id">
			</u-radio>
		</u-radio-group>
		<u-empty v-if="list.length == 0" :icon="$utils.imagePath('/assets/img/data.png')" mode="data"></u-empty>
		
	</view>
</template>

<script>
	export default {
		name: "stepModal",
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
			};
		},
		props: {
			value: {
				type: String,
				default: ""
			}
		},
		mounted() {
			
		},
		created() {
			this.getWorkStepRes()
		},
		methods: {

			loadMore() {
				if (this.more == 'loadmore') {
					this.getWorkStepRes()
				}
			},
			change(e) {
				let idx = this.$utils.findArrIndex(this.list, e)
				this.$emit("change", this.list[idx])
			},
			close() {
				this.$emit("close")
			},
			getWorkStepRes() {
				this.more = 'loading'
				this.$axios.request(this.$api.getWorkStepRes, "GET", {
					current: this.page,
					size: 30,
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

</style>