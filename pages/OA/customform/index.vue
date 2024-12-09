<template>
	<view>
		{{code}}
		<view v-if="'level/startTaskForm' === code">
			<LevelStartTaskForm ref="taskFormRef"  :value="value" :disabled="disabled"/>
		</view>
		<view v-if="'level/userTaskForm' === code">
			<LevelUserTaskForm ref="taskFormRef"  :value="value" :disabled="disabled"/>
		</view>
	</view>
</template>
<script>
	import LevelStartTaskForm from './level/startTaskForm.vue'
	import LevelUserTaskForm from './level/userTaskForm.vue'
	export default{
		props:{
			value: {
				type: Object,
				default: () => {}
			},
			disabled: {
				type: Boolean,
				default: () => false
			},
			code:{
				type: String,
				default:() => ''
			}
		},
		components:{
			LevelUserTaskForm,
			LevelStartTaskForm
		}
	}
</script>
<style lang="scss" scoped>
</style>