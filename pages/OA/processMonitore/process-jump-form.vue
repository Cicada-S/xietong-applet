<template>
	<uni-popup ref="popRef" type="bottom" background-color="transparent" maskBackgroundColor="rgba(0, 0, 0, 0.6)">
		<view class="snowy-shadow snowy-padding">
			<view class="snowy-flex-end">
				<icon type="clear" :size="20" color="#5677fc" @click="close"></icon>
			</view>
			<uni-forms ref="formRef" :model="formData" label-position="top" labelWidth="auto">
				<uni-forms-item label="节点" name="targetActivityId" :required="true"
					:rules="[{ required: true, errorMessage: '请选择要跳转的节点' }]">
					<snowy-sel-picker @update="e => formData.targetActivityId = e" :model-value="formData.targetActivityId" @getOptData="getTargetActivityIdList"
						placeholder="请选择要跳转的节点" />
				</uni-forms-item>
			</uni-forms>
			<tui-button height="90rpx" type="primary" @click="submit">确认</tui-button>
		</view>
	</uni-popup>
</template>
<script>
	export default {
		data() {
			return {
				formData: {
					targetActivityId:'',
					id:''
				},
			}
		},
		methods: {
			onOpen(record) {
				this.$refs.popRef.open()
				this.formData.id = record.id
			},
			async getTargetActivityIdList(param, callback) {
				const parameter = {
					id: this.formData.id
				}
				this.$axios.request('/flwapp/flw/process/monitor/getCanJumpNodeInfoList', "GET", {
					...parameter
				}).then((res) => {
					callback({
						state: 'success',
						data: res.data?.map((m) => {
							return {
								label: m.name,
								key: m.id
							}
						})
					})
				})
			},
			submit() {
				this.$refs.formRef.validate().then(res => {
					this.$axios.request('/flwapp/flw/process/monitor/jump', "POST", {
						...this.formData
					}).then((res) => {
						this.$refs.popRef.close()
						this.$emit('successful')
					})
				})
			},
			close() {
				this.$refs.popRef.close()
			}
		}
	}
</script>
<style lang="scss" scoped>
</style>