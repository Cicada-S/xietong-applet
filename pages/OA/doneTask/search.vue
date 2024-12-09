<template>
	<uni-popup ref="popRef" type="bottom" background-color="transparent" maskBackgroundColor="rgba(0, 0, 0, 0.6)">
		<view class="snowy-shadow snowy-padding">
			<view class="snowy-flex-end">
				<icon type="clear" :size="20" color="#5677fc" @click="close"></icon>
			</view>
			<uni-forms ref="formRef" :model="searchFormData" label-position="top" labelWidth="auto">
				<uni-forms-item label="发起人关键词" name="searchKey">
					<uni-easyinput v-model="searchFormData.searchKey" placeholder="请输入发起人姓名关键词"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="流程名称" name="name">
					<uni-easyinput v-model="searchFormData.name" placeholder="请输入流程名称"></uni-easyinput>
				</uni-forms-item>
			</uni-forms>
			<uni-row :gutter="10">
				<uni-col :span="12">
					<tui-button height="90rpx" type="gray" @click="reset">重置</tui-button>
				</uni-col>
				<uni-col :span="12">
					<tui-button height="90rpx" type="primary" @click="confirm">确认</tui-button>
				</uni-col>
			</uni-row>
		</view>
	</uni-popup>
</template>
<script>
	export default{
		props:{
			searchFormData: {
				type: Object,
				required: true
			},
		},
		data() {
			return{
				popRef:'',
				
			}
		},
		methods:{
			open() {
				this.$refs.popRef.open()
			},
			reset() {
				this.searchFormData.searchKey = ''
				this.searchFormData.name = ''
				this.$emit('reset', this.searchFormData)
			},
			confirm() {
				this.$refs.popRef.close()
				this.$emit('confirm', this.searchFormData)
			},
			close() {
				this.$refs.popRef.close()
			}
		}
	}
</script>
<style lang="scss" scoped>
</style>