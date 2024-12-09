<template>
	<view class="snowy-form">
		<view v-if="recordData.formType === 'DESIGN'">
			<snowy-form-build ref="formBuildRef" :fieldConfigs="fieldConfigs" :formData="formBuildData"
				:useDefault="useDefault" @update="update">
			</snowy-form-build>
		</view>
		
		<view v-if="showOptApl" class="snowy-shadow"
			style="background-color: #f5fff0; padding: 30rpx 40rpx 1rpx 40rpx;">
			<opt-apl ref="optAplRef" :model-design-data="modelDesignData" />
		</view>
		<view v-for="(button,index) in buttonInfo" :key="index" :index="`vb-${index}`">
			<!-- <view class="">{{JSON.stringify(button)}}</view> -->
			<tui-button v-if="button.value === 'SHOW'" :type="button.type === 'default' ? 'gray-primary' : button.type"
				margin="30rpx 0" :preventClick="true" :shadow="true" @click="buttonClick(button.key)">
				{{ button.label }}
			</tui-button>
		</view>
		<user-pos ref="userPosRef" @confirm="startProcess"></user-pos>
	</view>
</template>
<script>
	let topTableName = ''
	import store from '@/store'
	import workFlowUtils from '@/util/workFlowUtils'
	import CustomForm from '@/pages/OA/customform/index'
	import userPos from './user-pos.vue'
	import optApl from './opt-apl.vue'
	export default {
		name: "newTask",
		components: {
			CustomForm,
			userPos,
			optApl
		},
		data() {

			return {
				// 打开类型（表单和草稿）
				openType: '',
				recordData: {
					formType: ''
				},
				showOptApl: false,
				optAplRef: null,
				modelDesignData: {},
				// 动态表单相关变量
				formBuildRef: null,
				fieldConfigs: [],
				formBuildData: {
					APPLY_TIME:''
				},
				useDefault: true,
				// 自定义表单相关变量
				customFormRef: null,
				customFromCode: '',
				initiatorDataJson: null,
				buttonInfo: null,
				userPosRef: null,

			}
		},
		onLoad(option) {
			if (!option.id) {
				return this.$snowy.modal.alert('id空异常')
			}
			this.openType = option.openType
			if (this.openType === 'NEW') {
				this.$axios.request('/flwapp/flw/process/modelDetail', "GET", {
					id: option.id
				}).then((res) => {
					console.log('===', res)
					this.handleResData(res.data)

				})
			}
			if (this.openType === 'DRAFT') {
				
				this.$axios.request('/flwapp/flw/process/draftDetail', "GET", {
					id: option.id
				}).then((res) => {
					console.log('===', res)
					this.handleResData(res.data)
				})
			}
		},
		methods: {
			handleResData(data) {
				this.recordData = data
				this.showOptApl = data.processJson.includes('CUSTOM') > 0 && data.processJson.includes('selectMode') > 0
				this.modelDesignData = JSON.parse(data.processJson)
				const thisNode = JSON.parse(data.processJson).childNode.childNode;
				this.buttonInfo = thisNode.properties.buttonInfo
				if (data.formType === 'DESIGN') {
					if (thisNode.properties.fieldInfo.length === 0 || thisNode.properties.buttonInfo.length === 0) {
						return $snowy.modal.alert('该节点按钮与字段配置不正确，请联系管理员')
					}
					// 转换数据：隐藏字段
					const formJson = workFlowUtils.convFormFilid(JSON.parse(data.formJson), thisNode.properties.fieldInfo)
					const obj = workFlowUtils.handleSnowyFormJsonList(formJson.list)
					topTableName = obj.topTableName
					this.fieldConfigs = obj.fieldConfigs
					console.log(obj.fieldConfigs)
					// 数据初始化
					clearTimeout()
					if (data.dataJson) {
						const initData = JSON.parse(data.dataJson)
						if (initData && initData[topTableName]) {
							this.useDefault = false
							
							this.formBuildData = initData[topTableName]
						}
					}else{
						this.fieldConfigs.forEach(item => {
							this.$set(this.formBuildData,item.name,'')
						})
					}
				}
				if (data.formType === 'DEFINE') {
					if (thisNode.properties.buttonInfo.length === 0) {
						return $snowy.modal.alert('该节点按钮配置不正确，请联系管理员')
					}
					if (!thisNode.properties.formInfo) {
						return $snowy.modal.alert('该节点未配置表单，请联系管理员')
					}
					this.customFromCode = thisNode.properties.formInfo.find((f) => {
						return f.key === 'MOBILE_FORM_URL'
					}).value
					if (data.dataJson) {
						this.initiatorDataJson = JSON.parse(data.dataJson)
					}
				}
				console.log("fieldConfigs",this.fieldConfigs);
				console.log("formBuildData",this.formBuildData);
			},
			buttonClick(key) {
				if (this.recordData.formType === 'DESIGN') {
					this.$refs.formBuildRef.formListEmitAndValidate().then(formData => {
						const subFormData = {
							[topTableName]: formData
						}
						if (key === 'SUBMIT') {
							this.loadPos(subFormData)
						} else {
							this.saveDraft(subFormData)
						}
					}).catch(err => {
						console.error(err)
					})
				}
				if (this.recordData.formType === 'DEFINE') {
					this.customFormRef.$refs.taskFormRef.getData().then((values) => {
						if (key === 'SUBMIT') {
							this.loadPos(values)
						} else {
							this.saveDraft(values)
						}
					})
				}
			},
			loadPos(subFormData) {
				this.$axios.request('/webapp/sys/userCenter/loginPositionInfo', "GET", {}).then((res) => {
					console.log('===',res)
					if (this.$snowy.tool.isEmpty(res.data)) {
						return this.$snowy.modal.alert('发起失败：未获得职位信息！')
					}
					if (res.data.length === 1) {
						// 拿到主职位信息，直接发起
						return this.startProcess({
							subForm: subFormData,
							posInfo: res.data[0]
						})
					} else {
						// 打开职位选择，让其选择以哪个职位发起
						return this.$refs.userPosRef.open(subFormData, res.data)
					}
				
				})
			},
			async startProcess({
				subForm,
				posInfo
			}, callback) {
				let modelId = ''
				if ('NEW' === this.openType) {
					modelId = this.recordData?.id
				}
				if ('DRAFT' === this.openType) {
					modelId = this.recordData?.modelId
				}
				if (this.$snowy.tool.isEmpty(modelId)) {
					return this.$snowy.modal.alert('模型id空异常！')
				}
				if (this.$snowy.tool.isEmpty(posInfo)) {
					return this.$snowy.modal.alert('用户职位信息空异常！')
				}
				const userInfo = store.getters.userInfo
				// 拼接JSON
				const param = {
					modelId: modelId,
					dataJson: JSON.stringify(subForm),
					initiator: userInfo?.id,
					initiatorName: userInfo?.name,
					initiatorOrgId: posInfo?.orgId,
					initiatorOrgName: posInfo?.orgName,
					initiatorPositionId: posInfo?.positionId,
					initiatorPositionName: posInfo?.positionName
				}
				// 发起人自选列表的审批人
				if (this.showOptApl) {
					const selectData = this.$xeu.clone(this.$refs.optAplRef.getDataInfo(), true)
					if (this.$snowy.tool.isEmpty(selectData)) {
						return
					}
					selectData.forEach((item) => {
						item.id = 'assignee_' + item.id
					})
					param.initiatorSelectData = JSON.stringify(selectData)
				}
				// 调用接口发起流程
				this.$axios.request('/flwapp/flw/process/start', "POST", {
					...param
				}).then((res) => {
					if ('DRAFT' === this.openType) {
						// await processMyApi.processDeleteDraft([{
						// 	id: recordData.value?.id
						// }])
					}
					if (!!callback) {
						callback()
					}
					uni.navigateBack({
						delta: 1
					})
				
				})
				
			},
			saveDraft(formData) {
				// 拼接JSON
				const param = {
					title: this.recordData.name,
					dataJson: JSON.stringify(formData)
				}
				if (this.openType === 'NEW') {
					param.modelId = this.recordData.id
				}
				// 草稿再保存
				if (this.openType === 'DRAFT') {
					param.modelId = this.recordData.modelId
					param.id = this.recordData.id
				}
				this.$axios.request('/flwapp/flw/process/saveDraft', "POST", {
					...param
				}).then((res) => {
					uni.navigateBack({
						delta: 1
					})
				})
			},
			update(e) {
				console.log('===',e)
			}
		}
	}
</script>
<style lang="scss" scoped>
</style>