<template>
	<uni-popup ref="popRef" type="bottom" background-color="transparent" maskBackgroundColor="rgba(0, 0, 0, 0.6)">
		<view class="snowy-shadow snowy-padding">
			<view class="snowy-flex-end">
				<icon type="clear" :size="20" color="#5677fc" @click="close"></icon>
			</view>
			<uni-forms ref="formRef" :model="formData" label-position="top" labelWidth="auto">
				<uni-forms-item label="用户" name="userId" required :rules="[{ required: true, errorMessage: '请选择人员' }]">
					<snowy-user-picker @update="update"  :model-value="formData.userId" placeholder="请选择人员" :map="{key: 'id', label: 'name'}" @getOptData="selectorFunction.user.getOptData" :isPage="true" @getSelData="selectorFunction.user.getSelData">
					</snowy-user-picker>
				</uni-forms-item>
			</uni-forms>
			<tui-button height="90rpx" type="primary" @click="submit">确认</tui-button>
		</view>
	</uni-popup>
</template>
<script setup>

	export default {
		data() {
			return {
				formData: {
					userId:'',
					id:''
				},
				selectorFunction:{
					// 用户
					user: {
						getOptData: async ({ pageNo, pageSize, keyword }, callback) => {
							const parameter = { current: pageNo, size: pageSize, searchKey: keyword }
							this.$axios.request('/flwapp/flw/process/monitor/userSelector', "GET", {
								...parameter
							}).then((res) => {
								callback({
									state: 'success',
									data: res.data.records
								})
							})
							// const data = await processApi.processUserSelector(parameter)
							// callback({ state: CallbackState.SUCCESS, data: data?.records })
						},
						getSelData: async (curSelDataKey, callback) => {
							console.log('===触发1111',curSelDataKey)
							if (this.$snowy.tool.isNotEmpty(curSelDataKey)) {
								this.$axios.request('/flwapp/sys/userCenter/getUserListByIdList', "POST", {
									idList: [curSelDataKey]
								}).then((res) => {
									console.log('===2222',res)
									callback({
										state: 'success',
										data: res.data[0]
									})
								})
								// const data = await userCenterApi.userCenterGetUserListByIdList({
								// 	idList: [curSelDataKey]
								// })
								// callback({ state: CallbackState.SUCCESS, data: data[0] })
							}
						}
					}
				}
			}
		},
		methods: {
			onOpen(record) {
				this.formData.id = record.id
				this.$refs.popRef.open()
			},
			submit() {
				this.$refs.formRef.validate().then(res => {
					this.$axios.request('/flwapp/flw/process/monitor/turn', "POST", {
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
				this.formData.userId = e
			},
			
		}
	}
</script>
<style lang="scss" scoped>
</style>