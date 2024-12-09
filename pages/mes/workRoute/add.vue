<template>
	<view class="container" :style="{minHeight:$height()}">
		<view class="box">
			<u-form labelPosition="right" labelWidth="100" ref="uForm">
				<u-form-item label="名称" borderBottom border :required="true">
					<u-input v-model="formData.name" placeholder="请填写工艺路线名称" border="none"></u-input>
				</u-form-item>
				<u-form-item label="工序" borderBottom border :required="true">
					<u-input v-model="formData.workStepName" readonly placeholder="请选择工序" border="none">
						<template slot="suffix">
							<u-icon name="search" @click="() => showWorkStepModal = true" color="#eaeaea" size="24"></u-icon>
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
		
		<u-popup :show="showWorkStepModal" mode="bottom" @close="() => showWorkStepModal = false" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto" @scrolltolower="() => this.$refs.workStepModalRef.loadMore()">
					<workStepModal type="checkbox" ref="workStepModalRef"></workStepModal>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :customStyle="{width:'80%'}" @click="chooseWorkStep" text="确认" ></u-button>
			</view>
		</u-popup>
		
		
		
	</view>
</template>

<script>
	import workStepModal from "@/pages/mes/workStep/index.vue"
	
	export default {
		data() {
			return {
				formData:{},
				showWorkStepModal:false,

			}
		},
		components:{
			workStepModal,

		},
		onLoad(options) {
			if(options.result){
				this.formData = this.$utils.decrypt(options.result)
			}
			uni.setNavigationBarTitle({
				title:`${this.formData.id ? '编辑' : '新增'}工艺路线`
			})
	
		},
		methods: {
			
			submit(){
				let url = this.$api.addWorkRoute
				if(this.formData.id){
					url = this.$api.editWorkRoute
				}
				this.$axios.request(url, "POST", this.formData).then((val) => {
					this.$msg.toastCallback("操作成功",() => {
						this.$backRefresh()
					})
				})
			},
			chooseWorkStep(){
				if(this.$refs.workStepModalRef.selectRows.length > 0){
					let arr = new Array()
					let id = new Array()
					this.$refs.workStepModalRef.selectRows.forEach((item,index) => {
						arr.push(item.name)
						id.push(item.id)
					})
					this.formData.workStepName = arr.join(",")
					this.formData.workStepId = id.join(",")
				}else{
					this.formData.workStep = ""
				}
				this.showWorkStepModal = false
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
