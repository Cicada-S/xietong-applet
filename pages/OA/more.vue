<template>
	<uni-popup ref="popRef" type="bottom" background-color="transparent" maskBackgroundColor="rgba(0, 0, 0, 0.6)">
		<tui-list-view unlined="all" background-color="transparent">
			<tui-list-cell :hover="true" :arrow="false" @click="edit" :radius="10" >
				<view class="snowy-text-center"> 编辑 </view>
			</tui-list-cell>
			<tui-list-cell :hover="true" :arrow="false" @click="del" :radius="10" :margin-top="2">
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
			return{
				popRef:null,
				record:{},
				
			}
		},
		methods:{
			open(data) {
				this.record = data
				this.$refs.popRef.open()
			},
			edit(){
				uni.navigateTo({
					url: `/pages/OA/newTask?id=${this.record.id}&openType=DRAFT`,
				})
				this.$refs.popRef.close()
			},
			del() {
				this.$snowy.modal.confirm(`是否确认删除【${ this.record.title }】草稿？`).then(data => {
					this.$axios.request('/flwapp/flw/process/deleteDraft', "POST", [{
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