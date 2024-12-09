<template>
	<view>
		<tui-tabs :top="0" :isFixed="true" :tabs="[{name:'表单'}, {name: '流转记录'}]" :currentTab="curView" @change="changeFun"></tui-tabs>
		<view class="snowy-page" style="margin-top: 80rpx;">
			<snowy-process-state-img :state-code="stateCode" />
			<view v-show="curView === 0" class="snowy-form">
				<view v-if="formType === 'DESIGN'">
					<snowy-form-build-detail :fieldConfigs="fieldConfigs" :formData="formBuildData"></snowy-form-build-detail>
				</view>
				<view v-if="formType === 'DEFINE'">
					<custom-from ref="customFormRef" :code="customFromCode" :key="customFromCode" :value="initiatorDataJson" :disabled="true" />
				</view>
			</view>
			<view v-show="curView === 1" class="snowy-form">
				<snowy-transfer :commentList="commentList"></snowy-transfer>
			</view>
		</view>
	</view>
</template>
<script>
	import workFlowUtils from '@/util/workFlowUtils';
	import CustomFrom from '@/pages/OA/customform/index'
	export default{
		components:{
			CustomFrom
		},
		data() {
			return{
				curView:0,
				formType:'DESIGN',
				stateCode:'',
				// 动态表单
				fieldConfigs:[],
				formBuildData:{},
				// 自定义表单
				customFromCode:'',
				initiatorDataJson:null,
				// 流转记录
				commentList:[],
			}
		},
		onLoad(option) {
			this.stateCode = option.stateCode
			if (!option.id) {
				return
			}
			// 获取详情
			const param = {
				id: option.id
			}
			this.$axios.request('/flwapp/flw/process/monitor/detail', "GET", {
				id: option.id
			}).then((res) => {
				this.formType = res.data?.formType
				this.commentList = res.data?.commentList || []
				if (res.data?.formType === 'DESIGN') {
					if (!this.$xeu.isEmpty(res.data?.initiatorFormJson) && !this.$xeu.isEmpty(res.data?.initiatorDataJson)) {
						const formJson = JSON.parse(res.data.initiatorFormJson)
						if (!this.$xeu.isEmpty(formJson?.list)) {
							const obj = workFlowUtils.handleSnowyFormJsonList(formJson.list, true)
							this.fieldConfigs = obj.fieldConfigs
							const initData = JSON.parse(res.data.initiatorDataJson)
							if (initData && initData[obj.topTableName]) {
								this.formBuildData = initData[obj.topTableName]
							}
						}
					}
				}
				if (res.data?.formType === 'DEFINE') {
					this.customFromCode = JSON.parse(res.data?.initiatorModelJson)?.properties?.configInfo?.processUserTaskMobileFormUrl
					this.initiatorDataJson = JSON.parse(res.data?.initiatorDataJson)
				}
			})
		},
		methods:{
			changeFun(e) {
				if (this.curView != e.index) {
					this.curView = e.index
				}
			}
		}
	}
	
</script>
<style lang="scss" scoped>
</style>