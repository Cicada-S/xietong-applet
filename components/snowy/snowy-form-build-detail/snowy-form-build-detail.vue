<template>
	<uni-forms ref="dyFormRef" :model="formData" label-position="top" labelWidth="auto" validate-trigger="submit">
		<snowy-form-item 
			v-for="(fieldConfig, fieldConfigIndex) in fieldConfigs"
			:ref="`form-item-ref-${fieldConfigIndex}`"
			:fieldConfig="fieldConfig"
			:formData="formData"
			:model:value="formData[fieldConfig.name]"
			:useDefault="useDefault"
			 @update="update"/>
	</uni-forms>
</template>
<script>
	export default{
		props:{
			formData: {
				type: Object,
				default: {},
				required: false
			},
			fieldConfigs: {
				type: Array,
				default: [],
				required: true
			},
			useDefault: {
				type: Boolean,
				default: false,
				required: false
			}
		},
		watch:{
			formData:{
				handler(newValue, oldValue){
					console.log('触发改变localFormData===')
					this.localFormData = newValue || {}
				},
				immediate:true,
				deep:true
			},
			localFormData:{
				handler(newValue, oldValue){
					console.log('触发改变localFormData===111111')
					this.$emit('update', this.localFormData)
				},
				immediate:true,
				deep:true
			},
		},
		data() {
			return{
				dyFormRef:null,
				localFormRules:{},
				localFormData:{},
			}
		},
		// const { proxy } = getCurrentInstance()
		methods:{
			formListEmitAndValidate() {
				const promiseList = []
				this.fieldConfigs.forEach((item, index) => {
					if (item.type === 'batch') {
						promiseList.push(new Promise((resolve, reject) => {
							// 验证多个batch字段
							this.$refs[`form-item-ref-${ index }`][0].formListValidate().then(result => {
								resolve(result)
							}).catch(err => {
								reject(err)
							})
						}))
					}
				})
				return new Promise((resolve, reject) => {
					Promise.all(promiseList).then((result) => {
						this.$refs.dyFormRef.validate().then(res => {
							resolve(this.localFormData)
						})
					}).catch(err => {
						reject(err)
					})
				})
			},
			update(e) {
				this.localFormData = e
				this.$forceUpdate()
				this.$emit('update', e)
			}
		}
	}
</script>
<style lang="scss">
</style>