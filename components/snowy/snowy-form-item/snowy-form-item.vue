<template>
	<view>
		<uni-forms-item
			v-if="fieldConfig && fieldConfig.type && fieldConfig.name && ['input','textarea','number'].includes(fieldConfig.type) && (typeof(fieldConfig.options.hidden) === 'boolean' ? !fieldConfig.options.hidden : true)"
			:label="fieldConfig.label"
			:name="fieldConfig.name" 
			:required="fieldConfig.required" 
			:rules="fieldConfig.rules">
			<uni-easyinput
				:disabled="disabled1"
				:type="fieldConfig.type"
				v-model="formData[fieldConfig.name]"
				:placeholder="fieldConfig.options.placeholder"
				 @change="e => formItemChange(e,fieldConfig.name)"/>
		</uni-forms-item>
		
		<uni-forms-item
			v-if="fieldConfig && fieldConfig.type && fieldConfig.name && ['radio','checkbox'].includes(fieldConfig.type) && (typeof(fieldConfig.options.hidden) === 'boolean' ? !fieldConfig.options.hidden : true)"
			:label="fieldConfig.label"
			:name="fieldConfig.name" 
			:required="fieldConfig.required" 
			:rules="fieldConfig.rules">
			<uni-data-checkbox
				:disabled="disabled1"
				v-model="formData[fieldConfig.name]"
				:multiple="fieldConfig.options.isMultiple"
				:map="fieldConfig.options.map"
				:localdata="fieldConfig.options.options"
				 @change="e => formItemChange(e,fieldConfig.name)"/>
		</uni-forms-item>
		
		<uni-forms-item
			v-if="fieldConfig && fieldConfig.type && fieldConfig.name && ['select'].includes(fieldConfig.type) && (typeof(fieldConfig.options.hidden) === 'boolean' ? !fieldConfig.options.hidden : true)"
			:label="fieldConfig.label"
			:name="fieldConfig.name" 
			:required="fieldConfig.required" 
			:rules="fieldConfig.rules">
			<snowy-sel-picker
				:disabled="disabled1"
				:model-value="formData[fieldConfig.name]"
				:isMultiple = "fieldConfig.options.isMultiple"
				:map="fieldConfig.options.map"
				@getOptData="(param, callback) => callback({ state: 'success', data: fieldConfig.options.options })"
				 @update="e => formItemChange(e,fieldConfig.name)"
				/>
		</uni-forms-item>
		
		<uni-forms-item
			v-if="fieldConfig && fieldConfig.type && fieldConfig.name && ['date'].includes(fieldConfig.type) && (typeof(fieldConfig.options.hidden) === 'boolean' ? !fieldConfig.options.hidden : true)"
			:label="fieldConfig.label"
			:name="fieldConfig.name" 
			:required="fieldConfig.required" 
			:rules="fieldConfig.rules">
			<uni-datetime-picker
				:disabled="disabled1"
				v-model="formData[fieldConfig.name]"
				:type="getDatetimePickerType(fieldConfig.options.range, fieldConfig.options.showTime)"
				:placeholder="fieldConfig.options.placeholder"
				:start-placeholder="fieldConfig.options.rangePlaceholder?fieldConfig.options.rangePlaceholder[0]:null"
				:end-placeholder="fieldConfig.options.rangePlaceholder?fieldConfig.options.rangePlaceholder[1]:null"
				 return-type="string"
				:clear-icon="fieldConfig.options.clearable"
				@change="e => formItemChange(e,fieldConfig.name)">
			</uni-datetime-picker>
		</uni-forms-item>
		
		<uni-forms-item
			v-if="fieldConfig && fieldConfig.type && fieldConfig.name && ['time'].includes(fieldConfig.type) && (typeof(fieldConfig.options.hidden) === 'boolean' ? !fieldConfig.options.hidden : true)"
			:label="fieldConfig.label"
			:name="fieldConfig.name" 
			:required="fieldConfig.required" 
			:rules="fieldConfig.rules">
			<view style="flex: 1;">
				<picker 
					:disabled="disabled1" 
					mode="time"
					:value="formData[fieldConfig.name]" 
					@change="(e)=> formItemChange(e.detail.value,fieldConfig.name)">
					<view class="uni-input input-value-border">{{formData[fieldConfig.name]?formData[fieldConfig.name]:fieldConfig.options.placeholder}}</view>
				</picker>
			</view>
		</uni-forms-item>
		
		<uni-forms-item
			v-if="fieldConfig && fieldConfig.type && fieldConfig.name && ['rate'].includes(fieldConfig.type) && (typeof(fieldConfig.options.hidden) === 'boolean' ? !fieldConfig.options.hidden : true)"
			:label="fieldConfig.label"
			:name="fieldConfig.name" 
			:required="fieldConfig.required" 
			:rules="fieldConfig.rules">
			<uni-rate
				:disabled="disabled1"
				v-model="formData[fieldConfig.name]"
				@change="(e)=> formItemChange(e,fieldConfig.name)"/>
		</uni-forms-item>
		
		<uni-forms-item
			v-if="fieldConfig && fieldConfig.type && fieldConfig.name && ['slider'].includes(fieldConfig.type) && (typeof(fieldConfig.options.hidden) === 'boolean' ? !fieldConfig.options.hidden : true)"
			:label="fieldConfig.label"
			:name="fieldConfig.name" 
			:required="fieldConfig.required" 
			:rules="fieldConfig.rules">
			<slider
				:disabled="disabled1"
				:min="fieldConfig.options.min"
				:max="fieldConfig.options.max"
				:value="formData[fieldConfig.name]"
				:step="fieldConfig.options.step"
				@change="(e)=>formItemChange(e.detail.value,fieldConfig.name)"
				show-value/>
		</uni-forms-item>
		
		<uni-forms-item
			v-if="fieldConfig && fieldConfig.type && fieldConfig.name && ['switch'].includes(fieldConfig.type) && (typeof(fieldConfig.options.hidden) === 'boolean' ? !fieldConfig.options.hidden : true)"
			:label="fieldConfig.label"
			:name="fieldConfig.name" 
			:required="fieldConfig.required" 
			:rules="fieldConfig.rules">
			<switch
				:disabled="disabled1"
				:checked = "formData[fieldConfig.name]"
				@change="(e)=>formItemChange(e.detail.value,fieldConfig.name)" />
		</uni-forms-item>
		
		<uni-forms-item
			v-if="fieldConfig && fieldConfig.type && fieldConfig.name && ['uploadFile'].includes(fieldConfig.type) && (typeof(fieldConfig.options.hidden) === 'boolean' ? !fieldConfig.options.hidden : true)"
			:label="fieldConfig.label"
			:name="fieldConfig.name" 
			:required="fieldConfig.required" 
			:rules="fieldConfig.rules">
			<snowy-file-picker-api 
				:disabled="disabled1" 
				idDataType="urlArr"
				:model-value="formData[fieldConfig.name]"
				@update="e => formItemChange(e,fieldConfig.name)">
			</snowy-file-picker-api>
		</uni-forms-item>
		
		<uni-forms-item
			v-if="fieldConfig && fieldConfig.type && fieldConfig.name && ['uploadImg',].includes(fieldConfig.type) && (typeof(fieldConfig.options.hidden) === 'boolean' ? !fieldConfig.options.hidden : true)"
			:label="fieldConfig.label"
			:name="fieldConfig.name" 
			:required="fieldConfig.required" 
			:rules="fieldConfig.rules">
			<snowy-file-picker-api 
				:disabled="disabled1" 
				idDataType="urlArr"
				:model-value="formData[fieldConfig.name]"
				@update="e => formItemChange(e,fieldConfig.name)">
			</snowy-file-picker-api>
		</uni-forms-item>
		
		<uni-forms-item
			v-if="fieldConfig && fieldConfig.type && fieldConfig.name && ['userSelector'].includes(fieldConfig.type) && (typeof(fieldConfig.options.hidden) === 'boolean' ? !fieldConfig.options.hidden : true)"
			:label="fieldConfig.label"
			:name="fieldConfig.name" 
			:required="fieldConfig.required" 
			:rules="fieldConfig.rules">
			<snowy-user-picker
				:disabled="disabled1"
				:model-value="formData[fieldConfig.name]"
				:isMultiple = "fieldConfig.options.isMultiple"
				:placeholder="fieldConfig.options.placeholder"
				:map="{key: 'id', label: 'name'}"
				@getOptData="selectorFunction.user.getOptData"
				:isPage="true"
				@getSelData="selectorFunction.user.getSelData"
				@update="e =>formItemChange(e,fieldConfig.name)">
			</snowy-user-picker>
		</uni-forms-item>
		
		<uni-forms-item
			v-if="fieldConfig && fieldConfig.type && fieldConfig.name && ['orgSelector'].includes(fieldConfig.type) && (typeof(fieldConfig.options.hidden) === 'boolean' ? !fieldConfig.options.hidden : true)"
			:label="fieldConfig.label"
			:name="fieldConfig.name" 
			:required="fieldConfig.required" 
			:rules="fieldConfig.rules">
			<snowy-sel-picker
				:searchEnabled="true"
				:disabled="disabled1"
				:model-value="formData[fieldConfig.name]"
				:isMultiple = "fieldConfig.options.isMultiple"
				:placeholder="fieldConfig.options.placeholder"
				:map="{key: 'id', label: 'name'}"
				@getOptData="selectorFunction.org.getOptData"
				:isPage="true"
				@getSelData="selectorFunction.org.getSelData"
				@update="e => formItemChange(e,fieldConfig.name)">
			</snowy-sel-picker>
		</uni-forms-item>
		
		<uni-forms-item
			v-if="fieldConfig && fieldConfig.type && fieldConfig.name && ['posSelector'].includes(fieldConfig.type) && (typeof(fieldConfig.options.hidden) === 'boolean' ? !fieldConfig.options.hidden : true)"
			:label="fieldConfig.label"
			:name="fieldConfig.name" 
			:required="fieldConfig.required" 
			:rules="fieldConfig.rules">
			<snowy-sel-picker
				:searchEnabled="true"
				:disabled="disabled1"
				:model-value="formData[fieldConfig.name]"
				:isMultiple = "fieldConfig.options.isMultiple"
				:placeholder="fieldConfig.options.placeholder"
				:map="{key: 'id', label: 'name'}"
				@getOptData="selectorFunction.pos.getOptData"
				:isPage="true"
				@getSelData="selectorFunction.pos.getSelData"
				@update="e => formItemChange(e,fieldConfig.name)">
			</snowy-sel-picker>
		</uni-forms-item>
		
		<uni-forms-item
			v-if="fieldConfig && fieldConfig.type && fieldConfig.name && ['roleSelector'].includes(fieldConfig.type) && (typeof(fieldConfig.options.hidden) === 'boolean' ? !fieldConfig.options.hidden : true)"
			:label="fieldConfig.label"
			:name="fieldConfig.name" 
			:required="fieldConfig.required" 
			:rules="fieldConfig.rules">
			<snowy-sel-picker
				:searchEnabled="true"
				:disabled="disabled1"
				:model-value="formData[fieldConfig.name]"
				:isMultiple = "fieldConfig.options.isMultiple"
				:placeholder="fieldConfig.options.placeholder"
				:map="{key: 'id', label: 'name'}"
				@getOptData="selectorFunction.role.getOptData"
				:isPage="true"
				@getSelData="selectorFunction.role.getSelData"
				@update="e => formItemChange(e,fieldConfig.name)">
			</snowy-sel-picker>
		</uni-forms-item>
		
		<uni-forms-item
			v-if="fieldConfig && fieldConfig.type && fieldConfig.name && ['editor'].includes(fieldConfig.type) && (typeof(fieldConfig.options.hidden) === 'boolean' ? !fieldConfig.options.hidden : true)"
			:label="fieldConfig.label"
			:name="fieldConfig.name" 
			:required="fieldConfig.required" 
			:rules="fieldConfig.rules">
			<editor 
				:placeholder="fieldConfig.options.placeholder"></editor>
		</uni-forms-item>
		
		<uni-forms-item
		  v-if="fieldConfig && fieldConfig.type && fieldConfig.name && ['batch'].includes(fieldConfig.type) && (typeof(fieldConfig.options.hidden) === 'boolean' ? !fieldConfig.options.hidden : true)"
		  :label="fieldConfig.label"
		  :name="fieldConfig.name" 
		  :required="fieldConfig.required" 
		>
		  <view >
		    <!-- 删除按钮 -->
		    <button
		      class="uni-btn"
		      type="warn"
		      :plain="true"
		      v-if="!disabled2"
		      @click="() => formData[fieldConfig.name].splice(index, 1)"
		    >
		      删除{{ fieldConfig.label }}
		    </button>
		
		    <!-- 子表单 -->
		    <uni-forms
			  v-if="fileShow"
		      :ref="`batch-form-ref-${fieldConfig.name}-${index}`"
		      :model="item"
		      label-position="top"
		      labelWidth="auto"
		      validate-trigger="submit"
		    >
			<block v-for="(field,index) in fieldConfig.list" :key="index">
				<uni-forms-item
					v-if="field && field.type && field.name && ['input','textarea','number'].includes(field.type) && (typeof(field.options.hidden) === 'boolean' ? !field.options.hidden : true)"
					:label="field.label"
					:name="field.name" 
					:required="field.required" 
					:rules="v.rules">
					<uni-easyinput
						:disabled="disabled1"
						:type="field.type"
						v-model="formData[field.name]"
						:placeholder="field.options.placeholder"
						 @change="e => formItemChange(e,field.name)"/>
				</uni-forms-item>
				  <uni-forms-item
				  	v-if="field && field.type && field.name && ['date'].includes(field.type) && (typeof(field.options.hidden) === 'boolean' ? !field.options.hidden : true)"
				  	:label="field.label"
				  	:name="field.name" 
				  	:required="field.required" 
				  	:rules="field.rules">
				  	<uni-datetime-picker
				  		:disabled="disabled1"
				  		v-model="formData[field.name]"
				  		:type="getDatetimePickerType(field.options.range, field.options.showTime)"
				  		:placeholder="field.options.placeholder"
				  		:start-placeholder="field.options.rangePlaceholder?field.options.rangePlaceholder[0]:null"
				  		:end-placeholder="field.options.rangePlaceholder?field.options.rangePlaceholder[1]:null"
				  		 return-type="string"
				  		:clear-icon="field.options.clearable"
				  		@change="e => formItemChange(e,field.name)">
				  	</uni-datetime-picker>
				  </uni-forms-item>
			</block>
		    </uni-forms>
		  </view>
		
		  <!-- 添加按钮 -->
		  <button
		    class="uni-btn"
		    type="primary"
		    :disabled="disabled3"
		    @click="buttonClick"
		  >
		    {{ fileShow? "收起"+fieldConfig.label:"增加"+fieldConfig.label }}
		  </button>
		</uni-forms-item>

		
	</view>
</template>
<script>
	import BatchFormItem from './batch-form-item.vue'
	import CallbackState from "@/enum/callback-state"
	export default {
		name: 'SnowyFormItem',
		components: {
			BatchFormItem
		},
		props:{
			fieldConfig: {
				type: Object,
				required: true,
			},
			fieldConfigDisable:{
				type: Boolean,
				default: null,
				required:false
			},
			formData: {
				type: Object,
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
					console.log('触发formData',this.formData)
				},
				immediate:true,
				deep:true
			},
			
		},
		computed:{
			disabled1(){
				const falg = typeof(this.fieldConfigDisable) === 'boolean' ? this.fieldConfigDisable : typeof(this.fieldConfig.options.disabled) === 'boolean' ? this.fieldConfig.options.disabled : false || false
				return falg
			},
			disabled2() {
				const falg = typeof(this.fieldConfig.options.disabled) === 'boolean' ? !this.fieldConfig.options.disabled : true || false
				return falg
			},
			disabled3() {
				const falg = typeof(this.fieldConfig.options.disabled) === 'boolean' ? this.fieldConfig.options.disabled : false || false
				return falg
			},
			
			
			
		},
		
		data() {
			return {
				fileShow:false,
				selectorFunction:{
					// 用户
					user: {
						getOptData: async ({ pageNo, pageSize, keyword }, callback) => {
							const parameter = { current: pageNo, size: pageSize, searchKey: keyword }
							this.$axios.request('/flwapp/flw/task/userSelector', "GET", {...parameter}).then((res) => {
								callback({ state: 'success', data: res.data?.records })
							})
							// const data = await taskApi.taskUserSelector(parameter)
							// callback({ state: CallbackState.SUCCESS, data: data?.records })
						},
						getSelData: async (curSelDataKey, callback) => {
							if (this.$snowy.tool.isNotEmpty(curSelDataKey)) {
								if(!this.fieldConfig.options.isMultiple){
									this.$axios.request('/flwapp/sys/userCenter/getUserListByIdList', "POST", {
										idList: [curSelDataKey]
									}).then((res) => {
										callback({ state: 'success', data: res.data[0] })
									})
									return
									// const data = await userCenterApi.userCenterGetUserListByIdList({
									// 	idList: [curSelDataKey]
									// })
									// callback({ state: CallbackState.SUCCESS, data: data[0] })
									// return
								}
								if(!!this.fieldConfig.options.isMultiple){
									this.$axios.request('/flwapp/sys/userCenter/getUserListByIdList', "POST", {
										idList: curSelDataKey
									}).then((res) => {
										callback({ state: 'success', data: res.data })
									})
									// const data = await userCenterApi.userCenterGetUserListByIdList({
									// 	idList: curSelDataKey
									// })
									// callback({ state: CallbackState.SUCCESS, data: data })
									// return
								}
								
							}
						}
					},
					// 组织
					org: {
						getOptData: async ({ pageNo, pageSize, keyword }, callback) => {
							const parameter = { current: pageNo, size: pageSize, searchKey: keyword }
							this.$axios.request('/flwapp/flw/task/orgSelector', "GET", {
								...parameter
							}).then((res) => {
								callback({ state: 'success', data: res.data?.records })
							})
							// const data = await taskApi.taskOrgSelector(parameter)
							// callback({ state: CallbackState.SUCCESS, data: data?.records })
						},
						getSelData: async (curSelDataKey, callback) => {
							if ($snowy.tool.isNotEmpty(curSelDataKey)) {
								if(!this.fieldConfig.options.isMultiple){
									this.$axios.request('/flwapp/sys/userCenter/getOrgListByIdList', "POST", {
										idList: [curSelDataKey]
									}).then((res) => {
										callback({ state: 'success', data: res.data[0] })
									})
									// const data = await userCenterApi.userCenterGetOrgListByIdList({
									// 	idList: [curSelDataKey]
									// })
									// callback({ state: CallbackState.SUCCESS, data: data[0] })
									return
								}
								if(!!this.fieldConfig.options.isMultiple){
									this.$axios.request('/flwapp/sys/userCenter/getOrgListByIdList', "POST", {
										idList: curSelDataKey
									}).then((res) => {
										callback({ state: 'success', data: res.data })
									})
									// const data = await userCenterApi.userCenterGetOrgListByIdList({
									// 	idList: curSelDataKey
									// })
									// callback({ state: CallbackState.SUCCESS, data: data })
									return
								}
								
							}
						}
					},
					// 职位
					pos: {
						getOptData: async ({ pageNo, pageSize, keyword }, callback) => {
							const parameter = { current: pageNo, size: pageSize, searchKey: keyword }
							this.$axios.request('/flwapp/flw/task/positionSelector', "GET", {
								...parameter
							}).then((res) => {
								callback({ state: 'success', data: res.data?.records })
							})
							// const data = await taskApi.taskPositionSelector(parameter)
							// callback({ state: CallbackState.SUCCESS, data: data?.records })
						},
						getSelData: async (curSelDataKey, callback) => {
							if ($snowy.tool.isNotEmpty(curSelDataKey)) {
								if(!this.fieldConfig.options.isMultiple){
									this.$axios.request('/flwapp/sys/userCenter/getPositionListByIdList', "POST", {
										idList: [curSelDataKey]
									}).then((res) => {
										callback({ state: 'success', data: res.data[0] })
									})
									// const data = await userCenterApi.userCenterGetPositionListByIdList({
									// 	idList: [curSelDataKey]
									// })
									// callback({ state: CallbackState.SUCCESS, data: data[0] })
									return
								}
								if(!!this.fieldConfig.options.isMultiple){
									this.$axios.request('/flwapp/sys/userCenter/getPositionListByIdList', "POST", {
										idList: curSelDataKey
									}).then((res) => {
										callback({ state: 'success', data: res.data })
									})
									// const data = await userCenterApi.userCenterGetPositionListByIdList({
									// 	idList: curSelDataKey
									// })
									// callback({ state: CallbackState.SUCCESS, data: data })
									return
								}
								
							}
						}
					},
					// 角色
					role: {
						getOptData: async ({ pageNo, pageSize, keyword }, callback) => {
							const parameter = { current: pageNo, size: pageSize, searchKey: keyword }
							this.$axios.request('/flwapp/flw/task/roleSelector', "GET", {
								...parameter
							}).then((res) => {
								callback({ state: 'success', data: res.data?.records })
							})
							// const data = await taskApi.taskRoleSelector(parameter)
							// callback({ state: CallbackState.SUCCESS, data: data?.records })
						},
						getSelData: async (curSelDataKey, callback) => {
							if (uni.$snowy.tool.isNotEmpty(curSelDataKey)) {
								if(!this.fieldConfig.options.isMultiple){
									this.$axios.request('/flwapp/sys/userCenter/getRoleListByIdList', "POST", {
										idList: [curSelDataKey]
									}).then((res) => {
										callback({ state: 'success', data: res.data[0] })
									})
									// const data = await userCenterApi.userCenterGetRoleListByIdList({
									// 	idList: [curSelDataKey]
									// })
									// callback({ state: CallbackState.SUCCESS, data: data[0] })
									return
								}
								if(!!this.fieldConfig.options.isMultiple){
									this.$axios.request('/flwapp/sys/userCenter/getRoleListByIdList', "POST", {
										idList: curSelDataKey
									}).then((res) => {
										callback({ state: 'success', data: res.data })
									})
									// const data = await userCenterApi.userCenterGetRoleListByIdList({
									// 	idList: curSelDataKey
									// })
									// callback({ state: CallbackState.SUCCESS, data: data })
									return
								}
								
							}
						}
					},
				},
			}
		},
		onload() {
			if(this.useDefault){
				// 默认值处理
				if(['input','textarea','number'].includes(this.fieldConfig.type)){
					this.formData[this.fieldConfig.name] = this.fieldConfig.options.defaultValue
				}else if(['radio','checkbox'].includes(this.fieldConfig.type)){
					this.formData[this.fieldConfig.name] = this.fieldConfig.options.defaultValue
				}else if(['select'].includes(this.fieldConfig.type)){
					if(this.fieldConfig.options.isMultiple){
						this.formData[this.fieldConfig.name] = [this.fieldConfig.options.defaultValue]
					}else{
						this.formData[this.fieldConfig.name] = this.fieldConfig.options.defaultValue
					}
				}else if(['date'].includes(this.fieldConfig.type)){
					if(this.fieldConfig.options.range){
						this.formData[this.fieldConfig.name] = this.fieldConfig.options.rangeDefaultValue
					}else{
						this.formData[this.fieldConfig.name] = this.fieldConfig.options.defaultValue
					}
				}else if(['time'].includes(this.fieldConfig.type)){
					this.formData[this.fieldConfig.name] = this.fieldConfig.options.defaultValue
				}else if(['rate'].includes(this.fieldConfig.type)){
					this.formData[this.fieldConfig.name] = this.fieldConfig.options.defaultValue
				}else if(['slider'].includes(this.fieldConfig.type)){
					this.formData[this.fieldConfig.name] = this.fieldConfig.options.defaultValue
				}else if(['switch'].includes(this.fieldConfig.type)){
					this.formData[this.fieldConfig.name] = this.fieldConfig.options.defaultValue
				}
			}
		},
		methods:{
			getDatetimePickerType(range, showTime){
				if(range){
					if(showTime){
						return 'datetimerange'
					}else{
						return 'daterange'
					}
				}else{
					if(showTime){
						return 'datetime'
					}else{
						return 'date'
					}
				}
			},
			formListValidate() {
				if(this.fieldConfig.type === 'batch'){
					const promiseList = []
					if(this.formData[this.fieldConfig.name]){
						this.formData[this.fieldConfig.name].forEach((item, index)=>{
							promiseList.push(new Promise((resolve, reject) => {
								this.$refs[`batch-form-ref-${ this.fieldConfig.name }-${ index }`][0].validate().then(result => {
									resolve(result)
								}).catch(err => {
									reject(err)
								})
							}))
						})
					}
					return new Promise((resolve, reject) => {
						Promise.all(promiseList).then((result) => {
							resolve(result)
						}).catch(err=>{
							reject(err)
						})
					})
				}
			},
			buttonClick(){
				this.fileShow = !this.fileShow
				if(!this.formData[this.fieldConfig.name]){
					this.formData[this.fieldConfig.name] = []
				}
				this.formData[this.fieldConfig.name].push({})
			},
			formItemChange(e,key) {
				this.$set(this.formData,key,e)
				this.$emit('update',this.formData)
				console.log('==触发change',e,key,this.formData)
				this.$forceUpdate()
			}
 		}
	}
	
	
	
</script>

<style lang="scss">
	.uni-input {
		height: 50rpx;
		padding: 15rpx 25rpx;
		line-height:50rpx;
		font-size:28rpx;
		background:#FFF;
		flex: 1;
	}
	.input-value-border {
		border: 1px solid $uni-border-2;
		border-radius: 5upx;
	}
</style>
