<template>
	<div>
		<uni-popup ref="popRef" type="bottom" background-color="transparent" maskBackgroundColor="rgba(0, 0, 0, 0.6)" @change="popChange">
			{{record.stateCode}}
			<tui-list-view unlined="all" background-color="transparent">
				<!-- v-if="$snowy.hasPerm('mobileFlwProcessDetail')" -->
				<tui-list-cell  :hover="true" :arrow="false" @click="detail" :radius="10">
					<view class="snowy-text-center"> 详情 </view>
				</tui-list-cell>
				<!-- $snowy.hasPerm('mobileFlwProcessActiveSuspend') && -->
				<tui-list-cell v-if=" record.stateCode === 'ACTIVE'" :hover="true" :arrow="false" @click="editActiveSuspendStatus" :radius="10" :margin-top="2">
					<view class="snowy-text-center"> 挂起 </view>
				</tui-list-cell>
				<!-- $snowy.hasPerm('mobileFlwProcessActiveSuspend') && -->
				<tui-list-cell v-else-if=" record.stateCode === 'SUSPENDED'" :hover="true" :arrow="false" @click="editActiveSuspendStatus" :radius="10" :margin-top="2">
					<view class="snowy-text-center"> 激活 </view>
				</tui-list-cell>
				<!-- $snowy.hasPerm('mobileFlwProcessRevoke') && -->
				<tui-list-cell v-if=" record.stateCode === 'ACTIVE'" :hover="true" :arrow="false" @click="processRecordRevoke" :radius="10" :margin-top="2">
					<view class="snowy-text-center"> 撤回 </view>
				</tui-list-cell>
				<!-- $snowy.hasPerm('mobileFlwProcessEnd') && -->
				<tui-list-cell v-if=" record.stateCode === 'ACTIVE'" :hover="true" :arrow="false" @click="processRecordEnd" :radius="10" :margin-top="2">
					<view class="snowy-text-center"> 终止 </view>
				</tui-list-cell>
				<!-- $snowy.hasPerm('mobileFlwProcessTurn') && -->
				<tui-list-cell v-if=" record.stateCode === 'ACTIVE'" :hover="true" :arrow="false" @click="$refs.processTurnFormRef.onOpen(record)" :radius="10" :margin-top="2">
					<view class="snowy-text-center"> 转办 </view>
				</tui-list-cell>
				<!-- $snowy.hasPerm('mobileFlwProcessJump') && -->
				<tui-list-cell v-if=" record.stateCode === 'ACTIVE'" :hover="true" :arrow="false" @click="$refs.processJumpFormRef.onOpen(record)" :radius="10" :margin-top="2">
					<view class="snowy-text-center"> 跳转 </view>
				</tui-list-cell>
				<!-- $snowy.hasPerm('mobileFlwProcessRestart') && -->
				<tui-list-cell v-if=" (record.stateCode === 'COMPLETED' || record.stateCode === 'END' || record.stateCode === 'REJECT' || record.stateCode === 'REVOKE')" :hover="true" :arrow="false" @click="$refs.processResetFormRef.onOpen(record)" :radius="10" :margin-top="2">
					<view class="snowy-text-center"> 复活 </view>
				</tui-list-cell>
				<!-- $snowy.hasPerm('mobileFlwProcessMigrate') && -->
				<tui-list-cell v-if=" record.stateCode === 'ACTIVE'" :hover="true" :arrow="false" @click="$refs.processMigrateFormRef.onOpen(record)" :radius="10" :margin-top="2">
					<view class="snowy-text-center"> 迁移 </view>
				</tui-list-cell>
				<!-- v-if="$snowy.hasPerm('mobileFlwProcessDelete')" -->
				<tui-list-cell  :hover="true" :arrow="false" @click="del" :radius="10" :margin-top="2">
					<view class="snowy-text-center"> 刪除 </view>
				</tui-list-cell>
				<tui-list-cell :hover="true" :arrow="false" @click="cancel" :margin-top="10" :radius="10">
					<view class="snowy-text-center"> 取消 </view>
				</tui-list-cell>
			</tui-list-view>
		</uni-popup>
		<process-turn-form ref="processTurnFormRef" @successful="onClose" />
		<process-jump-form ref="processJumpFormRef" @successful="onClose" />
		<process-reset-form ref="processResetFormRef" @successful="onClose" />
		<process-migrate-form ref="processMigrateFormRef" @successful="onClose" />
	</div>
	
</template>
<script>
	import processTurnForm from './process-turn-form.vue'
	import processJumpForm from './process-jump-form.vue'
	import processResetForm from './process-reset-form.vue'
	import processMigrateForm from './process-migrate-form.vue'
	export default{
		components:{
			processTurnForm,
			processJumpForm,
			processResetForm,
			processMigrateForm
		},
		data() {
			return {
				record:{},
			}
		},
		methods:{
			open(data) {
				this.record = data
				this.$refs.popRef.open()
			},
			popChange(e) {
				this.$emit('morePopChange', e)
			},
			detail() {
				setTimeout(()=>{
					uni.navigateTo({
						url: `/pages/OA/processMonitore/detail?id=${this.record.id}&stateCode=${this.record.stateCode}`
					})
				}, 1)
				this.$refs.popRef.close()
			},
			// 激活挂起
			editActiveSuspendStatus() {
				const params = [{
					id: this.record.id
				}]
				if (this.record.stateCode === 'ACTIVE') {
					this.$snowy.modal.confirm(`确定要挂起【${ this.record.title }】流程吗？`).then(() => {
						this.$axios.request('/flwapp/flw/process/monitor/suspend', "POST", [{
							id: this.record.id
						}]).then((res) => {
							this.$emit('handleOk')
							this.$refs.popRef.close()
						})
						
					})
				}
				if (this.record.stateCode === 'SUSPENDED') {
					this.$snowy.modal.confirm(`确定要激活【${ this.record.title }】流程吗？`).then(() => {
						this.$axios.request('/flwapp/flw/process/monitor/active', "POST", [{
							id: this.record.id
						}]).then((res) => {
							this.$emit('handleOk')
							this.$refs.popRef.close()
						})
						
					})
				}
			},
			// 撤回
			processRecordRevoke() {
				this.$snowy.modal.confirm(`确定要撤回【${ this.record.title }】流程吗？`).then(() => {
					this.$axios.request('/flwapp/flw/process/monitor/revoke', "POST", [{
						id: this.record.id
					}]).then((res) => {
						this.$emit('handleOk')
						this.$refs.popRef.close()
					})
					
				})
			},
			// 终止
			processRecordEnd() {
				this.$snowy.modal.confirm(`确定要终止【${ this.record.title }】流程吗？`).then(() => {
					this.$axios.request('/flwapp/flw/process/monitor/end', "POST", [{
						id: this.record.id
					}]).then((res) => {
						this.$emit('handleOk')
						this.$refs.popRef.close()
					})
				})
			},
			onClose() {
				this.$emit('handleOk')
				this.$refs.popRef.close()
			},
			del() {
				this.$snowy.modal.confirm(`确定要删除【${ this.record.title }】流程吗？`).then(() => {
					this.$axios.request('/flwapp/flw/process/monitor/delete', "POST", [{
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