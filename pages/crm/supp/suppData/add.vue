<template>
	<view class="container" :style="{minHeight:$height()}">
		<view class="box">
			<u-form labelPosition="right" labelWidth="100" ref="uForm">
				<u-form-item label="编号" borderBottom border>
					<u-input v-model="formData.code" placeholder="不填由系统自动带出" border="none"></u-input>
				</u-form-item>
				<u-form-item label="名称" borderBottom border :required="true">
					<u-input v-model="formData.name" placeholder="请填写名称" border="none"></u-input>
				</u-form-item>
				<u-form-item label="社会统一信用代码" borderBottom border :required="true">
					<u-input v-model="formData.name" placeholder="请填写社会统一信用代码" border="none"></u-input>
				</u-form-item>
				<u-form-item label="所属供应商类型" borderBottom border>
					<u-input v-model="workStepName" readonly placeholder="请选择类型" border="none">
						<template slot="suffix">
							<u-icon name="search" @click="showcusSort" color="#eaeaea" size="24"></u-icon>
						</template>
					</u-input>
				</u-form-item>
				<u-form-item label="联系人" borderBottom border :required="true">
					<u-input v-model="formData.name" placeholder="请填写联系人" border="none"></u-input>
				</u-form-item>
				<u-form-item label="联系电话" borderBottom border :required="true">
					<u-input v-model="formData.name" placeholder="请填写" border="none"></u-input>
				</u-form-item>
				<u-form-item label="简称" borderBottom border :required="true">
					<u-input v-model="formData.name" placeholder="请填写" border="none"></u-input>
				</u-form-item>
				<u-form-item label="拼音码" borderBottom border :required="true">
					<u-input v-model="formData.name" placeholder="请填写" border="none"></u-input>
				</u-form-item>
				<u-form-item label="地址" borderBottom border :required="true">
					<u-input v-model="formData.name" placeholder="请填写" border="none"></u-input>
				</u-form-item>
				<u-form-item label="发票地址" borderBottom border :required="true">
					<u-input v-model="formData.name" placeholder="请填写" ></u-input>
				</u-form-item>
				<u-form-item label="银行账号" borderBottom border :required="true">
					<u-input v-model="formData.name" placeholder="请填写" ></u-input>
				</u-form-item>
				<u-form-item label="邮编" borderBottom border :required="true">
					<u-input v-model="formData.name" placeholder="请填写" ></u-input>
				</u-form-item>
				<u-form-item label="传真" borderBottom border :required="true">
					<u-input v-model="formData.name" placeholder="请填写" ></u-input>
				</u-form-item>
				<u-form-item label="结算周期" borderBottom border :required="true">
					<u-input v-model="formData.name" placeholder="请填写" ></u-input>
				</u-form-item>
				<u-form-item label="税点" borderBottom border :required="true">
					<u-input v-model="formData.name" placeholder="请填写" ></u-input>
				</u-form-item>
				<u-form-item label="备注" border style="margin-bottom:30%;">
					<u-textarea v-model="formData.remark" placeholder="请输入内容"></u-textarea>
				</u-form-item>
			</u-form>

		</view>
		<u-button @click="submit" :customStyle="{width:'80%',position:'fixed',left:'10%',bottom:'20px',zIndex:'999'}"
			type="primary" text="确定"></u-button>
		
		
		
		<u-popup :show="userShow" mode="bottom" @close="() => userShow = false" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto">
					<userModal :value="formData.userId" @change="changeuser" ref="userModalRef" type="checkbox"></userModal>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :customStyle="{width:'80%'}" @click="() => userShow = false" text="确认" ></u-button>
			</view>
		</u-popup>
		
		<u-popup :show="showProModal" mode="bottom" @close="() => showProModal = false" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto" @scrolltolower="() => this.$refs.proList.loadMore()">
					<proListModal ref="proList" type="checkbox"></proListModal>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :customStyle="{width:'80%'}" @click="choosePro" text="确认" ></u-button>
			</view>
		</u-popup>
		
		<u-popup :show="stepShow" mode="bottom" @close="() => stepShow = false" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto">
					<cusSort @change="changeWorkStep" :value="formData.workStepId" ref="cusSortRef" type="checkbox"></cusSort>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :customStyle="{width:'80%'}" @click="() => stepShow = false" text="确认" ></u-button>
			</view>
		</u-popup>
		
		
		
	</view>
</template>

<script>
	import userModal from '@/components/userModal/userModal.vue'
	import cusSort from '@/pages/crm/cus/cusSort/index.vue'
	import proListModal from '@/pages/mes/pro/index.vue'
import { nextTick } from "vue"
	export default {
		data() {
			return {
				workStepName: '',
				stepShow:false,
				userName: '',
				selectRowKeys: [],
				userShow:false,
				showProModal:false,

				proList:[],
				formData: {
					invDetailList: []
				},

				time: uni.$u.date(new Date().getTime(), 'yyyy-mm-dd hh:MM')
			}
		},
		components: {
			userModal,
			cusSort,
			proListModal
		},
		onLoad(options) {
			if(!options.result){
				this.formData = Object.assign(this.formData,options)
			}else{
				this.formData = Object.assign(this.formData,this.$utils.decrypt(options.result))
				this.workStepName = this.formData.workStepName
				this.userName = this.formData.userName
			}
			uni.setNavigationBarTitle({
				title:`${this.formData.id ? '编辑' : '新增'}${this.invDetailType[this.formData.actType]}`
			})
	
		},
		methods: {
			changeWorkStep(e) {
				this.formData.workStepId = e.id
				this.workStepName = e.name
			},
			load(){
				this.formData.startTime = uni.$u.date(new Date().getTime(), 'yyyy-mm-dd 08:30:00')
				this.formData.endTime = uni.$u.date(new Date().getTime(), 'yyyy-mm-dd 17:30:00')
				this.sumWorkTime()
				this.getWorkOrder()
				this.getTaskList()
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
				this.userShow = false
			},
			showuser(){
				this.userShow = true
			},
			showcusSort(){
				this.stepShow = true
			},
			closecusSort() {
				this.stepShow = false
			},
			changeuser(e) {
				this.formData.userId = e.id
				this.userName = e.name
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