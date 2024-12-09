<template>
	<view class="container" :style="{minHeight:$height()}">
		<view class="box">
			<u-form labelPosition="right" labelWidth="100" ref="uForm">
				<u-form-item label="设备名称" prop="deviceId" borderBottom border>
					<u-input readonly v-model="device.name" placeholder="请填写设备名称" border="none"></u-input>
				</u-form-item>
				<u-form-item label="工序名称" borderBottom border>
					<u-input v-model="device.workStepName" placeholder="请填写工序名称" readonly border="none"></u-input>
				</u-form-item>
				<u-form-item label="派工单号" prop="deviceId" borderBottom border>
					<u-input v-model="workOrder.workOrderNo" placeholder="请扫描派工单" readonly border="none">
						<template slot="suffix">
							<u-icon name="scan" @click="scan" color="#2979ff" size="28"></u-icon>
						</template>
					</u-input>
				</u-form-item>
				<u-form-item label="产品编码" prop="deviceId" borderBottom border>
					<u-input v-model="workOrder.proCode" placeholder="请填写产品编码" readonly border="none"></u-input>
				</u-form-item>
				<u-form-item label="产品名称" borderBottom border>
					<u-input v-model="workOrder.proName" placeholder="请填写产品名称" readonly border="none"></u-input>
				</u-form-item>
				<u-form-item label="工艺路线" borderBottom border>
					<u-input v-model="workOrder.workRouteName" placeholder="请填写工艺路线" readonly border="none"></u-input>
				</u-form-item>
				<u-form-item label="计划数量" borderBottom border>
					<u-input v-model="workOrder.plaNum" placeholder="请填写计划数量" readonly border="none"
						type="number"></u-input>
				</u-form-item>
				<u-form-item label="组队报工" prop="deviceId" borderBottom border>
					<u-checkbox-group v-model="checkedUserIds" placement="column">
						<u-checkbox :customStyle="{marginBottom: '8px'}" v-for="(item, index) in userList"
							:key="index" :label="item.name" :name="item.id">
						</u-checkbox>
					</u-checkbox-group>
				</u-form-item>

			</u-form>
			<u-button type="primary" @click="startTask" text="设备开工"></u-button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gatherUuid: "",
				workOrderId: "",
				workOrder: {},
				device: {}, //设备详情
				workStepList: [], //工序列表
				checkedUserIds: [],//报工用户人
				userList:[],//用户列表
			}
		},
		onLoad(options) {
			this.gatherUuid = options.gatherUuid
			//获取设备信息
			this.getDevice()
		},
		methods: {
			//获取工单信息
			getWorkOrder() {
				this.$axios.request(this.$api.getWorkOrder, "GET", {
					id: this.workOrderId
				}).then((val) => {
					this.workOrder = val.data
				})
			},
			getDevice() {
				this.$axios.request(this.$api.getDevice, "GET", {
					gatherUuid: this.gatherUuid
				}).then((val) => {
					this.device = val.data
					this.getWorkStep()
				})
			},
			getWorkStep(){
				this.$axios.request(this.$api.getWorkStep, "GET",{
					id:this.device.workStepId
				}).then((val) => {
					this.userList = val.data.reportRightList
				})
			},
			startTask(){
				this.$axios.request(this.$api.scanEwmStartTask,"POST",{
					workOrderId:this.workOrderId,
					ws:this.gatherUuid,
					reportRight:this.checkedUserIds.join(";")
				}).then((val) => {
					this.$msg.toastSwitch("任务开启成功",`/pages/index/index`)
				})
			},
			scan() {
				uni.scanCode({
					scanType: ["qrCode", "barCode"],
					success: (res) => {
						this.workOrderId = res.result
						this.getWorkOrder()
					},
					fail: (res) => {
						this.$msg.toast("扫码失败")
					},
				})
			}
		}
	}
</script>

<style lang="scss">
	.box {
		padding: 20px;
	}

	.u-button {
		margin-top: 20px;
	}
</style>