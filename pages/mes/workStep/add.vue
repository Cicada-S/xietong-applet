<template>
	<view class="container" :style="{minHeight:$height()}">
		<view class="box">
			<u-form labelPosition="right" labelWidth="100" ref="uForm">
				<u-form-item label="编码" borderBottom border>
					<u-input v-model="formData.code" placeholder="不填由系统自动带出" border="none"></u-input>
				</u-form-item>
				<u-form-item label="名称" borderBottom border :required="true">
					<u-input v-model="formData.name" placeholder="请填写名称" border="none"></u-input>
				</u-form-item>
				
				<u-form-item label="加工类型" borderBottom border>
					<u-radio-group v-model="formData.processingType" placement="row">
						<u-radio name="0" label="自制"></u-radio>
						<u-radio name="1" label="委外" :customStyle="{marginLeft:'10rpx'}"></u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="不良品项" borderBottom border>
					<u-input v-model="formData.mulBadItem" readonly placeholder="请选择不良品项" border="none">
						<template slot="suffix">
							<u-icon name="search" @click="() => showBadItemModal = true" color="#eaeaea" size="24"></u-icon>
						</template>
					</u-input>
				</u-form-item>
				<u-form-item label="负责人" borderBottom border>
					<u-input v-model="formData.manageRightName" readonly placeholder="请选择负责人" border="none">
						<template slot="suffix">
							<u-icon name="search" @click="() => showManageModal = true" color="#eaeaea" size="24"></u-icon>
						</template>
					</u-input>
				</u-form-item>
				<u-form-item label="报工权限" borderBottom border>
					<u-input v-model="formData.reportRightName" readonly placeholder="请选择报工权限" border="none">
						<template slot="suffix">
							<u-icon name="search" @click="() => showReportModal = true" color="#eaeaea" size="24"></u-icon>
						</template>
					</u-input>
				</u-form-item>
				<u-form-item label="排序" borderBottom border>
					<u-input v-model="formData.sortCode" placeholder="请输入排序" border="none" type="number"></u-input>
				</u-form-item>
	
				<u-form-item label="备注" border style="margin-bottom:30%;">
					<u-textarea v-model="formData.remark" placeholder="请输入内容"></u-textarea>
				</u-form-item>
			</u-form>
	
		</view>
		<u-button @click="submit" :customStyle="{width:'80%',position:'fixed',left:'10%',bottom:'20px',zIndex:'999'}" type="primary" text="确定"></u-button>
		
		<u-popup :show="showBadItemModal" mode="bottom" @close="() => showBadItemModal = false" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto" @scrolltolower="() => this.$refs.badItemModalRef.loadMore()">
					<badItemModal type="checkbox" ref="badItemModalRef"></badItemModal>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :customStyle="{width:'80%'}" @click="chooseBadItem" text="确认" ></u-button>
			</view>
		</u-popup>
		
		<u-popup :show="showManageModal" mode="bottom" @close="() => showManageModal = false" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto" @scrolltolower="() => this.$refs.manageModalRef.loadMore()">
					<userModal type="checkbox" :value="formData.manageRight" ref="manageModalRef"></userModal>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :customStyle="{width:'80%'}" @click="chooseManage" text="确认" ></u-button>
			</view>
		</u-popup>
		<u-popup :show="showReportModal" mode="bottom" @close="() => showReportModal = false" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto" @scrolltolower="() => this.$refs.reportModalRef.loadMore()">
					<userModal type="checkbox" :value="formData.reportRight" ref="reportModalRef"></userModal>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :customStyle="{width:'80%'}" @click="chooseReport" text="确认" ></u-button>
			</view>
		</u-popup>
		
		
	</view>
</template>

<script>
	import badItemModal from "@/pages/mes/badItem/index.vue"
	import userModal from '@/components/userModal/userModal.vue'
	export default {
		data() {
			return {
				
				formData:{},
				showBadItemModal:false,
				showManageModal:false,
				showReportModal:false,
				selectedOption: ''
				
			}
		},
		components:{
			badItemModal,
			userModal,
		},
		onLoad(options) {
			if(options.result){
				this.formData = this.$utils.decrypt(options.result)
			}
			uni.setNavigationBarTitle({
				title:`${this.formData.id ? '编辑' : '新增'}工序`
			})
	
		},
		methods: {
			radioChange(e) {
			      this.selectedOption = e.detail.value;
			      console.log(this.selectedOption);
			    },
			submit(){
				let url = this.$api.addWorkStep
				if(this.formData.id){
					url = this.$api.editWorkStep
				}
				this.$axios.request(url, "POST", this.formData).then((val) => {
					this.$msg.toastCallback("操作成功",() => {
						this.$backRefresh()
					})
				})
			},
			chooseBadItem(){
				if(this.$refs.badItemModalRef.selectRows.length > 0){
					let arr = new Array()
					this.$refs.badItemModalRef.selectRows.forEach((item,index) => {
						arr.push(item.name)
					})
					this.formData.mulBadItem = arr.join(",")
				}else{
					this.formData.mulBadItem = ""
				}
				this.showBadItemModal = false
			},
			chooseManage(){
				if(this.$refs.manageModalRef.selectRows.length > 0){
					let nameArr = new Array()
					let idArr = new Array()
					this.$refs.manageModalRef.selectRows.forEach((item,index) => {
						nameArr.push(item.account)
						idArr.push(item.id)
					})
					this.formData.manageRightName = nameArr.join(",")
					this.formData.manageRight = idArr.join(",")
				}else{
					this.formData.manageRightName = ""
					this.formData.manageRight = ""
				}
				this.showManageModal = false
			},
			chooseReport(){
				if(this.$refs.reportModalRef.selectRows.length > 0){
					let nameArr = new Array()
					let idArr = new Array()
					this.$refs.reportModalRef.selectRows.forEach((item,index) => {
						nameArr.push(item.account)
						idArr.push(item.id)
					})
					this.formData.reportRightName = nameArr.join(",")
					this.formData.reportRight = idArr.join(",")
				}else{
					this.formData.reportRightName = ""
					this.formData.reportRight = ""
				}
				this.showReportModal = false
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
</style>
