<template>
	<snowy-form-item :fieldConfig="batchFieldConfig" :formData="batchFormData" :fieldConfigDisable="fieldConfigDisable" :useDefault="useDefault" />
</template>
<script>
	export default{
		name: "BatchFormItem",
		props:{
			batchFieldConfig: {
				type: Object,
				required: true
			},
			batchFormData: {
				type: Object,
				required: true
			},
			fieldConfigDisable: {
				type: Boolean,
				default: null,
				required: false
			},
			useDefault: {
				type: Boolean,
				default: false,
				required: false
			}
		}
	}
</script>
<style lang="scss">
</style>