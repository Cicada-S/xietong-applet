<template>
	<view>
		<!-- <uni-forms-item
			v-if="['input','textarea','number',].includes(fieldConfig?.type)"
			:label="fieldConfig?.label"
			:name="fieldConfig?.name" 
			:required="!!fieldConfig?.required"
			:rules="[{ required: !!fieldConfig?.required, errorMessage: fieldConfig?.placeholder || `请输入${fieldConfig?.label}` }]">
			<uni-easyinput
				:type="fieldConfig?.type"
				v-model="formData[fieldConfig?.name]"
				:placeholder="fieldConfig?.placeholder"
				v-bind="$attrs"/>
		</uni-forms-item>
		<uni-forms-item
			v-if="['radio','checkbox',].includes(fieldConfig?.type)"
			:label="fieldConfig?.label"
			:name="fieldConfig?.name" 
			:required="!!fieldConfig?.required"
			:rules="[{ required: !!fieldConfig?.required, errorMessage: fieldConfig?.placeholder || `请选择${fieldConfig?.label}` }]">
			<uni-data-checkbox
				v-model="formData[fieldConfig?.name]"
				:multiple="'checkbox' === fieldConfig?.type"
				:map="{text:'text',value:'value'}"
				:localdata="options"
				v-bind="$attrs"/>
		</uni-forms-item>
		<uni-forms-item
			v-if="['select',].includes(fieldConfig?.type)"
			:label="fieldConfig?.label"
			:name="fieldConfig?.name" 
			:required="!!fieldConfig?.required"
			:rules="[{ required: !!fieldConfig?.required, errorMessage: fieldConfig?.placeholder || `请选择${fieldConfig?.label}` }]">
			<snowy-sel-picker
				v-model="formData[fieldConfig?.name]"
				:placeholder="fieldConfig?.placeholder"
				:isMultiple = "!!fieldConfig?.isMultiple"
				:map="'API' === fieldConfig?.selectOptionType?{
					label: 'name',
					key: 'id'
				}:{
					label: 'text',
					key: 'value'
				}"
				@getOptData="getOptData"
				v-bind="$attrs"/>
		</uni-forms-item>
		<uni-forms-item
			v-if="['pageSelect',].includes(fieldConfig?.type)"
			:label="fieldConfig?.label"
			:name="fieldConfig?.name" 
			:required="!!fieldConfig?.required"
			:rules="[{ required: !!fieldConfig?.required, errorMessage: fieldConfig?.placeholder || `请选择${fieldConfig?.label}` }]">
			<snowy-sel-picker
				v-model="formData[fieldConfig?.name]"
				:placeholder="fieldConfig?.placeholder"
				:isMultiple = "false"
				:map="{
					label: 'name',
					key: 'id'
				}"
				:isPage = "true" 
				@getOptData="getOptData"
				@getSelData="getSelData"
				v-bind="$attrs"/>
		</uni-forms-item> -->
	</view>
</template>
<script>
	import CallbackState from "@/enum/callback-state"
	export default {
		props:{
			fieldConfig: {
				type: Object,
				required: true
			},
			formData: {
				type: Object,
				required: true
			},
		},
		data() {
			return{
				options:[]
			}
		},
		methods:{
			getOptData(param, callback){
				if('DICT' === props.fieldConfig?.selectOptionType){
					const data = uni.$snowy.tool.dictList(props.fieldConfig?.dictTypeCode)
					return callback({ state: CallbackState.SUCCESS, data: data })
				}
				if(['select',].includes(props.fieldConfig?.type) && 'API' === props.fieldConfig?.selectOptionType){
					this.$axios.request(props.fieldConfig?.selOptionApiUrl, "GET", {
						current: -1
					}).then((res) => {
						return callback({ state: CallbackState.SUCCESS, data: data?.records })
						
					})
					// request({
					// 	url: props.fieldConfig?.selOptionApiUrl,
					// 	method: 'GET',
					// 	data: {
					// 		current: -1
					// 	}
					// }).then(data => {
					// 	return callback({ state: CallbackState.SUCCESS, data: data?.records })
					// })
				}
				if(['pageSelect',].includes(props.fieldConfig?.type)){
					const parameter = {
						current: param.pageNo,
						size: param.pageSize
					}
					this.$axios.request(props.fieldConfig?.selOptionApiUrl, "GET", parameter).then((res) => {
						return callback({ state: CallbackState.SUCCESS, data: data?.records })
					})
					// request({
					// 	url: props.fieldConfig?.selOptionApiUrl,
					// 	method: 'GET',
					// 	data: parameter
					// }).then(data => {
					// 	return callback({ state: CallbackState.SUCCESS, data: data?.records })
					// })
				}
			},
			getSelData(curSelDataKey, callback) {
				if ($snowy.tool.isNotEmpty(curSelDataKey)) {
					this.$axios.request(props.fieldConfig?.selDataApiUrl, "GET", {
						idList: [curSelDataKey]
					}).then((res) => {
						callback(data[0])
					})
					// request({
					// 	url: props.fieldConfig?.selDataApiUrl,
					// 	method: 'POST',
					// 	data: {
					// 		idList: [curSelDataKey]
					// 	}
					// }).then(data => {
					// 	callback(data[0])
					// })
				}
			}
		}
	}
</script>

<style>
</style>