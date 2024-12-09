<template>
	<view>
		<z-paging ref="dataPagingRef" :fixed="true" use-virtual-list :force-close-inner-list="true" cell-height-mode="dynamic" @virtualListChange="virtualListChange" @query="loadData" :auto="true">
			<template #top>
				<view class="snowy-z-paging-item">
					<snowy-search @update="e => searchFormData.searchKey = e" :customStyle="{}" placeholder="请输入发起人姓名关键词" v-model="searchFormData.searchKey" @confirm="$refs.dataPagingRef.reload()" @clear="$refs.dataPagingRef.reload()" :seniorEnable="true" @seniorSearch="openSearch"></snowy-search>
				</view>
				<searchCom ref="searchRef" :searchFormData="searchFormData" @confirm="$refs.dataPagingRef.reload()"></searchCom>
			</template>
			<view class="snowy-shadow snowy-z-paging-item snowy-padding snowy-hover" v-for="(item, index) in todoTaskData" :key="index" @tap="todoProcess(item, index)">
				<uni-row>
					<uni-col :span="2">
						<uni-icons size="18" type="paperclip" color="#5677fc"></uni-icons>
					</uni-col>
					<uni-col :span="10">
						<view class="snowy-sub-title">流程标题</view>
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
						<view class="snowy-sub-title">办理人</view>
					</uni-col>
					<uni-col :span="12">
						<view class="snowy-text-right snowy-text-bold snowy-text-ellipsis"> {{ item.assignees }} </view>
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
						<view class="snowy-sub-title">发起人职位</view>
					</uni-col>
					<uni-col :span="12">
						<view class="snowy-text-right snowy-text-bold snowy-text-ellipsis"> {{ item.initiatorPositionName }} </view>
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="2">
						<uni-icons size="18" type="paperclip" color="#5677fc"></uni-icons>
					</uni-col>
					<uni-col :span="10">
						<view class="snowy-sub-title">当前节点</view>
					</uni-col>
					<uni-col :span="12">
						<view class="snowy-text-right snowy-text-bold snowy-text-ellipsis"> {{ item.currentActivityName }} </view>
					</uni-col>
				</uni-row>
			</view>
		</z-paging>
	</view>
</template>
<script setup>
	import searchCom from './search.vue'
	export default {
		components:{
			searchCom
		},
		data() {
			return{
				dataPagingRef:null,
				searchFormData:{},
				todoTaskData:[],
				
			}
		},
		onShow() {
			this.$nextTick(() => {
				this.$refs.dataPagingRef.reload()
			})
		},
		methods:{
			virtualListChange(vList) {
				this.todoTaskData = vList;
			},
			async loadData(pageNo, pageSize) {
				const parameter = {
					current: pageNo,
					size: pageSize
				}
				Object.assign(parameter, this.searchFormData)
				this.$axios.request('/flwapp/flw/task/todoPage', "GET", {
					...parameter
				}).then((res) => {
					this.$refs.dataPagingRef.complete(res.data.records)
				})
			},
			todoProcess(item,index) {
				uni.navigateTo({
					url: '/pages/OA/todoTask/detail?id=' + item.id + '&processInstanceId=' + item.processInstanceId + '&currentActivityId=' + item.currentActivityId
				})
			},
			openSearch() {
				this.$refs.searchRef.open()
			}
		}
	}
	
</script>
<style lang="scss" scoped>
	::v-deep .uni-row {
		margin: 5rpx;
	}
</style>