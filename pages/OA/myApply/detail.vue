<template>
	<view>
		<tui-tabs :top="0" :isFixed="true" :tabs="[{name:'表单'}, {name: '流转记录'}]" :currentTab="curView" @change="chnegTab"></tui-tabs>
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
			<view v-show="curView === 1"  class="snowy-form">
				<snowy-transfer :commentList="commentList"></snowy-transfer>
			</view>
		</view>
	</view>
</template>
<script>
	import tuiTabs from '@/components/thorui/thorui/tui-tabs/tui-tabs.vue'
	import CustomFrom from '@/pages/OA/customform/index'
	import workFlowUtils from '@/util/workFlowUtils';
	export default{
		components:{
			CustomFrom,
			tuiTabs
		},
		data() {
			return {
				curView:0,
				formType:'DESIGN',
				stateCode:'',
				fieldConfigs:[],
				formBuildData:{},
				customFromCode:'',
				initiatorDataJson:null,
				commentList:[],
				
			}
		},
		onLoad(option) {
			this.stateCode = option.stateCode
			if (!option.id) {
				return
			}
			this.$axios.request('/flwapp/flw/process/monitor/detail', "GET", {
				id: option.id
			}).then((res) => {
				if (this.$xeu.isEmpty(res.data)) {
					return
				}
				this.formType = res.data?.formType
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
				if (!this.$xeu.isEmpty(res.data?.commentList)) {
					this.commentList = res.data.commentList
				}
			})

		},
		methods:{
			chnegTab(e) {
				if (this.curView != e.index) {
					this.curView = e.index
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
</style>