<template>
	<view class="container" :style="{minHeight:$height()}">
		<view class="search-box">
			<view class="search-item king-flex" v-if="actType == 0">
				<u-button v-if="$utils.hasPerm('invDetailProcureAdd')" type="primary" size="small" @click="$next(`/pages/mine/invAdd?type=${type}&actType=${actType}`)" text="新增"></u-button>
				<u-button v-if="$utils.hasPerm('invDetailProcureEdit')" type="error" size="small" @click="edit" text="编辑"></u-button>
				<u-button v-if="$utils.hasPerm('invDetailProcureBatchDelete')" type="primary" size="small" @click="del" text="删除"></u-button>
				<u-button v-if="$utils.hasPerm('approvalProcureOk')" type="error" size="small" @click="approvalOk" text="审批"></u-button>
				<u-button v-if="$utils.hasPerm('approvalProcureErr')" type="primary" size="small" @click="approvalErr" text="弃审"></u-button>
			</view>
			<view class="search-item king-flex" v-if="actType == 1">
				<u-button v-if="$utils.hasPerm('invDetailBackStockAdd')" type="primary" size="small" @click="$next(`/pages/mine/invAdd?type=${type}&actType=${actType}`)" text="新增"></u-button>
				<u-button v-if="$utils.hasPerm('invDetailBackStockEdit')" type="error" size="small" @click="edit" text="编辑"></u-button>
				<u-button v-if="$utils.hasPerm('invDetailBackStockBatchDelete')" type="primary" size="small" @click="del" text="删除"></u-button>
				<u-button v-if="$utils.hasPerm('approvalBackStockOk')" type="error" size="small" @click="approvalOk" text="审批"></u-button>
				<u-button v-if="$utils.hasPerm('approvalBackStockErr')" type="primary" size="small" @click="approvalErr" text="弃审"></u-button>
			</view>
			<view class="search-item king-flex" v-if="actType == 2">
				<u-button v-if="$utils.hasPerm('invDetailBackGoodsAdd')" type="primary" size="small" @click="$next(`/pages/mine/invAdd?type=${type}&actType=${actType}`)" text="新增"></u-button>
				<u-button v-if="$utils.hasPerm('invDetailBackGoodsEdit')" type="error" size="small" @click="edit" text="编辑"></u-button>
				<u-button v-if="$utils.hasPerm('invDetailBackGoodsBatchDelete')" type="primary" size="small" @click="del" text="删除"></u-button>
				<u-button v-if="$utils.hasPerm('approvalBackGoodsOk')" type="error" size="small" @click="approvalOk" text="审批"></u-button>
				<u-button v-if="$utils.hasPerm('approvalBackGoodsErr')" type="primary" size="small" @click="approvalErr" text="弃审"></u-button>
			</view>
			
			<view class="search-item king-flex" v-if="actType == 3">
				<u-button v-if="$utils.hasPerm('invDetailArriveStockAdd')" type="primary" size="small" @click="$next(`/pages/mine/invAdd?type=${type}&actType=${actType}`)" text="新增"></u-button>
				<u-button v-if="$utils.hasPerm('invDetailArriveStockEdit')" type="error" size="small" @click="edit" text="编辑"></u-button>
				<u-button v-if="$utils.hasPerm('invDetailArriveStockBatchDelete')" type="primary" size="small" @click="del" text="删除"></u-button>
				<u-button v-if="$utils.hasPerm('approvalArriveStockOk')" type="error" size="small" @click="approvalOk" text="审批"></u-button>
				<u-button v-if="$utils.hasPerm('approvalArriveStockErr')" type="primary" size="small" @click="approvalErr" text="弃审"></u-button>
			</view>
			
			<view class="search-item king-flex" v-if="actType == 4">
				<u-button v-if="$utils.hasPerm('invDetailAllocateAdd')" type="primary" size="small" @click="$next(`/pages/mine/invAdd?type=${type}&actType=${actType}`)" text="新增"></u-button>
				<u-button v-if="$utils.hasPerm('invDetailAllocateEdit')" type="error" size="small" @click="edit" text="编辑"></u-button>
				<u-button v-if="$utils.hasPerm('invDetailAllocateBatchDelete')" type="primary" size="small" @click="del" text="删除"></u-button>
				<u-button v-if="$utils.hasPerm('approvalAllocateOk')" type="error" size="small" @click="approvalOk" text="审批"></u-button>
				<u-button v-if="$utils.hasPerm('approvalAllocateErr')" type="primary" size="small" @click="approvalErr" text="弃审"></u-button>
			</view>
			<view class="search-item king-flex" v-if="actType == 5">
				<u-button v-if="$utils.hasPerm('invDetailFinishedAdd')" type="primary" size="small" @click="$next(`/pages/mine/invAdd?type=${type}&actType=${actType}`)" text="新增"></u-button>
				<u-button v-if="$utils.hasPerm('invDetailFinishedEdit')" type="error" size="small" @click="edit" text="编辑"></u-button>
				<u-button v-if="$utils.hasPerm('invDetailFinishedBatchDelete')" type="primary" size="small" @click="del" text="删除"></u-button>
				<u-button v-if="$utils.hasPerm('approvalFinishedOk')" type="error" size="small" @click="approvalOk" text="审批"></u-button>
				<u-button v-if="$utils.hasPerm('approvalFinishedErr')" type="primary" size="small" @click="approvalErr" text="弃审"></u-button>
			</view>
			<view class="search-item king-flex" v-if="actType == 6">
				<u-button v-if="$utils.hasPerm('invDetailOtherAdd')" type="primary" size="small" @click="$next(`/pages/mine/invAdd?type=${type}&actType=${actType}`)" text="新增"></u-button>
				<u-button v-if="$utils.hasPerm('invDetailOtherEdit')" type="error" size="small" @click="edit" text="编辑"></u-button>
				<u-button v-if="$utils.hasPerm('invDetailOtherBatchDelete')" type="primary" size="small" @click="del" text="删除"></u-button>
				<u-button v-if="$utils.hasPerm('approvalOtherOk')" type="error" size="small" @click="approvalOk" text="审批"></u-button>
				<u-button v-if="$utils.hasPerm('approvalOtherErr')" type="primary" size="small" @click="approvalErr" text="弃审"></u-button>
			</view>
			<view class="search-item king-flex" v-if="actType == 7">
				<u-button v-if="$utils.hasPerm('invDetailDeliverGoodsOutAdd')" type="primary" size="small" @click="$next(`/pages/mine/invAdd?type=${type}&actType=${actType}`)" text="新增"></u-button>
				<u-button v-if="$utils.hasPerm('invDetailDeliverGoodsOutEdit')" type="error" size="small" @click="edit" text="编辑"></u-button>
				<u-button v-if="$utils.hasPerm('invDetailDeliverGoodsOutBatchDelete')" type="primary" size="small" @click="del" text="删除"></u-button>
				<u-button v-if="$utils.hasPerm('approvalDeliverGoodsOutOk')" type="error" size="small" @click="approvalOk" text="审批"></u-button>
				<u-button v-if="$utils.hasPerm('approvalDeliverGoodsOutErr')" type="primary" size="small" @click="approvalErr" text="弃审"></u-button>
			</view>
			<view class="search-item king-flex" v-if="actType == 8">
				<u-button v-if="$utils.hasPerm('invDetailBackGoodsOutAdd')" type="primary" size="small" @click="$next(`/pages/mine/invAdd?type=${type}&actType=${actType}`)" text="新增"></u-button>
				<u-button v-if="$utils.hasPerm('invDetailBackGoodsOutEdit')" type="error" size="small" @click="edit" text="编辑"></u-button>
				<u-button v-if="$utils.hasPerm('invDetailBackGoodsOutBatchDelete')" type="primary" size="small" @click="del" text="删除"></u-button>
				<u-button v-if="$utils.hasPerm('approvalBackGoodsOutOk')" type="error" size="small" @click="approvalOk" text="审批"></u-button>
				<u-button v-if="$utils.hasPerm('approvalBackGoodsOutErr')" type="primary" size="small" @click="approvalErr" text="弃审"></u-button>
			</view>
			<view class="search-item king-flex" v-if="actType == 9">
				<u-button v-if="$utils.hasPerm('invDetailPickingOutAdd')" type="primary" size="small" @click="$next(`/pages/mine/invAdd?type=${type}&actType=${actType}`)" text="新增"></u-button>
				<u-button v-if="$utils.hasPerm('invDetailPickingOutEdit')" type="error" size="small" @click="edit" text="编辑"></u-button>
				<u-button v-if="$utils.hasPerm('invDetailPickingOutBatchDelete')" type="primary" size="small" @click="del" text="删除"></u-button>
				<u-button v-if="$utils.hasPerm('approvalPickingOutOk')" type="error" size="small" @click="approvalOk" text="审批"></u-button>
				<u-button v-if="$utils.hasPerm('approvalPickingOutErr')" type="primary" size="small" @click="approvalErr" text="弃审"></u-button>
			</view>
			<view class="search-item king-flex" v-if="actType == 10">
				<u-button v-if="$utils.hasPerm('invDetailOtherOutAdd')" type="primary" size="small" @click="$next(`/pages/mine/invAdd?type=${type}&actType=${actType}`)" text="新增"></u-button>
				<u-button v-if="$utils.hasPerm('invDetailOtherOutEdit')" type="error" size="small" @click="edit" text="编辑"></u-button>
				<u-button v-if="$utils.hasPerm('invDetailOtherOutBatchDelete')" type="primary" size="small" @click="del" text="删除"></u-button>
				<u-button v-if="$utils.hasPerm('approvalOtherOutOk')" type="error" size="small" @click="approvalOk" text="审批"></u-button>
				<u-button v-if="$utils.hasPerm('approvalOtherOutErr')" type="primary" size="small" @click="approvalErr" text="弃审"></u-button>
			</view>
			
			<u-search placeholder="请输入单据编号 / 来源单号" :clearabled="true" :showAction="false" @search="search" @clear="clear" v-model="formData.keywords" :customStyle="{margin:'10rpx 10rpx'}"></u-search>
			<u-tabs :list="searchTypeList" @click="showModal"></u-tabs>
			
		</view>

		<view class="box">
			
			<u-checkbox-group @change="changeCheckBox" placement="column">

				<view class="item" v-for="(item,index) in list" :key="index">
					<view class="order-no king-align__center king-flex__between">
						<view class="left king-align__center">
							<view class="line"></view>
							<text>单号：{{item.invCode}}</text>
						</view>
						<view class="right king-align__center">
							<u-checkbox :name="item.id" :checked="selectRowKeys.includes(item.id)" />
						</view>
					</view>
					<u-line margin="20rpx 0px"></u-line>
					<view class="info">
						<view class="king-flex king-flex__column">

				<view class="king-align__center info-item">								<text>订单编号：</text>								<text>{{item.resourceId || ''}}</text>							</view>							<view class="king-align__center info-item">								<text>项目编号：</text>								<text>{{item.xmID || ''}}</text>							</view>							<view class="king-align__center info-item">								<text>客户名称：</text>								<text>{{item.saleOrderDetailName || ''}}</text>							</view>							<view class="king-align__center info-item">								<text>出库明细：</text>								<text>{{item.outId || ''}}</text>							</view>							<view class="king-align__center info-item">								<text>客户编号：</text>								<text>{{item.cusID || ''}}</text>							</view>							<view class="king-align__center info-item">								<text>产品编码：</text>								<text>{{item.proId || ''}}</text>							</view>							<view class="king-align__center info-item">								<text>产品料号：</text>								<text>{{item.probomId || ''}}</text>							</view>							<view class="king-align__center info-item">								<text>单价：</text>								<text>{{item.price || ''}}</text>							</view>							<view class="king-align__center info-item">								<text>数量：</text>								<text>{{item.mulnumber || ''}}</text>							</view>							<view class="king-align__center info-item">								<text>已发货数量：</text>								<text>{{item.fanumber || ''}}</text>							</view>							<view class="king-align__center info-item">								<text>单位：</text>								<text>{{item.unit || ''}}</text>							</view>							<view class="king-align__center info-item">								<text>小计：</text>								<text>{{item.all || ''}}</text>							</view>


							<view class="king-align__center info-item">
								<text>状态：</text>
								<u-tag type="error" size="mini" v-if="item.approval == 0" text="待审批"></u-tag>
								<u-tag type="success" size="mini" v-else-if="item.approval == 1" text="审批通过"></u-tag>
								<u-tag type="error" size="mini" v-else-if="item.approval == 2" text="审批驳回"></u-tag>
								<u-tag type="warning" size="mini" v-else text="弃审"></u-tag>
							</view>

						</view>
					</view>
					<u-line margin="20rpx 0px"></u-line>
					<view class="footer king-align king-flex__between">
						<view class="report u-line-1">
							申请人：{{item.createUserName||''}}
						</view>
						<view class="report u-line-1">
							审批人：{{item.approvalUserName || ''}}
						</view>

					</view>
				</view>
			</u-checkbox-group>
			

		</view>
		<u-loadmore v-if="list.length !== 0" :workOrder="more" :load-text="loadText" />
		<u-empty v-else :icon="$utils.imagePath('/assets/img/data.png')" mode="data" marginTop="30%"></u-empty>


		<u-popup :show="tabIdx == 5" mode="bottom" @close="close" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto" @scrolltolower="() => this.$refs.workReportModalRef.loadMore()">
					<workReportModal :value="formData.createworkReport" @change="changeworkReport" ref="workReportModalRef"></workReportModal>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :plain="true" @click="reset" :customStyle="buttonLeftCustom" text="重置"></u-button>
				<u-button type="primary" @click="query" text="查询" :customStyle="buttonRightCustom"></u-button>
			</view>
		</u-popup>
		
		<u-popup :show="tabIdx == 1" mode="bottom" @close="close" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto" @scrolltolower="() => this.$refs.puorOrderDetailRef.loadMore()">
					<puorOrderDetailModal :value="formData.proId" type="radio" @change="changePro" ref="puorOrderDetailRef"></puorOrderDetailModal>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :plain="true" @click="reset" :customStyle="buttonLeftCustom" text="重置"></u-button>
				<u-button type="primary" @click="query" text="查询" :customStyle="buttonRightCustom"></u-button>
			</view>
		</u-popup>
		
		<u-popup :show="tabIdx === 2" mode="bottom" @close="close" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto" @scrolltolower="() => this.$refs.invDetailListModalRef.loadMore()">
					<invDetailListModal :value="formData.invDetailListId" @change="changeinvDetailList" ref="cModalRef"></invDetailListModal>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :plain="true" @click="reset" :customStyle="buttonLeftCustom" text="重置"></u-button>
				<u-button type="primary" @click="query" text="查询" :customStyle="buttonRightCustom"></u-button>
			</view>
		</u-popup>
		
		
		<u-popup :show="tabIdx === 0" mode="bottom" @close="close" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto" @scrolltolower="() => this.$refs.saleOrderDetailRef.loadMore()">
					<saleOrderDetail :value="formData.saleOrderDetailId" @change="changesaleOrderDetail" ref="saleOrderDetailRef"></saleOrderDetail>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :plain="true" @click="reset" :customStyle="buttonLeftCustom" text="重置"></u-button>
				<u-button type="primary" @click="query" text="查询" :customStyle="buttonRightCustom"></u-button>
			</view>
		</u-popup>
		
		<u-popup :show="tabIdx === 3" mode="bottom" @close="close" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto" @scrolltolower="() => this.$refs.invDetailListModalRef.loadMore()">
					<invDetailListModal :value="formData.invDetailListId" @change="changeinvDetailList" ref="cModalRef"></invDetailListModal>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :plain="true" @click="reset" :customStyle="buttonLeftCustom" text="重置"></u-button>
				<u-button type="primary" @click="query" text="查询" :customStyle="buttonRightCustom"></u-button>
			</view>
		</u-popup>
		
		<u-popup :show="tabIdx === 4" mode="bottom" @close="close" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto">
					<workOrderModal :data="approvalList" :value="formData.approval" @change="changeApproval"></workOrderModal>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :plain="true" @click="reset" :customStyle="buttonLeftCustom" text="重置"></u-button>
				<u-button type="primary" @click="query" text="查询" :customStyle="buttonRightCustom"></u-button>
			</view>
		</u-popup>
		
		<u-popup :show="tabIdx === 0" mode="bottom" @close="close" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto" @scrolltolower="() => this.$refs.checkBillRef.loadMore()">
					<checkBill :value="formData.checkBillId" @change="changecheckBill" ref="checkBillRef"></checkBill>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :plain="true" @click="reset" :customStyle="buttonLeftCustom" text="重置"></u-button>
				<u-button type="primary" @click="query" text="查询" :customStyle="buttonRightCustom"></u-button>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import workReportModal from '@/pages/index/proReportList.vue'
	import puorOrderDetailModal from '@/pages/sale/puorOrderDetail/index.vue'
	import saleOrderDetail from '@/pages/sale/saleOrderDetail/index.vue'
	import checkBill from '@/pages/sale/checkBill/index.vue'
	import workOrderModal from '@/pages/index/workReportList.vue'
	import invDetailListModal from '@/pages/mine/invDetailList.vue'

	export default {
		data() {
			return {
				searchTypeList: [{
					name: '销售订单'
				}, {
					name: '采购订单'
				}, {
					name: '入库明细'
				}, {
					name: '出库明细'
				}, {
					name: '工单明细'
				}, {
					name: '报工明细'
				},
				{
					name: '往来对账明细'
				}],
				buttonLeftCustom: {
					borderTopLeftRadius: '20px',
					borderBottomLeftRadius: '20px',
					borderTopRightRadius: '0px',
					borderBottomRightRadius: '0px'
				},
				buttonRightCustom: {
					borderTopRightRadius: '20px',
					borderBottomRightRadius: '20px',
					borderTopLeftRadius: '0px',
					borderBottomLeftRadius: '0px'
				},
				tabIdx: "",
				loadText: {
					loadmore: '轻轻上拉，加载更多',
					loading: '努力加载中',
					nomore: '我也是有底线的'
				},
				selectRowKeys: [],
				approvalName: "",
				approvalList: ['待审批', '审批通过', '审批驳回', '弃审'],
				saleOrderDetailName: '',
				checkBill:[],
				invDetailListName: '',
				invDetailListTree: [],
				workReportName: '',
				workReportList: [],
				show: false,
				proName: '',
				more: 'loading',
				puorOrderDetail: [],
				saleOrderDetailList: [],
				page: 1,
				type: 0,
				actType: 0,
				list: [],
				formData: {},
				pmManageType: [
				],
			}
		},
		components: {
			workReportModal,
			puorOrderDetailModal,
			saleOrderDetail,
			workOrderModal,
			invDetailListModal
		},
		onLoad(options) {
			this.type = this.formData.type = options.type
			this.actType = this.formData.actType = options.actType
			uni.setNavigationBarTitle({
				title: this.pmManage[this.actType]
			})

			this.$axios.request(this.$api.getOrderDetailRes, "GET",{
				projectCode:this.projectCode
			}).then((val) => {
				this.saleOrderDetailList = val.data
			})
			this.$axios.request(this.$api.getOrderDetailRes, "GET",{
				projectCode:this.projectCode
			}).then((val) => {
				this.puorOrderDetail = val.data
			})
			this.$axios.request(this.$api.getInvDetailRes, "GET",{
				projectCode:this.projectCode
			}).then((val) => {
				this.invDetailListTree = val.data
			})
			this.$axios.request(this.$api.getInvDetailRes, "GET",{
				projectCode:this.projectCode
			}).then((val) => {
				this.invDetailListTree = val.data
			})
			this.$axios.request(this.$api.getWorkOrderRes, "GET",{
				projectCode:this.projectCode
			}).then((val) => {
				this.WorkOrderList = val.data
			})
			this.$axios.request(this.$api.getProReportPage, "GET",{
				projectCode:this.projectCode
			}).then((val) => {
				this.ProReport = val.data
			})
			this.$axios.request(this.$api.getcheckBillRes, "GET",{
				projectCode:this.projectCode
			}).then((val) => {
				this.checkBill = val.data
			})

			this.getPmManageRes()
			
		},
		onShow() {
			uni.$on('refresh', (val) => {
				this.page = 1
				this.getPmManageRes()
			})
		},
		methods: {
			//下拉刷新
			onPullDownRefresh() {
				this.page = 1
				this.getPmManageRes()
			},
			//上拉加载
			onReachBottom() {
				if (this.page == 1) {
					return
				}
				if (this.more == 'loadmore') {
					this.getPmManageRes()
				}
			},
			getDiffTime(record) {
				let endTime
				if (record.endTime) {
					endTime = record.endTime
				} else {
					endTime = new Date().getTime()
				}
				return parseInt((new Date(endTime).getTime() - new Date(record.startTime)) / 60 / 1000)
			},
			query() {
				this.tabIdx = ""
				this.page = 1
				this.getPmManageRes()
			},
			showModal(e) {
				this.tabIdx = e.index
			},
			close() {
				this.tabIdx = ""
			},
			reset() {
				this.formData = {}
				this.searchTypeList = [{
					name: '销售订单'
				}, {
					name: '采购订单'
				}, {
					name: '入库明细'
				}, {
					name: '出库明细'
				}, {
					name: '工单明细'
				}, {
					name: '报工明细'
				},
				{
					name: '往来对账明细'
				}]

				this.selectRowKeys = []
				this.page = 1
				this.show = false
				this.getPmManageRes()
			},
			changesaleOrderDetail(e) {
				this.formData.saleOrderDetailId = e.id
				this.searchTypeList[this.tabIdx].name = e.name
			},
			changeworkReport(e) {
				this.formData.createworkReport = e.id
				this.searchTypeList[this.tabIdx].name = e.account
			},

			changeApproval(e) {
				this.formData.approval = e
				this.searchTypeList[this.tabIdx].name = this.approvalList[e]
			},

			changeCheckBox(e) {
				this.selectRowKeys = e
			},
			edit(){
				if(this.selectRowKeys.length !==1){
					this.$msg.toast("请选择一条数据")
					return
				}
				let idx = this.$utils.findArrIndex(this.list,this.selectRowKeys[0])
				this.$axios.request(this.$api.getInv,"GET",{
					id:this.list[idx].invId
				}).then((val) => [
					this.$next(`/pages/mine/invAdd?result=${this.$utils.encryption(val.data)}`)
				])
	
			},
			del(){
				if(this.selectRowKeys.length ==0){
					this.$msg.toast("请选择数据")
					return
				}
				let params = this.formDataParam()
				this.$axios.request(this.$api.delInv,"POST",params).then((val) => {
					this.$msg.toastCallback("操作成功",()=> {
						this.page = 1
						this.getPmManageRes()
					})
				})
				
			},
			approvalErr(){
				if(this.selectRowKeys.length ==0){
					this.$msg.toast("请选择数据")
					return
				}
				let params = this.formDataParam()
				this.$axios.request(this.$api.approvalErrInv,"POST",params).then((val) => {
					this.$msg.toastCallback("操作成功",()=> {
						this.page = 1
						this.getPmManageRes()
					})
				})
			},
			approvalOk(){
				if(this.selectRowKeys.length ==0){
					this.$msg.toast("请选择数据")
					return
				}
				let params = this.formDataParam()
				this.$axios.request(this.$api.approvalOkInv,"POST",params).then((val) => {
					this.$msg.toastCallback("操作成功",()=> {
						this.page = 1
						this.getPmManageRes()
					})
				})
			},
			formDataParam(){
				let arr = new Array()
				this.selectRowKeys.forEach(item => {
					let idx = this.$utils.findArrIndex(this.list,item)
					let res = this.list[idx]
					if(!arr[res.invId]){
						arr[res.invId] = {
							id:res.invId,
							pmManageList:[]
						}
						arr[res.invId].pmManageList.push({
							id:res.id
						})
					}else{
						arr[res.invId].pmManageList.push({
							id:res.id
						})
					}
				})
				return Object.values(arr)
			},
			changeinvDetailList(e) {
				this.formData.invDetailListId = e.id
				this.searchTypeList[this.tabIdx].name = e.name
			},
			changePro(e) {
				let cur = this.$refs.puorOrderDetailRef.selectRows[0]
				this.formData.proId = cur.id
				this.searchTypeList[this.tabIdx].name = cur.name
			},
			getPmManageRes() {
				this.more = 'loading'
				let params = Object.assign(this.formData, {
					current: this.page,
					size: 10,
					sortField: "id",
					sortOrder: "descend",
				})
				this.$axios.request(this.$api.getPmManageRes, "GET", params).then((val) => {
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


			search() {
				this.page = 1
				this.getPmManageRes()
			},
			clear() {
				this.formData.invCode = ""
				this.search()
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.box {
		width: 96%;
		margin: 10px auto;
		margin-top: 35%;


		.item {
			background-color: #ffffff;
			margin-bottom: 20rpx;
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
				.report {
					color: #0081ff;
					font-size: 28rpx;
				}
			}
		}
	}
</style>