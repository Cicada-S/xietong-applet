<template>
	<uni-popup ref="popRef" type="bottom" background-color="transparent" maskBackgroundColor="rgba(0, 0, 0, 0.6)">
		<view class="snowy-shadow snowy-padding">
			<view class="snowy-flex-end">
				<icon type="clear" :size="20" color="#5677fc" @click="close"></icon>
			</view>
			<uni-forms ref="formRef" :model="formData" label-position="top" labelWidth="auto">
				<uni-forms-item label="复活到节点" name="targetActivityId" :required="true" :rules="[{ required: true, errorMessage: '请选择要复活的节点' }]">
					<snowy-sel-picker @update="update" :model-value="formData.targetActivityId" :isMultiple="false" @getOptData="getTargetActivityIdList" placeholder="请选择要复活的节点" />
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
				this.$axios.request('/flwapp/flw/process/monitor/getCanRestartNodeInfoList', "GET", {
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
					this.$axios.request('/flwapp/flw/process/monitor/restart', "POST", {
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
				console.log('===触发',e)
				this.formData.targetActivityId = e
			},
		}
	}
</script>
<style lang="scss" scoped>
</style>