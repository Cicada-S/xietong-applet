<template>
	<view>
		<uni-section title="自定义表单" type="line"></uni-section>
		<uni-forms ref="formRef" :model="formData" label-position="top" :rules="rules" validate-trigger="blur" labelWidth="auto">
			<uni-forms-item label="名称" name="name" required :rules="[{ required: true, errorMessage: '请输入名称' }]">
				<uni-easyinput v-model="formData.name" :disabled="props.disabled" placeholder="请输入名称"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="分类" name="category" required :rules="[{ required: true, errorMessage: '请输入分类' }]">
				<uni-easyinput v-model="formData.category" :disabled="props.disabled" placeholder="请输入分类"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="排序" name="sortCode" required :rules="[{ required: true, errorMessage: '请输入排序' }]">
				<uni-number-box v-model="formData.sortCode" :disabled="props.disabled" placeholder="请输入排序"></uni-number-box>
			</uni-forms-item>
		</uni-forms>
		<uni-forms ref="dynamicFormRef" :model="dynamicFormData" label-position="top" labelWidth="auto">
			<snowy-dyna-field
				v-for="(item, index) in dynamicFieldConfigList"
				:key="index"
				:index="index"
				:fieldConfig="item"
				:formData="dynamicFormData"
			/>
		</uni-forms>
	</view>
</template>
<script>
	export default{
		props:{
			value: {
				type: Object,
				default: () => {}
			},
			disabled: {
				type: Boolean,
				default: () => false
			}
		},
		watch:{
			value(newVal, oldVal) {
				if (newVal) {
					this.formData = newVal
					this.dynamicFormData = JSON.parse(this.formData.extJson) || {}
				}
			}
		},
		data() {
			return{
				formRef:null,
				formData:{
					sortCode: 1
				},
				rules:{},
				dynamicFormRef:null,
				dynamicFieldConfigList:[],
				dynamicFormData:{}
			}
		},
		methods:{
			getData() {
				const promiseList = []
				promiseList.push(
					new Promise((resolve, reject) => {
						this.$refs.formRef.validate().then((result) => {
							resolve(result)
						}).catch((err) => {
							reject(err)
						})
					})
				)
				promiseList.push(
					new Promise((resolve, reject) => {
						this.$refs.dynamicFormRef.validate().then((result) => {
							resolve(result)
						}).catch((err) => {
							reject(err)
						})
					})
				)
				return new Promise((resolve, reject) => {
					try {
						Promise.all(promiseList).then(() => {
							this.formData.extJson = JSON.stringify(this.dynamicFormData)
							this.submitApi(this.formData).then((data) => {
								resolve(this.formData)
							})
						})
					} catch (error) {
						reject(error)
					}
				})
			},
			submitApi() {
				return new Promise((resolve, reject) => {
					// 这里调用自己的api接口，完了成功后记得resolve()
					const result = {
						code: 200,
						msg: '操作成功',
						data: ''
					}
					// 实际情况下这里会被统一网络请求给过滤，能到这肯定是能行的
					resolve(result.data)
				})
			}
			
		}
		
	}
</script>
<style lang="scss" scoped>
</style>