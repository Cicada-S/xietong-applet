<template>
	<view class="container" :style="{minHeight:$height()}">
		<image class="execpt-banner" src="@/static/img/execpt.png" mode="widthFix"></image>
		<view class="report-box">
			<u-form labelPosition="top" labelWidth="100" ref="uForm">
				<u-form-item label="异常类型:" borderBottom border :required="true">

					<u-radio-group v-model="formData.execptId" placement="row">
						<view v-for="(item,index) in execptReportList" :key="index" class="king-flex king-flex__column" style="width: 100%;">
							<view class="execpt-title">车间</view>
							<view class="king-flex" style="flex-wrap: wrap;">
								<u-radio shape="circle" v-for="(item1,index1) in item.reportList" :key="index1"
									:customStyle="{marginRight: '16px',marginBottom: '16px'}" :label="item1.name"
									:name="item1.id">
								</u-radio>

							</view>

						</view>

					</u-radio-group>

				</u-form-item>

				<u-form-item label="选择岗位:" borderBottom border>
					<picker mode="selector" :range="workStepList" range-key="name" @change="changeWorkStep">
						<u-input v-model="workStepName" readonly placeholder="请选择任务工序" border="none">
							<view slot="suffix">
								<u-button type="primary" size="mini" text="请选择"></u-button>
							</view>
						</u-input>
					</picker>
				</u-form-item>

			</u-form>
		</view>
		<u-button :customStyle="{width:'80%',position:'fixed',left:'10%',bottom:'10px',zIndex:'999'}" type="primary"
			text="点击上报" @click="submit"></u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				workStepList: [],
				workStepName: "",
				formData: {},
				execptReportList: []
			}
		},
		onShow() {
			this.getWorkStepList()
			this.$axios.request(this.$api.getExecptReportList, "GET").then((val) => {
				let arr = new Array()
				for (let key in val.data) {
					arr.push({
						execptTypeName: key,
						reportList: val.data[key]
					})
				}
				this.execptReportList = arr
			})
		},
		methods: {
			getWorkStepList() {
				this.$axios.request(this.$api.getWorkStepList, "GET").then((val) => {
					this.workStepList = val.data
				})
			},
			submit(){
				
				if(!this.formData.execptId){
					this.$msg.toast("请选择异常类型")
					return
				}
				this.$axios.request(this.$api.addExecptRecords,"POST",this.formData).then((val) => {
					uni.showModal({
						showCancel:false,
						title:"友情提示",
						confirmText:"关闭",
						content:"上报成功,请等待相关人员处理"
						
					})
				})
			},
			changeWorkStep(e) {
				let value = e.detail.value
				this.workStepName = this.workStepList[value].name
				this.formData.workStepId = this.workStepList[value].id
			}
		}
	}
</script>

<style lang="scss">
	.execpt-banner {
		width: 100%;
	}

	.report-box {
		padding: 3%;
		padding-bottom: 100px;

		.execpt-title {
			margin: 20rpx 0px;
			width: 100%;
		}

		.u-form-item__body__left {
			font-weight: bold;
		}
	}

	.u-radio-group {
		flex-wrap: wrap;
	}
</style>