<template>
	<view class="container" :style="{minHeight:$height()}">
		<image class="mine-bg" src="@/static/img/mine-bg.png" mode="widthFix"></image>
		<view class="mine-box">
			<view class="message" @click="$next(`/pages/mine/messageList`)">
				<u-badge max="99" :value="unReadCount"></u-badge>
				<image class="message-icon" src="@/static/img/message.png" mode="widthFix"></image>
			</view>
			<view class="king-flex__center king-flex__column userinfo">
				<image class="avatar" src="@/static/logo.png"></image>
				<text class="nickname">
					{{userinfo.account}}
				</text>
				<text class="post">
					{{userinfo.positionName}}
				</text>
			</view>
		</view>

		<view class="func" style="position: relative;">
			<view class="items" style="justify-content: space-around;">
				<view class="item king-align__center king-flex__column"
					style="width:49%;border-right:1px solid #eaeaea;" @click="$next(`/pages/index/workReportList`)">
					<image src="@/static/img/work-order.png"></image>
					<text>工单报工记录</text>
				</view>
				<view class="item king-align__center king-flex__column" style="width:49%;"
					@click="$next(`/pages/index/proReportList`)">
					<image src="@/static/img/pro.png"></image>
					<text>产品报工记录</text>
				</view>

			</view>

		</view>
		<view class="func"
			v-if="$utils.hasMenu(['/biz/procureDetailIn','/biz/backStockDetailIn','/biz/backGoodsDetailIn','/biz/arriveStockDetailIn','/biz/allocateDetailIn','/biz/finishedDetailIn','/biz/otherDetailIn'])">
			<view class="title">入库管理</view>
			<view class="items">
				<view v-if="$utils.hasMenu('/biz/procureDetailIn')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/mine/invDetailList?type=1&actType=0`)">
					<image src="@/static/img/procure-icon.png"></image>
					<text>采购入库</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/backStockDetailIn')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/mine/invDetailList?type=1&actType=1`)">
					<image src="@/static/img/back-stock-icon.png"></image>
					<text>退料入库</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/backGoodsDetailIn')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/mine/invDetailList?type=1&actType=2`)">
					<image src="@/static/img/back-goods-icon.png"></image>
					<text>退货入库</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/arriveStockDetailIn')"
					class="item king-align__center king-flex__column"
					@click="$next(`/pages/mine/invDetailList?type=1&actType=3`)">
					<image src="@/static/img/arrive-stock-icon.png"></image>
					<text>到料入库</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/allocateDetailIn')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/mine/invDetailList?type=1&actType=4`)">
					<image src="@/static/img/allocate-icon.png"></image>
					<text>调拨入库</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/finishedDetailIn')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/mine/invDetailList?type=1&actType=5`)">
					<image src="@/static/img/finished-icon.png"></image>
					<text>完工入库</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/otherDetailIn')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/mine/invDetailList?type=1&actType=6`)">
					<image src="@/static/img/other-icon.png"></image>
					<text>其它入库</text>
				</view>


			</view>

		</view>
		<view class="func"
			v-if="$utils.hasMenu(['/biz/deliverGoodsOut','/biz/backGoodsDetailOut','/biz/pickingDetailOut','/biz/otherDetailOut'])">
			<view class="title">出库管理</view>
			<view class="items">
				<view v-if="$utils.hasMenu('/biz/deliverGoodsOut')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/mine/invDetailList?type=0&actType=7`)">
					<image src="@/static/img/work-order.png"></image>
					<text>发货出库</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/backGoodsDetailOut')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/mine/invDetailList?type=0&actType=8`)">
					<image src="@/static/img/back-stock-icon.png"></image>
					<text>退货出库</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/pickingDetailOut')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/mine/invDetailList?type=0&actType=9`)">
					<image src="@/static/img/picking-icon.png"></image>
					<text>领料出库</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/otherDetailOut')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/mine/invDetailList?type=0&actType=10`)">
					<image src="@/static/img/other-icon.png"></image>
					<text>其它出库</text>
				</view>

			</view>

		</view>
		<view class="func" v-if="$utils.hasMenu(['/biz/badItem','/biz/unit','/biz/workStep','/biz/workRoute','/biz/proType','/biz/pro'])">
			<view class="title">基础管理</view>
			<view class="items">
				<view v-if="$utils.hasMenu('/biz/badItem')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/mes/badItem/index`)">
					<image src="@/static/img/bad-icon.png"></image>
					<text>不良品项</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/unit')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/mes/unit/index`)">
					<image src="@/static/img/unit-icon.png"></image>
					<text>计量单位</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/workStep')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/mes/workStep/index`)">
					<image src="@/static/img/work-order-icon.png"></image>
					<text>工序管理</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/workRoute')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/mes/workRoute/index`)">
					<image src="@/static/img/work-route-icon.png"></image>
					<text>工艺路线</text>
				</view>	
				<view v-if="$utils.hasMenu('/biz/groupStep')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/mes/groupStep/index`)">
					<image src="@/static/img/work-group-icon.png"></image>
					<text>组合工序</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/pro')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/mes/pro/index`)">
					<image src="@/static/img/pro.png"></image>
					<text>产品管理</text>
				</view>
				
			</view>
		
		</view>
		<view class="func" v-if="$utils.hasMenu(['/biz/proPlan','/biz/proPlanCategory','/biz/workOrder','/biz/workTask'])">
			<view class="title">生产管理</view>
			<view class="items">
				<view v-if="$utils.hasMenu('/biz/proPlan')" class="item king-align__center king-flex__column" @click="$next(`/pages/mes/proPlan/index`)">
					<image src="@/static/img/bad-icon.png"></image>
					<text>生产计划</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/proPlanCategory')" class="item king-align__center king-flex__column" @click="$next(`/pages/mes/proPlanCategory/index`)">
					<image src="@/static/img/bad-icon.png"></image>
					<text>计划分类</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/workOrder')" class="item king-align__center king-flex__column" @click="$next(`/pages/mes/workOrder/index`)">
					<image src="@/static/img/bad-icon.png"></image>
					<text>生产工单</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/workTask')" class="item king-align__center king-flex__column" @click="$next(`/pages/mes/workTask/index`)">
					<image src="@/static/img/bad-icon.png"></image>
					<text>生产任务</text>
				</view>
			</view>
		
		</view>
		
		<view class="func" v-if="$utils.hasMenu(['/biz/cusSort','/biz/cusInfor','/biz/suppSort','/biz/suppData'])">
			<view class="title">CRM管理</view>
			<view class="items">
				<view v-if="$utils.hasMenu('/biz/cusSort')" class="item king-align__center king-flex__column" @click="$next(`/pages/crm/cus/cusSort/index`)">
					<image src="@/static/crm/1.png"></image>
					<text>客户分类</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/cusInfor')" class="item king-align__center king-flex__column" @click="$next(`/pages/crm/cus/cusInfor/index`)">
					<image src="@/static/crm/2.png"></image>
					<text>客户信息</text>
				</view>
			    <view v-if="$utils.hasMenu('/biz/suppSort')" class="item king-align__center king-flex__column" @click="$next(`/pages/crm/supp/suppSort/index`)">
					<image src="@/static/crm/3.png"></image>
					<text>供应商分类</text>
			    </view>
				<view v-if="$utils.hasMenu('/biz/suppData')" class="item king-align__center king-flex__column" @click="$next(`/pages/crm/supp/suppData/index`)">
					<image src="@/static/crm/4.png"></image>
					<text>供应商信息</text>
				</view>
			</view>
		
		</view>
		<view class="func" v-if="$utils.hasMenu(['/biz/saleOrderDetail','/biz/puorOrderDetail','/biz/checkBill','/biz/pmManage','/biz/costType','/biz/costRecords','/biz/costReport'])">
			<view class="title">销采成本一体</view>
			<view class="items">
				<view v-if="$utils.hasMenu('/biz/saleOrderDetail')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/sale/saleOrderDetail/index?type=0`)">
					<image src="@/static/xiaoshou/6.png"></image>
					<text>销售订单</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/puorOrderDetail')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/sale/saleOrderDetail/index?type=1`)">
					<image src="@/static/xiaoshou/7.png"></image>
					<text>采购订单</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/checkBill')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/sale/checkBill/index`)">
					<image src="@/static/xiaoshou/5.png"></image>
					<text>往来对账</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/pmManage')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/sale/pmManage/index`)">
					<image src="@/static/xiaoshou/1.png"></image>
					<text>PM闭环管理</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/costType')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/sale/cost/costType/index`)">
					<image src="@/static/xiaoshou/4.png"></image>
					<text>成本类型</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/costRecords')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/sale/cost/costRecords/index`)">
					<image src="@/static/xiaoshou/3.png"></image>
					<text>成本分析</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/costReport')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/sale/cost/costReport/index`)">
					<image src="@/static/xiaoshou/2.png"></image>
					<text>成本分析报表</text>
				</view>
			</view>
		
		</view>
		
		<view class="func" v-if="$utils.hasMenu(['/biz/execpTtype','/biz/execptReport','/biz/execptRecords'])">
			<view class="title">敏捷呼叫</view>
			<view class="items">
				<view v-if="$utils.hasMenu('/biz/execpTtype')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/mes/execptType/index`)">
					<image src="@/static/img/report_type.png"></image>
					<text>上报类型</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/execptReport')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/mes/execptReport/index`)">
					<image src="@/static/img/report-user.png"></image>
					<text>上报人管理</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/execptRecords')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/mine/execptRecordsList`)">
					<image src="@/static/img/execpt-icon.png"></image>
					<text>异常记录</text>
				</view>
			</view>

		</view>
		<view class="func" v-if="$utils.hasMenu(['/biz/badQuality','/biz/proQuality','/biz/testStandard',
		'/biz/testInstrument','/biz/testType','/biz/testItem','/biz/testFormula','/biz/testStepFirst','/biz/testStepLast',
		'/biz/testStepLoop','/biz/testInvOut','/biz/testInvIn'])">
			<view class="title">质量管理</view>
			<view class="items">
				<view v-if="$utils.hasMenu('/biz/badQuality')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/mes/badQuality/index`)">
					<image src="@/static/zhiliang/1.png"></image>
					<text>不良溯源</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/proQuality')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/mes/quality/index`)">
					<image src="@/static/zhiliang/11.png"></image>
					<text>产品质量追溯</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/testStandard')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/test/testStandard/index`)">
					<image src="@/static/zhiliang/3.png"></image>
					<text>检验标准</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/testInstrument')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/test/testInstrument/index`)">
					<image src="@/static/zhiliang/10.png"></image>
					<text>检验仪器</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/testType')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/test/testType/index`)">
					<image src="@/static/zhiliang/4.png"></image>
					<text>检验项目类型</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/testItem')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/test/testItem/index`)">
					<image src="@/static/zhiliang/6.png"></image>
					<text>检验项目</text>
				</view>
                <view v-if="$utils.hasMenu('/biz/testFormula')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/test/testFormula/index`)">
					<image src="@/static/zhiliang/8.png"></image>
					<text>检验方案</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/testStepFirst')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/test/testStepFirst/index`)">
					<image src="@/static/zhiliang/7.png"></image>
					<text>工序首检</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/testStepLast')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/test/testStepLast/index`)">
					<image src="@/static/zhiliang/8.png"></image>
					<text>工序末检</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/testStepLoop')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/test/testStepLoop/index`)">
					<image src="@/static/zhiliang/12.png"></image>
					<text>工序巡检</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/testInvOut')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/test/testInvOut/index`)">
					<image src="@/static/zhiliang/2.png"></image>
					<text>出库检</text>
				</view>
				<view v-if="$utils.hasMenu('/biz/testInvIn')" class="item king-align__center king-flex__column"
					@click="$next(`/pages/test/testInvIn/index`)">
					<image src="@/static/zhiliang/9.png"></image>
					<text>入库检</text>
				</view>

			</view>
		
		</view>
		<view class="func">
			<view class="title">我的设置</view>
			<view class="items">
				<button class="item king-align__center u-reset-button  king-flex__column" @click="callPhone"
					style="margin:0px;">
					<image src="@/static/img/custom.png"></image>
					<text>客服中心</text>
				</button>
				<view class="item king-align__center  king-flex__column" @click="$msg.toast('开发中')">
					<image src="@/static/img/setting.png"></image>
					<text>设置</text>
				</view>
				<view class="item king-align__center king-flex__column" @click="logout">
					<image src="@/static/img/exit.png"></image>
					<text>退出</text>
				</view>

			</view>

		</view>

		<u-modal :show="show" :showCancelButton="true" @cancel="cancel" @confirm="confirm" @close="close"
			cancelText="再等等" confirmText="立即处理" :closeOnClickOverlay="true" :content="content" title="紧急提醒"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo: {},
				unReadCount: 0,
				show: false,
				content: ""
			}
		},
		onLoad() {

		},
		onShow() {
			this.getLoginUser()

			this.$axios.request(this.$api.getUnReadList, "GET").then((val) => {
				this.unReadCount = val.data.length
				if (val.data.length > 0) {
					if (new Date().getTime() >= uni.getStorageSync("messageModal") || !uni.getStorageSync("messageModal")) {
						this.content = `您有${val.data.length}条异常消息通知，请您及时处理`
						this.show = true
						//十分钟弹窗一次
						uni.setStorageSync("messageModal", new Date().getTime() + 600 * 1000)
					}

				}
			})




		},
		methods: {
			getLoginUser() {
				this.$axios.request(this.$api.getLoginUser, "GET").then((val) => {
					this.userinfo = val.data
					uni.setStorageSync("buttonCodeList", val.data.buttonCodeList)
					uni.setStorageSync("role",val.data.roleCodeList)
				})
			},
			logout() {
				uni.removeStorageSync("token")
				uni.reLaunch({
					url: `/pages/mine/login`
				})
			},
			callPhone() {
				uni.makePhoneCall({
					phoneNumber: "18556901315"
				})
			},
			cancel() {
				this.close()
			},
			confirm() {
				this.close()
				this.$next(`/pages/mine/execptRecordsList`)
			},
			close() {
				this.show = false
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #f5f7fb;
	}

	.mine-bg {
		width: 100%;
		position: absolute;
		top: 0;
	}

	.message {
		position: relative;
		width: 60rpx;
		right: -630rpx;

		.message-icon {
			width: 50rpx;
		}

		.u-badge {
			position: absolute;
			top: -3px;
			right: -13px;
		}
	}

	.func {
		width: 96%;
		margin: 0px auto;
		padding: 2%;

		.title {
			font-size: 31rpx;
			font-weight: bold;
			color: #101010;
			margin: 20rpx auto;
		}

		.items {
			padding-top: 30rpx;
			background-color: #FFFFFF;
			border-radius: 8px;
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;

			.item {
				width: 25%;
				margin-bottom: 30rpx;

				image {
					width: 107rpx;
					height: 107rpx;
				}

				text {
					font-size: 26rpx;
					color: #636363;
					margin-top: 18rpx;
				}
			}

		}

	}

	.mine-box {
		padding: 20rpx;
		align-items: center;
		position: relative;

		.avatar {
			width: 120rpx;
			height: 120rpx;
			border: 2px solid #FFFFFF;
			border-radius: 50%;
		}



		.nickname {
			font-size: 36rpx;
			font-weight: 500;
			line-height: 35rpx;
			margin: 10rpx auto;
			color: #FFFFFF;
		}

		.post {
			font-size: 26rpx;
			font-weight: 400;
			// line-height: 42rpx;
			margin-top: 6rpx;
			color: #FFFFFF;
		}

	}

	.u-modal__content {
		padding: 12px 25px 15px 25px !important;
	}
</style>