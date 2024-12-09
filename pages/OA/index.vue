<template>
	<view style="height:100vh">
		<tui-tabs :top="-4" :isFixed="true" :tabs="[{name:'发起流程'}, {name: '草稿箱'}]" :currentTab="curView" @change="tabChange"></tui-tabs>
		<view>
			<view v-show="curView === 0" class="data-list1">
				<view v-for="(item,index) in modelCategory" :key="index" style="margin-bottom: 10rpx;">
					<view v-if="item.children && item.children.length > 0">
						<uni-section :title="item.name" type="line" padding :border="false">
							<uni-grid :column="4" :show-border="false">
								<uni-grid-item v-for="(model, aindex) in item.children" :key="aindex" :index="aindex" >
									<view class="snowy-grid-center" @click="startProcess(model, 'NEW')">
										<snowy-icon :backgroundColor="model.color" custom-prefix="snowy" :type="model.icon" size="20" color="#FFFFFF"></snowy-icon>
										<text class="snowy-text-center u-line-1" style="margin-top: 10rpx">{{ model.name }}</text>
									</view>
								</uni-grid-item>
							</uni-grid>
							<!-- <snowy-empty v-show="$snowy.tool.isEmpty(myModelListFilter(item))" /> -->
						</uni-section>
					</view>
				</view>
			</view>
			<view v-show="curView === 1" class="data-list">
				<z-paging ref="dataPagingRef" :fixed="false" use-virtual-list :force-close-inner-list="true" cell-height-mode="dynamic" @virtualListChange="virtualListChange" @query="loadData" :auto="true">
					<template #top>
						<view class="snowy-item">
							<snowy-search :customStyle="{}" placeholder="请输入流程名称" v-model="searchFormData.name" @confirm="$refs.dataPagingRef.reload()" @clear="$refs.dataPagingRef.reload()"></snowy-search>
						</view>
					</template>
					<view class="snowy-shadow snowy-item snowy-padding snowy-hover" v-for="(item, index) in myDraftData" :key="index" @tap="$refs.moreRef.open(item)">
						<uni-row>
							<uni-col :span="2">
								<uni-icons size="18" type="flag-filled" color="#5677fc"></uni-icons>
							</uni-col>
							<uni-col :span="10">
								<view class="snowy-sub-title">流程名称</view>
							</uni-col>
							<uni-col :span="12">
								<view class="snowy-text-right snowy-text-bold snowy-text-ellipsis"> {{ item.title }} </view>
							</uni-col>
						</uni-row>
						<uni-row>
							<uni-col :span="2">
								<uni-icons size="16" type="calendar-filled" color="#5677fc"></uni-icons>
							</uni-col>
							<uni-col :span="10">
								<view class="snowy-sub-title">创建时间</view>
							</uni-col>
							<uni-col :span="12">
								<view class="snowy-text-right snowy-text-bold snowy-text-ellipsis"> {{ item.createTime }} </view>
							</uni-col>
						</uni-row>
					</view>
				</z-paging>
				<moreCom ref="moreRef" @handleOk="$refs.dataPagingRef.reload()"></moreCom>
			</view>
		</view>
	</view>
</template>
<script>
	import moreCom from './more.vue'
	export default{
		components:{
			moreCom
		},
		data() {
			return{
				curView:0,
				activeKey:[],
				myModelList:[],
				modelCategory:[],
				dataPagingRef:null,
				searchFormData:{},
				myDraftData:[]
			}
		},
		// https://api.xietongcloud.net/api/webapp/dev/dict/tree?_=1731214356877
		// onShow() {
		// 	this.getProcessMyModelList()
		// 		this.$nextTick(() => {
		// 			// this.$refs.dataPagingRef.reload()
		// 		})
		// },
		onShow() {
			this.getCategory()
		},
		methods: {
			getCategory() {
				this.$axios.request('/webapp/dev/dict/tree', "GET", {}).then((res) => {
					this.modelCategory = res.data.filter(e => e.dictValue == 'MODEL_CATEGORY')[0].children
					this.getProcessMyModelList()
				})
			},
			tabChange(e) {
				if (this.curView != e.index) {
					this.curView = e.index
				}
				if(this.curView === 0){
					this.getProcessMyModelList()
				}
				if(this.curView === 1){
					this.$refs.dataPagingRef.reload()
				}
			},
			async getProcessMyModelList() {
				this.$axios.request('/flwapp/flw/process/myModelList', "GET", {}).then((res) => {
					const list = res.data
					this.modelCategory.forEach(item => {
						const arr = list.filter(e => e.category == item.dictValue)
						item.children = arr
					})
					this.$forceUpdate()
					
				})
			},
			myModelListFilter(item) {
				return this.myModelList?.filter((model) => {
					return model.category == item.value
				})
			},
			startProcess(model,openType) {
				console.log('===',model)
				uni.navigateTo({
					url: `/pages/OA/newTask?id=${model.id}&openType=${openType}`,
				})
			},
			virtualListChange(vList) {
				this.myDraftData = vList;
			},
			async loadData(pageNo, pageSize) {
					const parameter = {
						current: pageNo,
						size: pageSize
					}
					Object.assign(parameter, this.searchFormData)
					this.$axios.request('/flwapp/flw/process/myDraftPage', "GET", {
						...parameter
					}).then((res) => {
						this.$refs.dataPagingRef.complete(res.data?.records)
						
					})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.data-list {
		height: 91vh;
		box-sizing: 100%;
		
	}
	.data-list1 {
		box-sizing: 100%;
		padding-top: 100rpx;

		
	}
	::v-deep .uni-row {
		margin: 5rpx;
	}
</style>