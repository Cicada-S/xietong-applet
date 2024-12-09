<template>
	<view>
		<z-paging ref="dataPagingRef" :fixed="true" use-virtual-list :force-close-inner-list="true" cell-height-mode="dynamic" @virtualListChange="virtualListChange" @query="loadData" :auto="true">
			<template #top>
				<view class="snowy-z-paging-item">
					<snowy-search :customStyle="{}" placeholder="请输入发起人姓名关键词" v-model="searchFormData.searchKey" @update="e => searchFormData.searchKey = e" @confirm="$refs.dataPagingRef.reload()" @clear="$refs.dataPagingRef.reload()" :seniorEnable="true" @seniorSearch="$refs.searchRef.open()"></snowy-search>
				</view>
				<searchCom ref="searchRef" :searchFormData="searchFormData" @confirm="$refs.dataPagingRef.reload()"></searchCom>
			</template>
			<view class="snowy-shadow snowy-z-paging-item snowy-padding snowy-hover" v-for="(item, index) in doneTaskData" :key="index" @tap="detailProcess(item, index)">
				<uni-row>
					<uni-col :span="2">
						<uni-icons size="18" type="paperclip" color="#5677fc"></uni-icons>
					</uni-col>
					<uni-col :span="10">
						<view class="snowy-sub-title">标题</view>
					</uni-col>
					<uni-col :span="12">
						<view class="snowy-text-right snowy-text-bold snowy-text-ellipsis"> {{ item.title }} </view>
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="2">
						<uni-icons size="18" type="paperclip" color="#5677fc"></uni-icons>
					</uni-col>
					<uni-col :span="10">
						<view class="snowy-sub-title">摘要</view>
					</uni-col>
					<uni-col :span="12">
						<view class="snowy-text-right snowy-text-bold snowy-text-ellipsis"> {{ item.abstractTitle }} </view>
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="2">
						<uni-icons size="18" type="paperclip" color="#5677fc"></uni-icons>
					</uni-col>
					<uni-col :span="10">
						<view class="snowy-sub-title">办理节点</view>
					</uni-col>
					<uni-col :span="12">
						<view class="snowy-text-right snowy-text-bold snowy-text-ellipsis"> {{ item.doneActivityName }} </view>
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="2">
						<uni-icons size="18" type="paperclip" color="#5677fc"></uni-icons>
					</uni-col>
					<uni-col :span="10">
						<view class="snowy-sub-title">发起人</view>
					</uni-col>
					<uni-col :span="12">
						<view class="snowy-text-right snowy-text-bold snowy-text-ellipsis"> {{ item.initiatorName }} </view>
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="2">
						<uni-icons size="18" type="paperclip" color="#5677fc"></uni-icons>
					</uni-col>
					<uni-col :span="10">
						<view class="snowy-sub-title">发起人组织</view>
					</uni-col>
					<uni-col :span="12">
						<view class="snowy-text-right snowy-text-bold snowy-text-ellipsis"> {{ item.initiatorOrgName }} </view>
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="2">
						<uni-icons size="18" type="paperclip" color="#5677fc"></uni-icons>
					</uni-col>
					<uni-col :span="10">
						<view class="snowy-sub-title">发起时间</view>
					</uni-col>
					<uni-col :span="12">
						<view class="snowy-text-right snowy-text-bold snowy-text-ellipsis"> {{ item.initiatorTime }} </view>
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="2">
						<uni-icons size="18" type="paperclip" color="#5677fc"></uni-icons>
					</uni-col>
					<uni-col :span="10">
						<view class="snowy-sub-title">办理时间</view>
					</uni-col>
					<uni-col :span="12">
						<view class="snowy-text-right snowy-text-bold snowy-text-ellipsis"> {{ item.doneTime }} </view>
					</uni-col>
				</uni-row>
			</view>
		</z-paging>
	</view>
</template>
<script setup>
	import searchCom from './search.vue'
	export default{
		components:{
			searchCom
		},
		data() {
			return {
				dataPagingRef:null,
				searchFormData:{},
				doneTaskData:[],
			}
		},
		methods:{
			virtualListChange(vList) {
				this.doneTaskData = vList;
			},
			async loadData(pageNo, pageSize) {
				const parameter = {
					current: pageNo,
					size: pageSize
				}
				Object.assign(parameter, this.searchFormData)
				this.$axios.request('/flwapp/flw/task/donePage', "GET", {
					...parameter
				}).then((res) => {
					this.$refs.dataPagingRef.complete(res.data.records)
				})
			},
			detailProcess(item, index) {
				uni.navigateTo({
					url: `/pages/OA/doneTask/detail?id=${item.id}&stateCode=${item.stateCode}&doneActivityId=${item.doneActivityId}`
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	::v-deep .uni-row {
		margin: 5rpx;
	}
</style>