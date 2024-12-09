<template>
	<!-- v-bind="$attrs" -->
	<snowy-sel-picker
		:searchEnabled="true"
		:searchSeniorEnable="true"
		:disabled="disabled"
		:model:value="modelValue"
		:isMultiple="isMultiple"
		:placeholder="placeholder"
		:map="map"
		:isPage="isPage"
		@update="updateFun"
		@getOptData="getOptData"
		@getSelData="getSelData"
		@confirm="confirm">
		<template slot="option" slot-scope="{ data }">
			<uni-row  v-if="data && data.item">
				<uni-col :span="4">
					<image style="width: 75rpx; height: 75rpx; border-radius: 10rpx;" :src="data.item.avatar || '/static/logo.png'" mode="widthFix"></image>
				</uni-col>
				<uni-col :span="20">
					<view class="snowy-text-bold">{{data.item.name}}</view>
					<view class="snowy-sub-title">
						{{ `${data.item.orgName} | ${data.item.positionName} | ${data.item.genderName}` }}
					</view>
				</uni-col>
			</uni-row>
		</template>
	</snowy-sel-picker>
	
</template>
<script>
	export default{
		name: "SnowyUserPicker",
		props:{
			disabled: {
				type: Boolean,
				required: false
			},
			modelValue: {
				type: String,
				required: false
			},
			isMultiple: {
				type: Boolean,
				required: false
			},
			placeholder: {
				type: String,
				required: false
			},
			map: {
				type: Object,
				required: false
			},
			isPage: {
				type: Boolean,
				required: false
			},
		},
		data() {
			return{
				
			}
		},
		methods:{
			getSelData(curSelDataKey, callback) {
				this.$emit('getSelData', curSelDataKey, callback)
			},
			getOptData(param, callback) {
				this.$emit('getOptData', param, callback)
			},
			confirm({ curSelDataKey, curSelData }){
				this.$emit('confirm', { curSelDataKey, curSelData })
			},
			updateFun(e) {
				this.$emit('update',e)
			}
		},
	}
</script>
<style lang="scss" scoped>
</style>