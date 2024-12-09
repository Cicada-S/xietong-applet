<template>
	<view>
		<z-paging ref="dataPagingRef" :fixed="true" use-virtual-list :force-close-inner-list="true"
			cell-height-mode="dynamic" @virtualListChange="virtualListChange" @query="loadData" :auto="true">
			<template #top>
				<view class="snowy-z-paging-item">
					<tui-tabs :top="0" :isFixed="false" :tabs="[{name:'待阅流程'}, {name: '已阅流程'}]" :currentTab="curView"
						@change="tabChange"></tui-tabs>
				</view>
				<view class="snowy-z-paging-item">
					<snowy-search @update="e => searchFormData.name = e" :customStyle="{}" placeholder="请输入流程名称" v-model="searchFormData.name"
						@confirm="$refs.dataPagingRef.reload()" @clear="$refs.dataPagingRef.reload()"></snowy-search>
				</view>
			</template>
			<view class="snowy-shadow snowy-z-paging-item snowy-padding snowy-hover"
				v-for="(item, index) in copyTaskData" :key="index" @tap="moreTapItem(item, index)">
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
						<view class="snowy-sub-title">流水号</view>
					</uni-col>
					<uni-col :span="12">
						<view class="snowy-text-right snowy-text-bold snowy-text-ellipsis"> {{ item.sn }} </view>
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
						<view class="snowy-text-right snowy-text-bold snowy-text-ellipsis">
							{{ item.processDefinitionName }} </view>
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
						<view class="snowy-text-right snowy-text-bold snowy-text-ellipsis">
							{{ item.processDefinitionVersion }} </view>
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="2">
						<uni-icons size="18" type="paperclip" color="#5677fc"></uni-icons>
					</uni-col>
					<uni-col :span="10">
						<view class="snowy-sub-title">发起组织</view>
					</uni-col>
					<uni-col :span="12">
						<view class="snowy-text-right snowy-text-bold snowy-text-ellipsis"> {{ item.initiatorOrgName }}
						</view>
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="2">
						<uni-icons size="18" type="paperclip" color="#5677fc"></uni-icons>
					</uni-col>
					<uni-col :span="10">
						<view class="snowy-sub-title">发起职位</view>
					</uni-col>
					<uni-col :span="12">
						<view class="snowy-text-right snowy-text-bold snowy-text-ellipsis">
							{{ item.initiatorPositionName }} </view>
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="2">
						<uni-icons size="18" type="paperclip" color="#5677fc"></uni-icons>
					</uni-col>
					<uni-col :span="10">
						<view class="snowy-sub-title">耗时</view>
					</uni-col>
					<uni-col :span="12">
						<view class="snowy-text-right snowy-text-bold snowy-text-ellipsis"> {{ item.durationInfo }}
						</view>
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
						<view class="snowy-text-right snowy-text-bold snowy-text-ellipsis">
							{{ item.currentActivityNames }} </view>
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
						<view class="snowy-text-right snowy-text-bold snowy-text-ellipsis"> {{ item.stateText }} </view>
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
			</view>
		</z-paging>
		<moreCom ref="moreRef" @handleOk="loadData(1,10)"></moreCom>
	</view>
</template>
<script>
	import moreCom from './more.vue'
	export default {
		components:{
			moreCom
		},
		data() {
			return {
				curView: 0,
				dataPagingRef: null,
				searchFormData: {},
				copyTaskData: [],
				moreRef:null
			}
		},
		onShow() {
			this.$nextTick(() => {
				this.$refs.dataPagingRef.reload()
			})
		},
		methods: {
			tabChange(e) {
				if (this.curView != e.index) {
					this.curView = e.index
					this.$refs.dataPagingRef.reload()
				}
			},
			virtualListChange(vList) {
				this.copyTaskData = vList
			},
			async loadData(pageNo, pageSize) {
				const parameter = {
					current: pageNo,
					size: pageSize
				}
				Object.assign(parameter, this.searchFormData)
				if (this.curView === 0) {
					this.$axios.request('/flwapp/flw/process/myCopyUnreadPage', "GET", {
						...parameter
					}).then((res) => {
						this.$refs.dataPagingRef.complete(res.data.records)
					})
					
				}
				if (this.curView === 1) {
					this.$axios.request('/flwapp/flw/process/myCopyHasReadPage', "GET", {
						...parameter
					}).then((res) => {
						this.$refs.dataPagingRef.complete(res.data.records)
					})
				}
			},
			moreTapItem(item, index) {
				this.$refs.moreRef.open(item, this.curView)
			}
		}
	}
</script>
<style lang="scss" scoped>
	::v-deep .uni-row {
		margin: 5rpx;
	}
</style>