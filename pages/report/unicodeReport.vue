<template>
	<view class="container" :style="{minHeight:$height()}">
		<view class="box">
			<u-notice-bar text="友情提示:统一码报工只适用于工单指定了工序或者绑定工艺路线" bgColor="#2979ff" color="#FFFFFF"></u-notice-bar>
			<u-form labelPosition="right" labelWidth="150" ref="uForm">

				<u-form-item label="计划单号" borderBottom border :required="true">
					<u-input v-model="formData.proPlanCode" readonly placeholder="请扫码计划单号" border="none">
						<view slot="suffix" style="display: flex;align-items: center;">
							<u-icon name="scan" @click="scan" color="#2979ff" size="24"></u-icon>
						</view>
					</u-input>

				</u-form-item>

				<view class="info" style="padding-left:40rpx;" v-if="formData.id">

					<u-form-item label="工单号" borderBottom border>
						<u-input v-model="formData.workOrderNo" readonly border="none" />
					</u-form-item>
					<u-form-item label="产品名称" borderBottom border>
						<u-input v-model="formData.proName" readonly border="none" />
					</u-form-item>
					<u-form-item label="产品编码" borderBottom border="none">
						<u-input v-model="formData.proCode" readonly border="none" />
					</u-form-item>
					<view class="step-item" v-for="(item1,index1) in formData.workTaskList" :key="index1">
						<u-form-item labelPosition="top" :label="item1.workStepName" borderBottom border>
							<u-input v-model="item1.plaNum" placeholder="请填写良品数" border="none">
								<view slot="prefix">
									<u-tag text="良品数:" plain size="mini" type="primary"></u-tag>
								</view>
							</u-input>

						</u-form-item>
						<u-form-item labelPosition="top" label="报工人员" borderBottom border>
							<u-input v-model="item1.reportRightName" placeholder="请选择报工人员" border="none">
								<view slot="suffix">
									<u-tag text="选择" @click="doShowUserModal(item1)" plain size="mini" type="primary"></u-tag>
								</view>
							</u-input>

						</u-form-item>
						<u-form-item labelPosition="top" label="工价" borderBottom border>
							<u-input :value="`${item1.unitPrice||0} X ${item1.plaNum||0} = ${((item1.unitPrice*item1.plaNum) || 0).toFixed(2)}`" readonly placeholder="0.00" border="none">
								<view slot="prefix" style="font-weight: bold;color:red;">
									您将获得
								</view>
								<view slot="suffix"  style="font-weight: bold;color:red;">
									元
								</view>
							</u-input>
						
						</u-form-item>
					</view>

				</view>

			</u-form>

		</view>

		<u-popup :show="showUserModal" v-if="showUserModal" mode="bottom" @close="() => showUserModal = false"
			round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto"
					@scrolltolower="() => this.$refs.userModalRef.loadMore()">
					<userModal :value="formData.productionUser" type="checkbox" :idList="reportRightIds"
						ref="userModalRef"></userModal>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :customStyle="{width:'80%'}" @click="chooseUser" text="确认"></u-button>
			</view>
		</u-popup>

		<u-button @click="submit" :customStyle="{width:'80%',position:'fixed',left:'10%',bottom:'20px',zIndex:'999'}"
			type="primary" text="点击报工"></u-button>

	</view>
</template>

<script>
	import userModal from '@/components/userModal/userModal.vue'
	export default {
		data() {
			return {
				showUserModal: false,
				cur: {},
				formData: {

				},
			}
		},
		components: {
			userModal
		},
		methods: {

			scan() {
				uni.scanCode({
					scanType: ["qrCode", "barCode"],
					success: (res) => {
						this.formData.id = res.result
						this.load()

					},
					fail: (res) => {
						this.$msg.toast("扫码失败")
					},
				})
			},
			doShowUserModal(e) {
				this.cur = e
				this.showUserModal = true
			},
			load() {
				this.$axios.request(this.$api.getWorkOrder, "GET", {
					id: this.formData.id
				}).then((val) => {
					this.formData = val.data
				})

			},
			chooseUser() {
				let ids = new Array()
				let nameArr = new Array()
				this.$refs.userModalRef.selectRows.forEach((item, index) => {
					ids.push(item.id)
					nameArr.push(item.account)
				})
				this.cur.reportRightName = nameArr.join(",")
				this.cur.reportRight = ids.join(",")
				this.showUserModal = false
			},
			sumWorkTime(startTime, endTime) {
				let start = new Date(startTime).getTime()
				let end = new Date(endTime).getTime()
				return Math.floor((end - start) / 60000)
			},
			submit() {
				let startTime = uni.$u.date(new Date().getTime(), 'yyyy-mm-dd 08:30:00')
				let endTime = uni.$u.date(new Date().getTime(), 'yyyy-mm-dd 17:30:00')
				let workTime = this.sumWorkTime(startTime, endTime)
				let arr = new Array()
				this.formData.workTaskList.forEach((item1, index1) => {
					arr.push({
						proPlanCode: this.formData.proPlanCode,
						workOrderId: this.formData.id,
						taskId: item1.id,
						workStepId: item1.workStepId,
						proId: this.formData.proId,
						type: 0,
						productionUser: item1.reportRight,
						reportNum: item1.plaNum,
						goodNum: item1.plaNum,
						startTime: startTime,
						endTime: endTime,
						workTime: workTime,
						badDetailList: []
					})
				})

				this.$axios.request(this.$api.workReportBatchAdd, "POST", arr).then((val) => {
					this.$msg.toastCallback("报工成功", () => {
						if (this.formData.id) {
							uni.$emit('reload')
							this.$nextTick(() => {
								uni.navigateBack()
							})
						}

					})

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		padding: 20px;
		padding-bottom: 100px;
	}

	.submit {
		.u-button {
			margin-top: 20px;
		}
	}

	.u-checkbox-group {
		flex-wrap: wrap;
	}

	.step-item {
		padding: 10rpx;
		padding-left: 40rpx;
		border-left: 2px solid #2979ff;
		border-top: 2px solid #2979ff;
		border-right: 2px solid #2979ff;
	}

	.step-item:last-child {
		border-bottom: 2px solid #2979ff;
	}
</style>