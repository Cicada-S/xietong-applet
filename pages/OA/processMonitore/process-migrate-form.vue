<template>
	<uni-popup ref="popRef" type="bottom" background-color="transparent" maskBackgroundColor="rgba(0, 0, 0, 0.6)">
		<view class="snowy-shadow snowy-padding">
			<view class="snowy-flex-end">
				<icon type="clear" :size="20" color="#5677fc" @click="close"></icon>
			</view>
			<uni-notice-bar show-icon text="迁移到节点后，将自动迁移到本模型最新版本" />
			<uni-forms ref="formRef" :model="formData" label-position="top" labelWidth="auto">
				<uni-forms-item label="迁移到节点后" name="targetActivityId" :required="true" :rules="[{ required: true, errorMessage: '请选择要迁移的节点后' }]">
					<snowy-sel-picker  @update="update" :model-value="formData.targetActivityId" @getOptData="getTargetActivityIdList" placeholder="请选择要迁移的节点后" />
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
					targetActivityId:''
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
					this.$axios.request('/flwapp/flw/process/monitor/migrate', "POST", {
						...this.formData
					}).then((res) => {
						this.$refs.popRef.close()
						this.$emit('successful')
					})
				})
			},
			close() {
				this.$refs.popRef.close()
			},
			update(e) {
				this.formData.targetActivityId = e
			},
		}
	}
</script>
<style lang="scss" scoped>
</style>