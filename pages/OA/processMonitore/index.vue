<template>
	<page-meta :page-style="'overflow:'+(overflowShow?'hidden':'visible')"></page-meta>
	<view>
		<z-paging ref="dataPagingRef" :fixed="true" use-virtual-list :force-close-inner-list="true" cell-height-mode="dynamic" @virtualListChange="virtualListChange" @query="loadData" :auto="true">
			<template #top>
				<view class="snowy-z-paging-item">
					<snowy-search @update="e => searchFormData.searchKey = e" :customStyle="{}" placeholder="请输入发起人姓名关键词" v-model="searchFormData.searchKey" @confirm="$refs.dataPagingRef.reload()" @clear="$refs.dataPagingRef.reload()" :seniorEnable="true" @seniorSearch="$refs.searchRef.open()"></snowy-search>
				</view>
				<search ref="searchRef" :searchFormData="searchFormData" @confirm="$refs.dataPagingRef.reload()"></search>
			</template>
			<view class="snowy-shadow snowy-z-paging-item snowy-padding snowy-hover" v-for="(item, index) in processData" :key="index" @tap="tapItem(item, index)">
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
						<view class="snowy-sub-title">定义名称</view>
					</uni-col>
					<uni-col :span="12">
						<view class="snowy-text-right snowy-text-bold snowy-text-ellipsis"> {{ item.processDefinitionName }} </view>
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="2">
						<uni-icons size="18" type="paperclip" color="#5677fc"></uni-icons>
					</uni-col>
					<uni-col :span="10">
						<view class="snowy-sub-title">定义版本</view>
					</uni-col>
					<uni-col :span="12">
						<view class="snowy-text-right snowy-text-bold snowy-text-ellipsis"> {{ item.processDefinitionVersion }} </view>
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
						<view class="snowy-sub-title">发起时间</view>
					</uni-col>
					<uni-col :span="12">
						<view class="snowy-text-right snowy-text-bold snowy-text-ellipsis"> {{ item.startTime }} </view>
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="2">
						<uni-icons size="18" type="paperclip" color="#5677fc"></uni-icons>
					</uni-col>
					<uni-col :span="10">
						<view class="snowy-sub-title">结束时间</view>
					</uni-col>
					<uni-col :span="12">
						<view class="snowy-text-right snowy-text-bold snowy-text-ellipsis"> {{ item.endTime }} </view>
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
						<view class="snowy-text-right snowy-text-bold snowy-text-ellipsis"> {{ item.currentActivityNames }} </view>
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="2">
						<uni-icons size="18" type="paperclip" color="#5677fc"></uni-icons>
					</uni-col>
					<uni-col :span="10">
						<view class="snowy-sub-title">当前办理人</view>
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
						<view class="snowy-sub-title">状态</view>
					</uni-col>
					<uni-col :span="12">
						<view class="snowy-text-right snowy-text-bold snowy-text-ellipsis" :style="{'color':getStateColor(item.stateCode)}"> {{ item.stateText }} </view>
					</uni-col>
				</uni-row>
			</view>
		</z-paging>
		<more ref="moreRef" @handleOk="$refs.dataPagingRef.reload()" @morePopChange="morePopChange"></more>
	</view>
</template>
<script setup>
	import more from './more.vue'
	import search from './search.vue'
	
	export default{
		components:{
			more,
			search
		},
		data() {
			return {
				searchFormData:{},
				processData:[],
				overflowShow:false
			}
		},
		onShow() {
			this.$nextTick(() => {
				this.$refs.dataPagingRef.reload()
			})
		},
		methods:{
			virtualListChange(vList) {
				this.processData = vList;
			},
			async loadData(pageNo, pageSize) {
				const parameter = {
					current: pageNo,
					size: pageSize
				}
				Object.assign(parameter, this.searchFormData)
				this.$axios.request('/flwapp/flw/process/monitor/monitorPage', "GET", {
					...parameter
				}).then((res) => {
					this.$refs.dataPagingRef.complete(res.data.records)
				})
			},
			getStateColor(stateCode) {
				if (stateCode === 'ACTIVE') {
					return '#1890FF'
				}
				if (stateCode === 'SUSPENDED') {
					return '#FCC02E'
				}
				if (stateCode === 'COMPLETED') {
					return '#52C41A'
				}
				if (stateCode === 'END') {
					return '#FF5A5A'
				}
				if (stateCode === 'REVOKE') {
					return '#BFBFBF'
				}
				if (stateCode === 'REJECT') {
					return '#FF4D4F'
				}
			},
			tapItem(item, index) {
				this.$refs.moreRef.open(item)
			},
			morePopChange(e) {
				this.overflowShow = e.show
			}
			
		}
	}
</script>
<style lang="scss" scoped>
	::v-deep .uni-row {
		margin: 5rpx;
	}
</style>