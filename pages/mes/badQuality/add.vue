<template>
	<view class="container" :style="{minHeight:$height()}">
		<view class="box">
			<u-form labelPosition="right" labelWidth="100" ref="uForm">

				<u-form-item label="工单编码" borderBottom border :required="true">
					<u-input v-model="formData.workOrderNo" readonly placeholder="请扫描工单码" border="none">
						<view slot="suffix" style="display: flex;align-items: center;">
							<u-icon name="scan" @click="scan" color="#2979ff" size="24"></u-icon>
							<u-button type="primary" @click="() => showWorkOrderModal = true" size="mini"
								text="请选择"></u-button>
						</view>
					</u-input>

				</u-form-item>
				<u-form-item label="项目号" borderBottom border :required="true">
					<u-input v-model="formData.proPlanCode" placeholder="请填写项目号" readonly border="none"></u-input>
				</u-form-item>
				<u-form-item label="产品编码" borderBottom border>
					<u-input v-model="formData.proCode" placeholder="请填写产品编码" readonly border="none"></u-input>
				</u-form-item>
				<u-form-item label="工序" borderBottom border :required="true">
					<u-input v-model="formData.workStepName" readonly placeholder="请选择工序" border="none">
						<view slot="suffix">
							<u-button type="primary" size="mini" @click="() => this.$refs.tree._show()"
								text="请选择"></u-button>
						</view>
					</u-input>

				</u-form-item>

				<tree ref="tree" :range="stepList" :multiple="true" rangeKey="workStepName" @confirm="confirmTree"
					confirmColor="#4e8af7" />
				<u-form-item label="不良品名称" borderBottom border>
					<u-input v-model="formData.badName" readonly placeholder="请选择不良品项" border="none">
						<view slot="suffix">
							<u-button type="primary" size="mini" @click="() => showBadItemModal = true" text="请选择"></u-button>
						</view>
					</u-input>
				</u-form-item>
				<u-form-item label="不良品数" borderBottom border>
					<u-input v-model="formData.num" type="number" placeholder="请填写" border="none"></u-input>
				</u-form-item>
				<u-form-item label="附件" border style="margin-bottom:30%;">
					<upload @upload="upload" :value="formData.attachment"></upload>
				</u-form-item>
				<u-form-item label="问题描述" border style="margin-bottom:30%;">
					<u-textarea v-model="formData.question" placeholder="请输入问题描述"></u-textarea>
				</u-form-item>
				<u-form-item label="备注" border style="margin-bottom:30%;">
					<u-textarea v-model="formData.remark" placeholder="请输入内容"></u-textarea>
				</u-form-item>
			</u-form>

		</view>

		<u-button @click="submit" :customStyle="{width:'80%',position:'fixed',left:'10%',bottom:'20px',zIndex:'999'}"
			type="primary" text="确定"></u-button>

		<u-popup :show="showWorkOrderModal" mode="bottom" @close="() => showWorkOrderModal = false" round="10"
			:closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto"
					@scrolltolower="() => this.$refs.workOrderModalRef.loadMore()">
					<workOrderModal type="radio" :value="formData.workOrderId" ref="workOrderModalRef"></workOrderModal>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :customStyle="{width:'80%'}" @click="chooseWorkOrder" text="确认"></u-button>
			</view>
		</u-popup>
		
		<u-popup :show="showBadItemModal" mode="bottom" @close="() => showBadItemModal = false" round="10"
			:closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto" @scrolltolower="() => this.$refs.badItemModalRef.loadMore()">
					<badItem ref="badItemModalRef"></badItem>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :customStyle="{width:'80%'}" @click="chooseBadItem" text="确认"></u-button>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import workOrderModal from '@/pages/mes/workOrder/index.vue'
	import badItem from '@/pages/mes/badItem/index.vue'
	import upload from "@/components/upload/upload.vue"
	import tree from "@/components/tree/tree.vue"
	export default {
		data() {
			return {
				showWorkOrderModal: false,
				showBadItemModal: false,
				formData: {
					badNum: 0,
					workStepName:""
				},
				stepList: [],
				show: false
			}
		},
		components: {
			workOrderModal,
			tree,
			badItem,
			upload
		},
		onLoad(options) {
			if(options.result){
				this.formData = this.$utils.decrypt(options.result)
			}
			uni.setNavigationBarTitle({
				title:`${this.formData.id ? '编辑' : '新增'}不良溯源`
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
			load() {
				this.$axios.request(this.$api.getWorkOrder, "GET", {
					id: this.formData.workOrderId
				}).then((val) => {
					this.formData.workOrderId = val.data.id,
					this.formData.workOrderNo = val.data.workOrderNo,
					this.formData.proId = val.data.proId,
					this.formData.proPlanCode = val.data.proPlanCode,
					this.formData.proName = val.data.proName,
					this.formData.proCode = val.data.proCode,
					this.formData.badNum = 0
					this.listByWorkOrderIdOrAllStep(val.data.id)
				})
			},
			upload(e){
				this.formData.attachment = e
			},
			chooseWorkOrder() {
				if (this.$refs.workOrderModalRef.selectRows.length > 0) {
					let workOrder = this.$refs.workOrderModalRef.selectRows[0]
					this.formData.workOrderId = workOrder.id
					this.formData.workOrderNo = workOrder.workOrderNo
					this.load()
				}
				this.showWorkOrderModal = false
			},
			chooseBadItem(){
				if (this.$refs.badItemModalRef.selectRows.length > 0) {
					let list = new Array()
					this.$refs.badItemModalRef.selectRows.forEach((item,index) => {
						list.push(item.name)
					})
					this.formData.badName = list.join(",")
				}
				this.showBadItemModal = false
			},
			confirmTree(e) {
				if (e.length > 0) {
					let workStepNameList = new Array()
					let workStepIdList = new Array()
					e.forEach((item, index) => {
						workStepNameList.push(item.source.workStepName)
						workStepIdList.push(item.source.workStepId)
					})
					this.formData.workStepId = workStepIdList.join(",")
					this.formData.workStepName = workStepNameList.join(",")
				} else {
					this.formData.workStepName = ""
					this.formData.workStepId = ""
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
			submit() {

				let url = this.$api.addBadQuality
				if (this.formData.id) {
					url = this.$api.editBadQuality
				}
				this.$axios.request(url, "POST", this.formData).then((val) => {
					this.$msg.toastCallback("提报成功", () => {
						uni.$emit('refresh')
						this.$nextTick(() => {
							uni.navigateBack()
						})
					})

				})
			},

			close() {
				this.show = false
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

	.u-checkbox-group {
		flex-wrap: wrap;
	}
</style>