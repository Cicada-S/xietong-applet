<template>
	<view class="container" :style="{minHeight:$height()}">
		<view class="box">
			<u-form labelPosition="right" labelWidth="100" ref="uForm">
				<u-form-item label="编码" borderBottom border>
					<u-input v-model="formData.code" placeholder="不填由系统自动带出" border="none"></u-input>
				</u-form-item>
				<u-form-item label="来源单号" borderBottom border :required="true">
					<u-input v-model="workOrder.workOrderNo" readonly placeholder="请扫描派工单" border="none">
						<view slot="suffix" style="display: flex;align-items: center;">
							<u-icon name="scan" @click="scan" color="#2979ff" size="24"></u-icon>
							<u-button type="primary" @click="() => showWorkTaskModal = true" size="mini" text="请选择"></u-button>
						</view>
					</u-input>
				</u-form-item>
				<u-form-item label="工序" borderBottom border :required="true">
					<picker mode="selector" :range="taskList" @change="changeTask" style="width:100%;"
						range-key="title">
						<u-input v-model="taskName" readonly placeholder="请选择工序" border="none">
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
				
				
				
				<dynamicItem :value="formData.extJson" ref="dynamicRef" :association="formData.workStepId" :dynamicList="dynamicList"></dynamicItem>
				

				<u-form-item label="送检数量" borderBottom border >
					<u-input v-model="formData.reportNum"  placeholder="请填写" border="none"></u-input>
				</u-form-item>
				<u-form-item label="合格数量" borderBottom border>
					<u-input v-model="formData.goodNum"  placeholder="请填写" border="none"></u-input>
				</u-form-item>
				<u-form-item label="不合格数量" borderBottom border>
					<u-input v-model="formData.badNum"  placeholder="请填写" border="none"></u-input>
				</u-form-item> 

				<u-form-item label="检验方案" borderBottom border>
					<u-input v-model="formData.testFormula" readonly placeholder="请选择检验方案" border="none">
						<template slot="suffix">
							<u-icon name="search" @click="() => showtestFormula = true" color="#eaeaea" size="24"></u-icon>
						</template>
					</u-input>
				</u-form-item>




				<u-form-item label="不良信息" borderBottom border >
					<view class="king-flex king-flex__column">
						<view class="search-item king-flex" style="width:50%;margin:10rpx 0px;">
							<u-button type="primary" size="small" @click="() => showBadItem = true" text="批量新增"></u-button>
							<u-button type="error" size="small" :customStyle="{marginLeft:'10rpx'}" @click="del" text="删除"></u-button>
						</view>
						<u-table align="left">
							<u-tr>
								<u-th style="width:13%">选择</u-th>
								<u-th style="width:14%">不良名称</u-th>
								<u-th style="width:14%">不良原因</u-th>
								<u-th style="width:14%">不良数量</u-th>
								<u-th style="width:14%">不良等级</u-th>
								<u-th style="width:14%">处理方式</u-th>
								<u-th style="width:13%">备注</u-th>
						
							</u-tr>
							<u-checkbox-group placement="column" @change="changeCheckBox">
								<u-tr v-for="(item,index) in formData.index" :key="index">
									<u-td style="width:13%">
										<u-checkbox :name="item.BadItem" :checked="selectRowKeys.includes(item.BadItem)" ></u-checkbox>
									</u-td>
									<u-td style="width:20%"><input :disabled="true" v-model="item.BadItemName" type="text"></u-td>
									<u-td style="width:20%"><input v-model="item.badreason" type="text"></u-td>
									<u-td style="width:20%"><input v-model="item.badNum" type="text"></u-td>
									<u-td style="width:20%"><input v-model="item.badgrade" type="text"></u-td>
									<u-td style="width:20%"><input v-model="item.badway" type="text"></u-td>
									<u-td style="width:20%"><input v-model="item.remark" type="text"></u-td>
								</u-tr>
							</u-checkbox-group>
						
						</u-table>
					</view>
				</u-form-item>

				<u-form-item label="备注" border style="margin-bottom:30%;">
					<u-textarea v-model="formData.remark" placeholder="请输入内容"></u-textarea>
				</u-form-item>
			</u-form>

		</view>
		<u-button @click="submit" :customStyle="{width:'80%',position:'fixed',left:'10%',bottom:'20px',zIndex:'999'}"type="primary" text="确定"></u-button>
		
		<u-popup :show="showtestFormula" mode="bottom" @close="() => showtestFormula = false" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto" @scrolltolower="() => this.$refs.testFormula.loadMore()">
					<testFormula type="checkbox" ref="testFormula"></testFormula>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :customStyle="{width:'80%'}" @click="choosetestFormula" text="确认" ></u-button>
			</view>
		</u-popup>
		
		
		<u-popup :show="wareHouseShow" mode="bottom" @close="() => wareHouseShow = false" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto">
					<wareHouseModal :value="formData.wareHouseId" @change="changeWareHouse" ref="wareHouseModalRef" type="checkbox"></wareHouseModal>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :customStyle="{width:'80%'}" @click="() => wareHouseShow = false" text="确认" ></u-button>
			</view>
		</u-popup>
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

		
		<u-popup :show="showBadItem" mode="bottom" @close="() => showBadItem = false" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto" @scrolltolower="() => this.$refs.mulBadItem.loadMore()">
					<BadItem ref="mulBadItem" type="checkbox"></BadItem>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :customStyle="{width:'80%'}" @click="chooseBadItem" text="确认" ></u-button>
			</view>
		</u-popup>
		
		<u-popup :show="stepShow" mode="bottom" @close="() => stepShow = false" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto">
					<stepModal @change="changeWorkStep" :value="formData.workStepId" ref="stepModalRef" type="checkbox"></stepModal>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :customStyle="{width:'80%'}" @click="() => stepShow = false" text="确认" ></u-button>
			</view>
		</u-popup>
		
		
		
	</view>
</template>

<script>
	import dynamicItem from '@/components/dynamicItem/dynamicItem.vue'
	import userModal from '@/components/userModal/userModal.vue'
	import workTaskModal from '@/pages/index/taskList.vue'
	import file from "@/components/file/index.vue"
	import wareHouseModal from '@/components/wareHouseModal/wareHouseModal.vue'
	import BadItem from '@/pages/mes/badItem/index.vue'
	import testFormula from '@/pages/test/testFormula/index.vue'
	import stepModal from '@/components/stepModal/stepModal.vue'
	import proListModal from '@/pages/mes/pro/index.vue'
import { nextTick } from "vue"
	export default {
		data() {
			return {
				showUserModal:false,
				showtestFormula:false,
				showWorkTaskModal:false,
				showBadItem:false,
				reportRightIds:"",
				workOrder: {},
				taskList: [],
				showTask: false,
				formData: {

				},
				dynamicList:[],
				mulBadItem: [], //当前工序不良品名字
				taskName: "",
				checkedUserIds: [], //报工用户人
				userList: [], //用户列表
				show: false,
				timeField: "",
				time: uni.$u.date(new Date().getTime(), 'yyyy-mm-dd hh:MM'),
				workStepName: '',
				stepShow:false,
				wareHouseName: '',
				selectRowKeys: [],
				wareHouseShow:false,
				showProModal:false,
				invDetailType: [

				],
				proList:[],
				formData: {
					invDetailList: []
				},

				time: uni.$u.date(new Date().getTime(), 'yyyy-mm-dd hh:MM')
			}
		},
		components: {
			wareHouseModal,
			stepModal,
			proListModal,
			dynamicItem,
			userModal,
			BadItem,
			testFormula,
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
					this.formData.mulBadItem = val.data.mulBadItem
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
					this.taskName = `${task.workStepName}`
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
			
			changeWorkStep(e) {
				this.formData.workStepId = e.id
				this.workStepName = e.name
			},
			chooseBadItem(){
				this.showBadItem = false
				let arr = new Array()
					this.$refs.proList.selectRows.forEach((item,index) => {
						arr.push({
							BadItemName:item.name,
							BadItem:item.id,
							badNum:1,
							remark:"",
							badreason:"",
							badgrade:"",
							badway:""
						})
					})
					this.formData.index = arr
				},
				del(){
					if(this.selectRowKeys.length == 0){
						this.$msg.toast("请选择")
						return
					}
					this.selectRowKeys.forEach((item,index) => {
						let idx = this.formData.index.findIndex(pro => {
							if (pro.BadItem == item) {
								return true;
							}
						})
				
						this.formData.index.splice(idx,1)
					})
			},
			choosePro(){
				this.showProModal = false
				let arr = new Array()
				this.$refs.proList.selectRows.forEach((item,index) => {
					arr.push({
						proName:item.name,
						proId:item.id,
						num:1,
						remark:""
					})
				})
				this.formData.invDetailList = arr
			},
			del(){
				if(this.selectRowKeys.length == 0){
					this.$msg.toast("请选择")
					return
				}
				this.selectRowKeys.forEach((item,index) => {
					let idx = this.formData.invDetailList.findIndex(pro => {
						if (pro.proId == item) {
							return true;
						}
					})
			
					this.formData.invDetailList.splice(idx,1)
				})
			},
			changeCheckBox(e) {
				this.selectRowKeys = e
			},
			close() {
				this.wareHouseShow = false
			},
			showWareHouse(){
				this.wareHouseShow = true
			},
			showStepModal(){
				this.stepShow = true
			},
			closeStepModal() {
				this.stepShow = false
			},
			changeWareHouse(e) {
				this.formData.wareHouseId = e.id
				this.wareHouseName = e.name
			},
			submit() {
				let url = this.$api.addInv
				if(this.formData.id){
					url = this.$api.editInv
				}
				this.$axios.request(url, "POST", this.formData).then((val) => {
					this.$msg.toastCallback("添加成功",() => {
						uni.$emit('refresh')
						this.$nextTick(() => {
							uni.navigateBack()
						})
					})
				})
			},


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
</style>