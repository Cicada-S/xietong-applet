<template>
	<uni-popup ref="popRef" type="bottom" background-color="transparent" maskBackgroundColor="rgba(0, 0, 0, 0.6)">
		<tui-list-view unlined="all" background-color="transparent">
			<tui-list-cell :hover="true" :arrow="false" @click="detail" :radius="10" >
				<view class="snowy-text-center"> 详情 </view>
			</tui-list-cell>
			<tui-list-cell v-if="recordRef.stateCode === 'ACTIVE'" :hover="true" :arrow="false" @click="revoke" :radius="10" :margin-top="2">
				<view class="snowy-text-center"> 撤回 </view>
			</tui-list-cell>
			<tui-list-cell :hover="true" :arrow="false" @click="cancel" :margin-top="10" :radius="10">
				<view class="snowy-text-center"> 取消 </view>
			</tui-list-cell>
		</tui-list-view>
	</uni-popup>
</template>
<script setup>
	export default{
		data() {
			return{
				delPopRef:null,
				recordRef:{},
			}
		},
		methods:{
			open(data) {
				this.recordRef = data
				this.$refs.popRef.open()
			},
			detail() {
				uni.navigateTo({
					url: `/pages/OA/myApply/detail?id=${this.recordRef.id}&stateCode=${this.recordRef.stateCode}`
				})
				this.$refs.popRef.close()
			},
			revoke() {
				this.$snowy.modal.confirm(`确定要撤回【${ this.recordRef.title }】流程吗？`).then(() => {
					
					this.$axios.request('/flwapp/flw/process/revoke', "POST", [{id: this.recordRef.id}]).then((res) => {
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