<template>
	<view class="snowy-sel-picker">
		<view @tap="tapInput" :class="{ 'input-disabled': disabled }">
			<view class="input-value">
				<!-- 单选 -->
				<view v-if="!isMultiple && curSelDataKey && curSelDataKey !== ''">
					{{ map.label && curSelData[map.label] }}
				</view>
				<!-- 多选 -->
				<view class="multiple" v-else-if="!!isMultiple && curSelDataKey && curSelDataKey.length > 0" v-for="(item, key, index) in curSelData" :key="index">
					{{ map.label && item[map.label] }}
				</view>
				<view class="placeholder" v-else>
					{{ placeholder }}
				</view>
			</view>
		</view>
		<uni-popup ref="popRef" type="bottom" background-color="transparent" maskBackgroundColor="rgba(0, 0, 0, 0.6)">
			<view class="snowy-shadow pop-container" v-if="popShow">
				<view class="action">
					<view class="snowy-color-grey snowy-text-bold" @click="cancel"> 取消 </view>
					<view class="snowy-color-primary snowy-text-bold" @click="confirm"> 确定 </view>
				</view>
				<!-- 已选择 -->
				<scroll-view :scroll-y="true" class="snowy-shadow choiced" :style="{ maxHeight: !isMultiple? '5vh' : '10vh' }" v-show="!!curSelDataKey && (!isMultiple? true : curSelDataKey.length > 0)">
					<!-- 单选已选择 -->
					<view class="single" v-if="!isMultiple">
						<view class="snowy-color-white" @click="delData(curSelData)">
							{{ map.label && curSelData[map.label] }}
						</view>
						<view class="icon">
							<icon type="clear" @click="delData(curSelData)" color="#ffffff" size="12"></icon>
						</view>
					</view>
					<!-- 多选已选择 -->
					<view class="multiple" v-if="!!isMultiple" v-for="(item, index) in curSelData" :key="index">
						<view class="snowy-color-white" @click="delData(item)">
							{{ map.label && item[map.label] }}
						</view>
						<view class="icon">
							<icon type="clear" @click="delData(item)" color="#ffffff" size="12"></icon>
						</view>
					</view>
				</scroll-view>
				<!-- 搜索 -->
				<view v-if="searchEnabled">
					<slot name="search">
						<view class="snowy-item">
							<snowy-search v-model="optParam[optParamMap.keyword]" @confirm="searchConfirm" @clear="searchClear" :customStyle="{'padding': 0}">
							</snowy-search>
						</view>
					</slot>
				</view>
				<!-- 面板数据 -->
				<view class="data">
					<z-paging ref="optDataPagingRef" :fixed="false" use-virtual-list :force-close-inner-list="true" cell-height-mode="dynamic" @virtualListChange="virtualListChange" @query="queryList" :auto="autoLoadOptData" :refresher-enabled="optDataRefresherEnabled">
						<view class="snowy-shadow snowy-item snowy-padding" :id="`zp-id-${item.zp_index}`" :key="item.zp_index" v-for="(item,index) in panelData" :class="{ 'item-sel': !isMultiple ? item[map.key] == curSelDataKey: curSelDataKey.indexOf(item[map.key]) != -1 }" @click="selOrDelData(item, index)">
							<uni-row>
								<uni-col :span="22">
									<!-- <slot name="option" :item="item"> -->
										<view class="snowy-text-bold snowy-text-ellipsis"> {{item[map.label]}} </view>
									<!-- </slot> -->
								</uni-col>
								<uni-col :span="2">
									<uni-icons v-show="!isMultiple ? item[map.key] != curSelDataKey: curSelDataKey.indexOf(item[map.key]) == -1" type="circle" :size="20"></uni-icons>
									<uni-icons v-show="!isMultiple ? item[map.key] == curSelDataKey: curSelDataKey.indexOf(item[map.key]) != -1" type="checkbox-filled" :size="20" color="#2979ff"></uni-icons>
								</uni-col>
							</uni-row>
						</view>
					</z-paging>
				</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import XEUtils from '@/plugins/xe-utils'
	import CallbackState from "@/enum/callback-state";
	export default {
		props:{
			modelValue: [String, Array, Number],
			dataType: {
				type: String,
				default: false,
				default: () => '' // ''(空字符串) "string" "array"（多选以逗号进行分割）
			},
			isMultiple: {
				type: Boolean,
				default: false,
				required: false
			},
			placeholder: {
				type: String,
				default: "请选择",
				required: false
			},
			map: {
				type: Object,
				default: () => {
					return {
						key: "key",
						label: "label"
					}
				},
				required: false
			},
			optParamMap: {
				type: Object,
				default: () => {
					return {
						pageNo: 'pageNo',
						pageSize: 'pageSize',
						keyword: 'keyword'
					}
				},
				required: false
			},
			disabled: {
				type: Boolean,
				default: false,
				required: false
			},
			// 是否开启分页模式，如果开启分页模式，
			// 那么就要实现getSelData方法，并提供相应的回调（通过服务端获取已选择的数据）
			// 与此同时要实现getOptData方法（用于分页加载）
			isPage: {
				type: Boolean,
				default: false,
				required: false
			},
			searchEnabled: {
				type: Boolean,
				default: false,
				required: false
			},
			autoLoadOptData: {
				type: Boolean,
				default: true,
				required: false
			},
			optDataRefresherEnabled: {
				type: Boolean,
				default: true,
				required: false
			}
		},
		data() {
			return{
				panelData:[],
				popRef:null,
				popShow:false,
				curSelDataKey:[],
				curSelData:null,
				optParam:{},
				optDataPagingRef:null,
			}
		},
		mounted() {
			this.curSelDataKey = !this.isMultiple ? '' : []
			this.curSelData = !this.isMultiple ? {} : []
			this.optParam = {[this.optParamMap.keyword]: ''}
			
			this.setSelData()
		},
		watch:{
			modelValue:{
				handler(newValue, oldValue) {
					if (newValue != oldValue) {
						this.setSelData()
					}
				},
				deep: true, // 深度监听
				immediate: true  // 第一次改变就执行
			}
		},
		methods:{
			setOptParam(data) {
				this.optParam = { ...this.optParam, ...data }
			},
			setSelData() {
				if (!this.isMultiple) {
					if (this.$snowy.tool.isNotEmpty(this.modelValue)) {
						if ('array' === this.dataType) {
							this.curSelDataKey = XEUtils.clone(this.modelValue[0], true)
						} else {
							this.curSelDataKey = XEUtils.clone(this.modelValue, true)
						}
					}
					// curSelDataKey.value = this.modelValue ? XEUtils.clone(this.modelValue, true) : ""
					this.curSelData = {}
					if (this.$snowy.tool.isEmpty(this.curSelDataKey)) {
						return
					}
					// 单选分页
					if (!!this.isPage) {
						this.$emit('getSelData', this.curSelDataKey, ({ state, data, msg }) => {
							// 回调错误异常处理
							if (state === CallbackState.ERROR) {
								return this.$snowy.modal.alert(msg)
							}
							if (this.$snowy.tool.isEmpty(data)) {
								// 单选无法找到已选中数据
								this.curSelData = {
									[this.map.key]: this.curSelDataKey,
									[this.map.label]: '该数据无权限或不存在'
								}
								this.$emit('noFindKey', {
									[this.map.key]: this.curSelDataKey,
								}, (val) => {
									this.curSelData = val
								})
								return
							}
							return this.curSelData = data
						})
					}
					// 单选不分页
					if (!this.isPage) {
						this.$emit('getOptData', this.optParam, ({ state, data, msg }) => {
							// 回调错误异常处理
							if (state === CallbackState.ERROR) {
								return this.$snowy.modal.alert(msg)
							}
							const findSelData = XEUtils.find(data || [], item => {
								return this.curSelDataKey == item[this.map.key]
							})
							if (this.$snowy.tool.isEmpty(findSelData)) {
								// 无法找到已选中数据
								this.curSelData = {
									[this.map.key]: this.curSelDataKey,
									[this.map.label]: '该数据无权限或不存在'
								}
								this.$emit('noFindKey', {
									[this.map.key]: this.curSelDataKey,
								}, (val) => {
									this.curSelData = val
								})
								return
							}
							this.curSelData = findSelData
						})
					}
					return
				}
				// 多选curSelData初始化值赋值
				if (!!this.isMultiple) {
					if (this.$snowy.tool.isNotEmpty(this.modelValue)) {
						if ('string' === this.dataType) {
							this.curSelDataKey = XEUtils.clone(this.modelValue.split(','), true)
						} else {
							this.curSelDataKey = XEUtils.clone(this.modelValue, true)
						}
					}
					// curSelDataKey.value = this.modelValue ? XEUtils.clone(this.modelValue, true) : []
					this.curSelData = []
					if (this.$snowy.tool.isEmpty(this.curSelDataKey)) {
						return
					}
					// 多选分页
					if (!!this.isPage) {
						this.$emit('getSelData', this.curSelDataKey, ({ state, data, msg }) => {
							// 回调错误异常处理
							if (state === CallbackState.ERROR) {
								return this.$snowy.modal.alert(msg)
							}
							for (let item of this.curSelDataKey) {
								if (this.$snowy.tool.isEmpty(data)) {
									// 无法找到已选中数据
									let notFindSelDataItem = {
										[this.map.key]: item,
										[this.map.label]: '该数据无权限或不存在'
									}
									this.$emit('noFindKey', {
										[this.map.key]: item,
									}, (val) => {
										notFindSelDataItem = val
									})
									this.curSelData.push(notFindSelDataItem)
									continue;
								}
								const findSelDataItem = XEUtils.find(data || [], i => {
									return item == i[this.map.key]
								})
								if (this.$snowy.tool.isEmpty(findSelDataItem)) {
									// 无法找到已选中数据
									let notFindSelDataItem = {
										[this.map.key]: item,
										[this.map.label]: '该数据无权限或不存在'
									}
									this.$emit('noFindKey', {
										[this.map.key]: item,
									}, (val) => {
										notFindSelDataItem = val
									})
									this.curSelData.push(notFindSelDataItem)
									continue;
								}
								this.curSelData.push(findSelDataItem)
							}
						})
					}
					// 多选不分页
					if (!this.isPage) {
						this.$emit('getOptData', this.optParam, ({ state, data, msg }) => {
							// 回调错误异常处理
							if (state === CallbackState.ERROR) {
								return this.$snowy.modal.alert(msg)
							}
							for (let item of this.curSelDataKey) {
								// 返回数据为空
								if (this.$snowy.tool.isEmpty(data)) {
									// 无法找到已选中数据
									let notFindSelDataItem = {
										[this.map.key]: item,
										[this.map.label]: '该数据无权限或不存在'
									}
									this.$emit('noFindKey', {
										[this.map.key]: item,
									}, (val) => {
										notFindSelDataItem = val
									})
									this.curSelData.push(notFindSelDataItem)
									continue;
								}
								const findSelDataItem = XEUtils.find(data || [], i => {
									return item == i[this.map.key]
								})
								// 返回数据不为空，但找不到数据
								if (this.$snowy.tool.isEmpty(findSelDataItem)) {
									// 无法找到已选中数据
									let notFindSelDataItem = {
										[this.map.key]: item,
										[this.map.label]: '该数据无权限或不存在'
									}
									this.$emit('noFindKey', {
										[this.map.key]: item,
									}, (val) => {
										notFindSelDataItem = val
									})
									this.curSelData.push(notFindSelDataItem)
									continue;
								}
								this.curSelData.push(findSelDataItem)
							}
						})
					}
				}
			},
			searchConfirm(val){
				this.$emit('searchConfirm', val)
				this.$refs.optDataPagingRef.reload()
			},
			searchClear() {
				this.$emit('searchClear')
				this.$refs.optDataPagingRef.reload()
			},
			tapInput() {
				this.$refs.popRef.open()
				this.popShow = true
			},
			selOrDelData(item, index){
				if (!this.isMultiple) {
					if (item[this.map.key] != this.curSelDataKey) {
						this.selData(item, index)
					} else {
						this.delData(item, index)
					}
				} else {
					if (!this.curSelDataKey.includes(item[this.map.key])) {
						this.selData(item, index)
					} else {
						this.delData(item, index)
					}
				}
			},
			selData(item, index) {
				if (!this.isMultiple) {
					this.curSelDataKey = item[this.map.key]
					this.curSelData = item
				} else {
					this.curSelDataKey.push(item[this.map.key])
					this.curSelData.push(item)
				}
			},
			delData(item, index){
				if (!this.isMultiple) {
					this.curSelDataKey = ""
					this.curSelData = {}
				} else {
					this.curSelDataKey.splice(this.curSelDataKey.findIndex(curSelDataKeyItem => curSelDataKeyItem === item[this.map.key]), 1);
					this.curSelData.splice(this.curSelData.findIndex(curSelDataItem => curSelDataItem[this.map.key] === item[this.map.key]), 1);
				}
			},
			cancel() {
				this.setSelData()
				this.$emit('cancel')
				this.popShow = false
				this.$refs.popRef.close()
			},
			confirm() {
				let curSelDataKeyVal = this.curSelDataKey
				// 单选
				if (!this.isMultiple && 'array' === this.dataType) {
					curSelDataKeyVal = [this.curSelDataKey]
				}
				// 多选
				if (!!this.isMultiple && 'string' === this.dataType) {
					curSelDataKeyVal = this.curSelDataKey.join(',')
				}
				// 更新数据
				this.$emit('update', curSelDataKeyVal)
				// 调用父组件方法
				this.$emit('confirm', {
					curSelDataKey: curSelDataKeyVal,
					curSelData: this.curSelData
				})
				this.popShow = false
				this.$refs.popRef.close()
			},
			virtualListChange(vList) {
				this.panelData = vList;
			},
			queryList(pageNo, pageSize){
				if (!this.isPage) {
					this.$emit('getOptData', this.optParam, ({ state, data, msg }) => {
						// 回调错误异常处理
						if (state === 'error') {
							return this.$snowy.modal.alert(msg)
						}
						this.$refs.optDataPagingRef.setLocalPaging(data)
					})
				}
				if (!!this.isPage) {
					this.$emit('getOptData', {
						...this.optParam,
						[this.optParamMap.pageNo]: pageNo,
						[this.optParamMap.pageSize]: pageSize,
					}, ({ state, data, msg }) => {
						// 回调错误异常处理
						if (state ===  'error') {
							return this.$snowy.modal.alert(msg)
						}
						this.$refs.optDataPagingRef.complete(data)
					})
				}
			},
			reloadOptData() {
				this.$refs.optDataPagingRef.reload()
			}
			
			
		}
	
	}
</script>
<style lang="scss" scoped>
	@import '@/static/scss/index.scss';

	::v-deep .uni-row {
		@extend .snowy-flex-v-center;
	}

	.snowy-sel-picker {
		width: 100%;
	}

	.input-value {
		font-size: 28rpx;
		line-height: 30rpx;
		padding: 20rpx;
		border: 1rpx solid #EDEDED;
		border-radius: 5rpx;

		.multiple {
			display: inline-block;
			margin: 3rpx 10rpx 3rpx 0
		}

		.placeholder {
			color: #909399;
		}
	}

	.input-disabled {
		pointer-events: none;
		background-color: rgb(247, 246, 246);
		color: rgb(192, 192, 192);
	}

	.pop-container {
		margin: 5rpx;
		padding: 10rpx;
		// background-color: #f7f7f7;
	}

	.action {
		display: flex;
		justify-content: space-between;
		margin: 30rpx;
	}

	.choiced {
		background: #5677fc;
		margin: 20rpx 0;
		padding: 10rpx 0;

		.single {
			margin: 5rpx 30rpx;
			display: inline-flex;
		}

		.multiple {
			margin: 10rpx 0 10rpx 30rpx;
			display: inline-flex;
		}

		.icon {
			display: flex;
			align-items: center;
			margin-left: 5rpx;
		}
	}

	.data {
		height: 50vh;
		background-color: #f7f7f7;
		padding-top: 10rpx;

		.item-sel {
			box-shadow: 1rpx 2rpx 2rpx $snowy-primary;
		}
	}
</style>