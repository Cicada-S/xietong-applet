<template>
	<view class="container" :style="{minHeight:$height()}">
		<view class="box">
			<u-form labelPosition="right" labelWidth="130" ref="uForm">
				
				<u-form-item label="产品" borderBottom border :required="true">
					<u-input v-model="formData.proName" readonly placeholder="请选择产品" border="none">
						<view slot="suffix" style="display: flex;align-items: center;">
							<u-icon name="scan" @click="scan" color="#2979ff" size="24"></u-icon>
							<u-button type="primary" @click="() => showWorkOrderModal = true" size="mini" text="请选择"></u-button>
						</view>
					</u-input>

				</u-form-item>
				<u-form-item label="项目号" borderBottom border :required="true">
					<u-input v-model="formData.proPlanCode" placeholder="请填写项目号" readonly border="none"></u-input>
				</u-form-item>
				<u-form-item label="产品编码" borderBottom border>
					<u-input v-model="formData.proCode" placeholder="请填写产品编码" readonly border="none"></u-input>
				</u-form-item>

				<u-form-item label="工艺路线" borderBottom border>
					<u-input v-model="formData.workRouteName" placeholder="请填写工艺路线" readonly border="none"></u-input>
				</u-form-item>

				<u-form-item label="工序" borderBottom border :required="true">
					<u-input v-model="formData.workStepName" readonly placeholder="请选择工序" border="none">
						<view slot="suffix">
							<u-button type="primary" size="mini" @click="() => this.$refs.tree._show()" text="请选择"></u-button>
						</view>
					</u-input>

				</u-form-item>
				<u-form-item label="工艺要求" borderBottom border v-if="formData.taskRemark">
					<u-input v-model="formData.taskRemark" readonly border="none"></u-input>
				</u-form-item>
				
				<u-form-item label="产品附件" borderBottom border v-if="formData.proImage">
					<file :urlList="formData.proImage"></file>
				</u-form-item>
				
				
				<tree ref="tree" :range="stepList" :multiple="false" rangeKey="workStepName" @confirm="confirmTree" confirmColor="#4e8af7" />
				
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
					<u-input v-model="formData.badNum" type="number" readonly placeholder="请填写" border="none"></u-input>
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
				<u-form-item label="附件" border style="margin-bottom:30%;">
					<upload @upload="upload" :value="formData.reportFile"></upload>
				</u-form-item>
				<u-form-item label="备注" border style="margin-bottom:30%;">
					<u-textarea v-model="formData.remark" placeholder="请输入内容"></u-textarea>
				</u-form-item>
			</u-form>

		</view>
		
		<u-button @click="submit" :customStyle="{width:'80%',position:'fixed',left:'10%',bottom:'20px',zIndex:'999'}" type="primary" text="点击报工"></u-button>
		<u-datetime-picker :show="show" v-model="time" mode="datetime" @close="closeTime" @confirm="confirmTime"></u-datetime-picker>
		
		<u-popup :show="showWorkOrderModal" mode="bottom" @close="() => showWorkOrderModal = false" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto" @scrolltolower="() => this.$refs.workOrderModalRef.loadMore()">
					<workOrderModal type="radio" :value="formData.workOrderId" ref="workOrderModalRef"></workOrderModal>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :customStyle="{width:'80%'}" @click="chooseWorkOrder" text="确认" ></u-button>
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
		
		
	</view>
</template>

<script>
	import workOrderModal from '@/pages/mes/workOrder/index.vue'
	import dynamicItem from '@/components/dynamicItem/dynamicItem.vue'
	import userModal from '@/components/userModal/userModal.vue'
	import tree from "@/components/tree/tree.vue"
	import file from "@/components/file/index.vue"
	import upload from "@/components/upload/upload.vue"
	export default {
		data() {
			return {
				showWorkOrderModal:false,
				showUserModal:false,
				reportRightIds:"",
				showTask: false,
				formData: {
					goodNum: 0,
					reportNum: 0,
					badNum: 0
				},
				mulBadItem: [], //当前工序不良品名字
				userList: [], //用户列表
				stepList: [],
				dynamicList: [],
				show: false,
				timeField: "",
				time: uni.$u.date(new Date().getTime(), 'yyyy-mm-dd hh:MM')
			}
		},
		components: {
			workOrderModal,
			dynamicItem,
			userModal,
			tree,
			file,
			upload
		},
		onLoad(options) {
			if (options.id) {
				this.$axios.request(this.$api.getProReport, "GET", {
					id: options.id
				}).then((val) => {
					this.mulBadItem = val.data.badDetailList
					this.formData = val.data
					this.listByWorkOrderIdOrAllStep(val.data.workOrderId)
					
				})
			}
			this.$axios.request(this.$api.getWorkReportDynamic,"GET").then((val) => {
				this.dynamicList = val.data
			})
		},
		onShow() {
	
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
			upload(e){
				this.formData.reportFile = e
			},
			load(){
				this.$axios.request(this.$api.getWorkOrder,"GET",{
					id:this.formData.workOrderId
				}).then((val) => {
					let params = {
						goodNum: 0,
						reportNum: 0,
						badNum: 0
					}
					this.formData = Object.assign(params,{
						workOrderId:val.data.id,
						proId:val.data.proId,
						proPlanCode:val.data.proPlanCode,
						proName:val.data.proName,
						proCode:val.data.proCode,
						proImage:val.data.proImage,
						workRouteName:val.data.workRouteName,
						startTime:uni.$u.date(new Date().getTime(), 'yyyy-mm-dd 08:30:00'),
						endTime:uni.$u.date(new Date().getTime(), 'yyyy-mm-dd 17:30:00')
					})
					this.sumWorkTime()
					this.listByWorkOrderIdOrAllStep(val.data.id)
				})
			},
			chooseWorkOrder(){
				if(this.$refs.workOrderModalRef.selectRows.length > 0){
					let workOrder = this.$refs.workOrderModalRef.selectRows[0]
					this.formData.workOrderId = workOrder.id
					this.load()
				}
				this.showWorkOrderModal = false
			},
			confirmTree(e){
				if(e.length > 0){
					let item = e[0].source
					this.formData.workStepName = item.workStepName
					this.formData.taskRemark = item.remark || ""
					this.formData.unitPrice = item.unitPrice || 0
					this.formData.workStepId = item.workStepId
					this.formData.taskId = item.id == item.workStepId ? "" : item.id
					
					this.mulBadItem = new Array()
					if(item.mulBadItem){
						item.mulBadItem.split(',').forEach((item1,index1) => {
							this.mulBadItem.push({
								name:item1,
								num:0
							})
						})
					}
					
					this.reportRightIds = item.reportRight
					
				}else{
					this.formData.workStepName = ""
					this.formData.taskRemark = ""
					this.formData.unitPrice = 0
					this.formData.workStepId = ""
					this.formData.taskId = ""
					this.reportRightIds = new Array()
				}
			},
			listByWorkOrderIdOrAllStep(workOrderId) {
				this.$axios.request(this.$api.listByWorkOrderIdOrAllStep, "GET", {
					workOrderId: workOrderId
				}).then((val) => {
					val.data.forEach((item, index) => {
						item.title = `${item.workStepName}`
					})
					this.stepList = val.data
				})
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
				
				if (this.formData.reportNum == 0) {
					this.$msg.toast("请填写报工数量或不良品数量")
					return
				}
				this.formData.badDetailList = this.mulBadItem
				
				let url = this.$api.proReportAdd
				if (this.formData.id) {
					url = this.$api.proReportEdit
				}
				this.formData.extJson = JSON.stringify(this.$refs.dynamicRef.extJson,true)
				this.$axios.request(url, "POST", this.formData).then((val) => {
					this.$msg.toastCallback("报工成功", () => {
						if (this.formData.id) {
							uni.$emit('reload')
							this.$nextTick(() => {
								uni.navigateBack()
							})
						}
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

	.u-checkbox-group {
		flex-wrap: wrap;
	}
</style>