<template>
	<view class="container" :style="{minHeight:$height()}">
		<view class="box">
			<u-form labelPosition="right" labelWidth="100" ref="uForm">
				<u-form-item label="名称" borderBottom border :required="true">
					<u-input v-model="formData.name" placeholder="请填写名称" border="none"></u-input>
				</u-form-item>
				<u-form-item label="异常类型" borderBottom border>
					<u-input v-model="formData.mulexecptType" readonly placeholder="请选择异常类型" border="none">
						<template slot="suffix">
							<u-icon name="search" @click="() => showexecptTypeModal = true" color="#eaeaea" size="24"></u-icon>
						</template>
					</u-input>
				</u-form-item>
				<u-form-item label="一级上报时长" borderBottom border :required="true">
					<u-input v-model="formData.name" placeholder="请填写一级上报时长" border="none"></u-input>
				</u-form-item>
				<u-form-item label="上报人" borderBottom border>
					<u-input v-model="formData.manageRightName" readonly placeholder="请选择上报人" border="none">
						<template slot="suffix">
							<u-icon name="search" @click="() => showManageModal = true" color="#eaeaea" size="24"></u-icon>
						</template>
					</u-input>
				</u-form-item>
				<u-form-item label="二级上报时长" borderBottom border :required="true">
					<u-input v-model="formData.name" placeholder="请填写二级上报时长" border="none"></u-input>
				</u-form-item>
				<u-form-item label="上报人" borderBottom border>
					<u-input v-model="formData.manageRightName" readonly placeholder="请选择上报人" border="none">
						<template slot="suffix">
							<u-icon name="search" @click="() => showManageModal = true" color="#eaeaea" size="24"></u-icon>
						</template>
					</u-input>
				</u-form-item>
				<u-form-item label="三级上报时长" borderBottom border :required="true">
					<u-input v-model="formData.name" placeholder="请填写三级上报时长" border="none"></u-input>
				</u-form-item>
				<u-form-item label="上报人" borderBottom border>
					<u-input v-model="formData.manageRightName" readonly placeholder="请选择上报人" border="none">
						<template slot="suffix">
							<u-icon name="search" @click="() => showManageModal = true" color="#eaeaea" size="24"></u-icon>
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
		
		<u-popup :show="showexecptTypeModal" mode="bottom" @close="() => showexecptTypeModal = false" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto" @scrolltolower="() => this.$refs.execptTypeModalRef.loadMore()">
					<execptTypeModal type="checkbox" ref="execptTypeModalRef"></execptTypeModal>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :customStyle="{width:'80%'}" @click="chooseexecptType" text="确认" ></u-button>
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
	import execptTypeModal from "@/pages/mes/execptType/index.vue"
	import userModal from '@/components/userModal/userModal.vue'
	export default {
		data() {
			return {
				formData:{},
				showexecptTypeModal:false,
				showManageModal:false,
				showReportModal:false
			}
		},
		components:{
			execptTypeModal,
			userModal
		},
		onLoad(options) {
			if(options.result){
				this.formData = this.$utils.decrypt(options.result)
			}
			uni.setNavigationBarTitle({
				title:`${this.formData.id ? '编辑' : '新增'}上报人`
			})
	
		},
		methods: {
			
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
			chooseexecptType(){
				if(this.$refs.execptTypeModalRef.selectRows.length > 0){
					let arr = new Array()
					this.$refs.execptTypeModalRef.selectRows.forEach((item,index) => {
						arr.push(item.name)
					})
					this.formData.mulexecptType = arr.join(",")
				}else{
					this.formData.mulexecptType = ""
				}
				this.showexecptTypeModal = false
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
