<template>
	<view class="container" :style="{minHeight:$height()}">
		<view class="box">
			<u-form labelPosition="right" labelWidth="100" ref="uForm">
				
				<u-form-item label="名称" borderBottom border :required="true">
					<u-input v-model="formData.name" placeholder="请填写名称" border="none"></u-input>
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
				title:`${this.formData.id ? '编辑' : '新增'}不良品项`
			})
	
		},
		methods: {
			
			submit(){
				let url = this.$api.addBadItem
				if(this.formData.id){
					url = this.$api.editBadItem
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
