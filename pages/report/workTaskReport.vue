<template>
	<view class="container" :style="{minHeight:$height()}">
		<view class="box">
			<u-form labelPosition="right" labelWidth="130" ref="uForm">
				<u-form-item label="工单编号" borderBottom border :required="true">
					<u-input v-model="workOrder.workOrderNo" readonly placeholder="请扫描派工单" border="none">
						<view slot="suffix" style="display: flex;align-items: center;">
							<u-icon name="scan" @click="scan" color="#2979ff" size="24"></u-icon>
							<u-button type="primary" @click="() => showWorkTaskModal = true" size="mini" text="请选择"></u-button>
						</view>
					</u-input>
				</u-form-item>
				<u-form-item label="任务工序" borderBottom border :required="true">
					<picker mode="selector" :range="taskList" @change="changeTask" style="width:100%;"
						range-key="title">
						<u-input v-model="taskName" readonly placeholder="请选择任务工序" border="none">
							<view slot="suffix">
								<u-button type="primary" size="mini" text="请选择"></u-button>
							</view>
						</u-input>
					</picker>

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
				<u-form-item label="工艺要求" borderBottom border v-if="formData.taskRemark">
					<u-input v-model="formData.taskRemark" readonly border="none"></u-input>
				</u-form-item>
				
				<u-form-item label="产品附件" borderBottom border v-if="formData.proImage">
					<file :urlList="formData.proImage"></file>
				</u-form-item>
				
				
				<dynamicItem :value="formData.extJson" ref="dynamicRef" :association="formData.workStepId" :dynamicList="dynamicList"></dynamicItem>
				<u-form-item label="报工质检" borderBottom border>
					<u-radio-group v-model="formData.testType" placement="row">
						<u-radio name="0" label="工序首检"></u-radio>
						<u-radio name="1" label="工序末检" :customStyle="{marginLeft:'40rpx'}"></u-radio>
					</u-radio-group>
				</u-form-item>
				<!-- <u-form-item label="报工数量" borderBottom border :required="true">
					<u-input v-model="formData.reportNum" readonly type="number" placeholder="请填写" border="none"></u-input>
				</u-form-item> -->
				<u-form-item label="报工数量(良品)" borderBottom border :required="true">
					<u-input v-model="formData.goodNum" type="number" placeholder="请填写" @change="change" border="none"></u-input>
				</u-form-item>
				<!-- <u-form-item label="不良品数" borderBottom border>
					<u-input v-model="formData.badNum" type="number" readonly @change="change" placeholder="请填写" border="none"></u-input>
				</u-form-item> -->
				
				<view v-if="mulBadItem.length > 0">
					<u-form-item borderBottom border v-for="(item,index) in mulBadItem" :key="index">
						<u-input type="number" @change="changeBad" border="none" v-model="item.num">
							<template slot="prefix">
								<u-button type="primary" size="mini" :text="`${item.name}数量：`"></u-button>
							</template>
						</u-input>
					</u-form-item>
				</view>
				<u-form-item label="组队报工" prop="deviceId" borderBottom border>
					<u-input v-model="formData.productionUserText" readonly placeholder="请选择报工人员" border="none">
						<view slot="suffix" style="display: flex;align-items: center;">
							<u-button type="primary" @click="() => showUserModal = true" size="mini" text="请选择"></u-button>
						</view>
					</u-input>
				</u-form-item>
				<u-form-item label="开始时间" borderBottom border :required="true">
					<u-input readonly v-model="formData.startTime" placeholder="请选择开始时间" border="none">
						<view slot="suffix">
							<u-button type="primary" @click="chooseTime('startTime')" size="mini" text="请选择"></u-button>
						</view>
					</u-input>
				</u-form-item>
				<u-form-item label="结束时间" borderBottom border :required="true">
					<u-input readonly v-model="formData.endTime" placeholder="请选择结束时间" border="none">
						<view slot="suffix">
							<u-button type="primary" @click="chooseTime('endTime')" size="mini" text="请选择"></u-button>
						</view>
					</u-input>
				</u-form-item>
				
				<u-form-item label="工时" borderBottom border>
					<u-input readonly v-model="formData.workTime" placeholder="请填写工时" border="none">
						<view slot="suffix">
							<text>分钟</text>
						</view>
					</u-input>
				</u-form-item>
				<u-form-item label="工价" borderBottom border>
					<u-input :value="`${formData.unitPrice||0} X ${formData.goodNum||0} = ${((formData.unitPrice*formData.goodNum) || 0).toFixed(2)}`" readonly placeholder="0.00" border="none">
						<view slot="prefix" style="font-weight: bold;color:red;">
							您将获得
						</view>
						<view slot="suffix"  style="font-weight: bold;color:red;">
							元
						</view>
					</u-input>
				</u-form-item>
				<u-form-item label="备注" border style="margin-bottom:30%;">
					<u-textarea v-model="formData.remarks" placeholder="请输入内容"></u-textarea>
				</u-form-item>
			</u-form>

		</view>
		<u-button @click="submit" :customStyle="{width:'80%',position:'fixed',left:'10%',bottom:'20px',zIndex:'999'}" type="primary" text="点击报工"></u-button>
		<u-datetime-picker :show="show" v-model="time" mode="datetime" @close="closeTime" @confirm="confirmTime"></u-datetime-picker>
		<u-popup :show="showUserModal" v-if="showUserModal" mode="bottom" @close="() => showUserModal = false" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto" @scrolltolower="() => this.$refs.userModalRef.loadMore()">
					<userModal :value="formData.productionUser" type="checkbox" :idList="reportRightIds" ref="userModalRef"></userModal>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :customStyle="{width:'80%'}" @click="chooseUser" text="确认" ></u-button>
			</view>
		</u-popup>
		
		<u-popup :show="showWorkTaskModal" mode="bottom" @close="() => showWorkTaskModal = false" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto" @scrolltolower="() => this.$refs.workTaskModalRef.loadMore()">
					<workTaskModal type="radio" ref="workTaskModalRef"></workTaskModal>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :customStyle="{width:'80%'}" @click="chooseWorkTask" text="确认" ></u-button>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import dynamicItem from '@/components/dynamicItem/dynamicItem.vue'
	import userModal from '@/components/userModal/userModal.vue'
	import workTaskModal from '@/pages/index/taskList.vue'
	import file from "@/components/file/index.vue"
	export default {
		data() {
			return {
				showUserModal:false,
				showWorkTaskModal:false,
				reportRightIds:"",
				workOrder: {},
				taskList: [],
				showTask: false,
				formData: {
					goodNum: 0,
					reportNum: 0,
					badNum: 0,
				},
				dynamicList:[],
				mulBadItem: [], //当前工序不良品名字
				taskName: "",
				checkedUserIds: [], //报工用户人
				userList: [], //用户列表
				show: false,
				timeField: "",
				time: uni.$u.date(new Date().getTime(), 'yyyy-mm-dd hh:MM')
			}
		},
		components: {
			dynamicItem,
			userModal,
			workTaskModal,
			file
		},
		onLoad() {
			this.$axios.request(this.$api.getWorkReportDynamic,"GET").then((val) => {
				this.dynamicList = val.data
			})
		},
		methods: {
			scan() {
				uni.scanCode({
					scanType: ["qrCode", "barCode"],
					success: (res) => {
						this.formData.workOrderId = res.result
						this.load()
					},
					fail: (res) => {
						this.$msg.toast("扫码失败")
					},
				})
			},
			load(){
				this.formData.startTime = uni.$u.date(new Date().getTime(), 'yyyy-mm-dd 08:30:00')
				this.formData.endTime = uni.$u.date(new Date().getTime(), 'yyyy-mm-dd 17:30:00')
				this.sumWorkTime()
				this.getWorkOrder()
				this.getTaskList()
			},
			chooseTime(field) {
				this.timeField = field
				this.show = true
			},
			closeTime() {
				this.show = false
			},
			confirmTime(e) {
				this.show = false
				this.$set(this.formData, this.timeField, uni.$u.date(e.value, 'yyyy-mm-dd hh:MM:ss'))
				this.sumWorkTime()
			},
			sumWorkTime(){
				if (this.formData.startTime && this.formData.endTime) {
					let start = new Date(this.formData.startTime).getTime()
					let end = new Date(this.formData.endTime).getTime()
					this.formData.workTime = Math.floor((end - start) / 60000)
				}
			},
			chooseWorkTask(){
				if(this.$refs.workTaskModalRef.selectRows.length > 0){
					let task = this.$refs.workTaskModalRef.selectRows[0]
					this.formData.workOrderId = task.workOrderId
					this.formData.taskId = task.id
					this.load()
				}
				this.showWorkTaskModal = false
			},
			chooseUser(){
				let ids = new Array()
				let nameArr = new Array()
				this.$refs.userModalRef.selectRows.forEach((item,index) => {
					ids.push(item.id)
					nameArr.push(item.account)
				})
				this.formData.productionUserText = nameArr.join(",")
				this.formData.productionUser = ids.join(",")
				this.showUserModal = false
			},
			submit() {
				if(this.formData.reportNum == 0){
					this.$msg.toast("请填写报工数量或不良品数量")
					return
				}
				this.formData.badDetailList = this.mulBadItem
				this.formData.extJson = JSON.stringify(this.$refs.dynamicRef.extJson,true)
				this.$axios.request(this.$api.workReportAdd, "POST", this.formData).then((val) => {
					this.$msg.toastCallback("报工成功", () => {
						var obj = {
							goodNum: 0,
							badNum: 0,
							reportNum: 0,
							extJson:{}
						}
						this.formData = Object.assign(this.formData, obj)

						this.mulBadItem.forEach((item, index) => {
							item.num = 0
						})

					})

				})
			},
			//获取工单信息
			getWorkOrder() {
				this.$axios.request(this.$api.getWorkOrder, "GET", {
					id: this.formData.workOrderId
				}).then((val) => {
					this.workOrder = val.data
					this.formData.proPlanCode = val.data.proPlanCode
					this.formData.proId = val.data.proId
					this.formData.proImage = val.data.proImage
					this.formData.goodNum = val.data.plaNum
					this.formData.reportNum = val.data.plaNum
				})
			},
			
			close() {
				this.show = false
			},
			closeTask() {
				this.showTask = false
			},
			change() {
				this.formData.reportNum = parseInt(this.formData.goodNum || 0) + parseInt(this.formData.badNum || 0)
			},
			changeBad() {
				let total = 0
				this.mulBadItem.forEach((item, index) => {
					let num = item.num || 0
					total += parseInt(num)
				})
				this.formData.badNum = total
				this.change()
			},
			changeTask(e) {
				let value = e.detail.value
				if (this.taskList[value]) {
					let task = this.taskList[value]
					this.formData.taskId = task.id
					this.formData.taskRemark = task.remark
					
					if(!this.formData.id){
						this.formData.productionUserText = task.reportRightName
						this.formData.productionUser = task.reportRight
					}
			
					this.formData.workStepId = task.workStepId
					this.formData.unitPrice = task.unitPrice
					this.taskName = `${task.workStepName}【顺序：${task.sortNum}】【执行中】`
					if (task.mulBadItem) {
						let arr = new Array()
						task.mulBadItem.split(',').forEach((item, index) => {
							arr.push({
								name: item,
								num: 0
							})
						})
						this.mulBadItem = arr
						this.changeBad()
					}
					if(task.reportRight){
					    this.reportRightIds = task.reportRight
					}
				}

				this.closeTask()
			},
			getTaskList() {
				this.$axios.request(this.$api.getTaskList, "GET", {
					workOrderId: this.formData.workOrderId
				}).then((val) => {
					val.data.forEach((item, index) => {
						let status = item.status
						let statusText = ""
						if (status == 0) {
							statusText = "未开始"
						} else if (status == 1) {
							statusText = "执行中"
						} else if (status == 2) {
							statusText = "已结束"
						} else if (status == 3) {
							statusText = "已取消"
						}
						item.title = `${item.workStepName}【顺序：${item.sortNum}】【${statusText}】`
					})
					this.taskList = val.data
					
					
					//处理选择逻辑
					if (this.formData.taskId) {
						let index = this.$utils.findArrIndex(val.data, this.formData.taskId)
						let e = {
							detail:{
								value:index
							}
						}
						this.changeTask(e)
						
					}
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.box {
		padding: 20px;
		padding-bottom:100px;
	}

	.submit {
		.u-button {
			margin-top: 20px;
		}
	}
</style>