<template>
	<view :style="{minHeight:$height(),padding:'0px 3%'}">
		<view v-for="(item,index) in wareHouseTree" :key="index">
			<view class="org-name" :class="{active:item.id == value}" @click="chooseWareHouse(item)">
				{{item.name}}
			</view>
			<view class="org-name" :class="{active:item1.id == value}" v-for="(item1,index1) in item.children" :key="index1" @click="chooseWareHouse(item1)" style="margin-left:20px;">
				{{item1.name}}
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		name: "proModal",
		data() {
			return {
				wareHouseId: "",
				wareHouseTree: []
			};
		},
		props: {
			value:{
				type:String,
				default:""
			}
		},
		
		created() {
			this.getWareHouseTree()
		},
		methods: {
			getWareHouseTree() {
				this.$axios.request(this.$api.getWareHouseTree, "GET").then((val) => {
					this.wareHouseTree = val.data
				})
			},
			chooseWareHouse(e) {
				this.wareHouseId = e.id
				this.$emit("change", e)
			},
			close() {
				this.$emit("close")
			},
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