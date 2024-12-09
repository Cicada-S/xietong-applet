<template>
	<uni-popup ref="popRef" type="bottom" background-color="transparent" maskBackgroundColor="rgba(0, 0, 0, 0.6)">
		<tui-list-view unlined="all" background-color="transparent">
			<tui-list-cell :hover="true" :arrow="false" @click="detail" :radius="10" >
				<view class="snowy-text-center"> 详情 </view>
			</tui-list-cell>
			<tui-list-cell  v-if="!isRead" :hover="true" :arrow="false" @click="hasReadMyCopy" :radius="10" :margin-top="2">
				<view class="snowy-text-center"> 已阅 </view>
			</tui-list-cell>
			<tui-list-cell  v-if="isRead" :hover="true" :arrow="false" @click="del" :radius="10" :margin-top="2">
				<view class="snowy-text-center"> 刪除 </view>
			</tui-list-cell>
			<tui-list-cell :hover="true" :arrow="false" @click="cancel" :margin-top="10" :radius="10">
				<view class="snowy-text-center"> 取消 </view>
			</tui-list-cell>
		</tui-list-view>
	</uni-popup>
</template>
<script>
	export default{
		data() {
			return {
				popRef:null,
				record:{},
				isRead:0,
			}
		},
		methods:{
			open(data, code) {
				this.record = data
				this.isRead = code
				this.$refs.popRef.open()
			},
			detail() {
				uni.navigateTo({
					url: `/pages/OA/copyTask/detail?id=${this.record.id}&stateCode=${this.record.stateCode}`
				})
				this.$refs.popRef.close()
			},
			hasReadMyCopy() {
				
				this.$axios.request('/flwapp/flw/process/readMyCopyProcess', "POST", [{
					id: this.record.id
				}]).then((res) => {
					this.$emit('handleOk')
					this.$refs.popRef.close()
				})
				
			},
			del() {
				this.$snowy.modal.confirm(`是否确认删除【${ this.record.title }】已阅流程？`).then(data => {
					this.$axios.request('/flwapp/flw/process/deleteMyHasReadProcess', "POST", [{
						id: this.record.id
					}]).then((res) => {
						this.$emit('handleOk')
						this.$refs.popRef.close()
					})
				})
			},
			cancel() {
				this.$refs.popRef.close()
			}
		}
	}
	
</script>
<style lang="scss" scoped>
</style>