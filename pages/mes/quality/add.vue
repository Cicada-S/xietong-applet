<template>
	<view class="container" :style="{minHeight:$height()}">
		<view class="box">
			<u-form labelPosition="right" labelWidth="130" ref="uForm">
				
				<u-form-item label="批次码" borderBottom border :required="true">
					<u-input v-model="formData.name" readonly placeholder="请扫描批次码" border="none">
						<view slot="suffix" style="display: flex;align-items: center;">
							<u-icon name="scan" @click="scan" color="#2979ff" size="24"></u-icon>
							</view>
					</u-input>
				</u-form-item>
				<u-form-item label="SN码" borderBottom border :required="true">
					<u-input v-model="formData.name" readonly placeholder="请输入SN码" border="none">
					</u-input>
				</u-form-item>
				<u-form-item label="工位" borderBottom border :required="true">
					<picker mode="selector" :range="taskList" @change="changeTask" style="width:100%;"range-key="title">
					<u-input v-model="formData.taskName" readonly placeholder="请选择工位" border="none">
						<view slot="suffix">
							<u-button type="primary" size="mini" text="请选择"></u-button>
						</view>
					</u-input>
				</picker>
				</u-form-item>
				<u-form-item label="附件" border style="margin-bottom:30%;">
					<upload @upload="upload" :value="formData.reportFile"></upload>
				</u-form-item>
				<u-form-item label="备注" border style="margin-bottom:30%;">
					<u-textarea v-model="formData.remark" placeholder="请输入内容"></u-textarea>
				</u-form-item>

			</u-form>
		</view>
		<u-button @click="submit" :customStyle="{width:'80%',position:'fixed',left:'10%',bottom:'20px',zIndex:'999'}" type="primary" text="确定"></u-button>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData:{}
			}
		},

		onLoad(options) {
			if(options.result){
				this.formData = this.$utils.decrypt(options.result)
			}
			uni.setNavigationBarTitle({
				title:`${this.formData.id ? '编辑' : '新增'}产品质量检测`
			})
	
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
			
			submit(){
				let url = this.$api.addProQuality
				if(this.formData.id){
					url = this.$api.editProQuality
				}
				this.$axios.request(url, "POST", this.formData).then((val) => {
					this.$msg.toastCallback("操作成功",() => {
						this.$backRefresh()
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
</style>
