<template>
	<view class="snowy-tree-picker">
		<view @tap="tapInput" :class="{ 'input-disabled': props.disabled }">
			<view class="input-value">
				<!-- 单选 -->
				<view v-if="!isMultiple && curSelDataKey && curSelDataKey !== ''">
					{{ curSelData[map.label] }}
				</view>
				<!-- 多选 -->
				<view class="multiple" v-else-if="!!isMultiple && curSelDataKey && curSelDataKey.length > 0" v-for="(item, key, index) in curSelData" :key="index">
					{{ item[map.label] }}
				</view>
				<view class="placeholder" v-else>
					{{ placeholder }}
				</view>
			</view>
		</view>
		<uni-popup ref="popRef" type="bottom" background-color="transparent" maskBackgroundColor="rgba(0, 0, 0, 0.6)">
			<view class="snowy-shadow pop-container">
				<view class="action">
					<view class="snowy-color-grey snowy-text-bold" @click="cancel"> 取消 </view>
					<view class="snowy-color-primary snowy-text-bold" @click="confirm"> 确定 </view>
				</view>
				<!-- 已选择 -->
				<scroll-view :scroll-y="true" class="snowy-shadow choiced" :style="{ maxHeight: !isMultiple ? '5vh' : '10vh' }" v-show="!!curSelDataKey && (!isMultiple? true : curSelDataKey.length > 0)">
					<!-- 单选已选择 -->
					<view class="single" v-if="!isMultiple">
						<view class="snowy-color-white" @click="delData(curSelData)">
							{{ curSelData[map.label] }}
						</view>
						<view class="icon">
							<icon type="clear" @click="delData(curSelData)" color="#ffffff" size="12"></icon>
						</view>
					</view>
					<!-- 多选已选择 -->
					<view class="multiple" v-if="!!isMultiple" v-for="(item, index) in curSelData">
						<view class="snowy-color-white" @click="delData(item)">
							{{ item[map.label] }}
						</view>
						<view class="icon">
							<icon type="clear" @click="delData(item)" color="#ffffff" size="12"></icon>
						</view>
					</view>
				</scroll-view>
				<!-- 面包屑 -->
				<view class="snowy-shadow">
					<snowy-crumb :crumbData="allClickSelData" @clickCruItem="({ item, index })=>clickDataCru(item, index)"></snowy-crumb>
				</view>
				<!-- 面板数据 -->
				<scroll-view class="data" :scroll-y="true">
					<view class="snowy-shadow snowy-item snowy-padding" :class="{ 'item-sel': !isMultiple ? item[map.key] == curSelDataKey: curSelDataKey.indexOf(item[map.key]) != -1 }" v-for="(item, index) in curClickSelData" :key="index" :index="index">
						<uni-row>
							<uni-col :span="2">
								<view>
									<uni-icons v-show="!isMultiple ? item[map.key] != curSelDataKey: curSelDataKey.indexOf(item[map.key]) == -1" type="circle" :size="20" @click="selData(item, index)"></uni-icons>
									<uni-icons v-show="!isMultiple ? item[map.key] == curSelDataKey: curSelDataKey.indexOf(item[map.key]) != -1" type="checkbox-filled" :size="20" color="#5677fc" @click="delData(item, index)"></uni-icons>
								</view>
							</uni-col>
							<uni-col :span="20">
								<view class="snowy-text-bold snowy-text-ellipsis" @click="selOrDelData(item, index)">{{ item[map.label] }}</view>
							</uni-col>
							<uni-col :span="2">
								<view class="snowy-flex-end">
									<uni-icons v-if="$xeu.isEmpty(item[map.children]) ? false : true" type="forward" size="20" @click="clickData(item, index)"></uni-icons>
								</view>
							</uni-col>
						</uni-row>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>
<script setup>
	import { reactive, ref, getCurrentInstance, watch, inject } from "vue"
	import CallbackState from "@/enum/callback-state";
	const emits = defineEmits(['update:modelValue', 'noFindKey', 'getTreeOptData', 'cancel', 'confirm'])
	const props = defineProps({
		modelValue: [Number, String, Array],
		isMultiple: {
			type: Boolean,
			default: false,
			required: false
		},
		placeholder: {
			type: String,
			default: "请选择机构",
			required: false
		},
		isTopLevel: {
			type: Boolean,
			default: false,
			required: false
		},
		map: {
			type: Object,
			default: {
				key: "key",
				parentKey: "parentKey",
				children: "children",
				label: "label"
			},
			required: false
		},
	})
	// 弹出
	const popRef = ref()
	// 当前选中的数据key及数据
	const curSelDataKey = !props.isMultiple ? ref("") : ref([])
	const curSelData = !props.isMultiple ? ref({}) : ref([])
	// 所有点击选中数据【页面数据】
	const allClickSelData = ref([])
	// 当前点击选中数据【页面数据】
	const curClickSelData = ref([])
	const setSelData = () => {
		emits('getTreeOptData', null, ({ state, treeData, msg }) => {
			// 回调错误异常处理
			if (state === CallbackState.ERROR) {
				return uni.$snowy.modal.alert(msg)
			}
			if (props.isTopLevel) {
				// 含有顶级
				curClickSelData.value = [{
					[props.map.key]: '0',
					[props.map.parentKey]: '-1',
					[props.map.label]: '顶级',
					[props.map.children]: treeData || []
				}]
				allClickSelData.value = [{
					[props.map.key]: '-1',
					[props.map.label]: '全部',
					[props.map.children]: [{
						[props.map.key]: '0',
						[props.map.parentKey]: '-1',
						[props.map.label]: '顶级',
						[props.map.children]: treeData || []
					}]
				}]
			}
			if (!props.isTopLevel) {
				// 不含有顶级
				curClickSelData.value = treeData || []
				allClickSelData.value = [{
					[props.map.key]: '0',
					[props.map.parentKey]: '-1',
					[props.map.label]: '全部',
					[props.map.children]: treeData || []
				}]
			}
			// 单选curSelData初始化值赋值
			if (!props.isMultiple) {
				curSelDataKey.value = props.modelValue ? uni.$xeu.clone(props.modelValue, true) : ""
				curSelData.value = {}
				if (uni.$snowy.tool.isEmpty(curSelDataKey.value)) {
					return
				}
				const findSelData = uni.$xeu.findTree(allClickSelData.value || [], item => {
					return curSelDataKey.value === item[props.map.key]
				})
				if (uni.$snowy.tool.isEmpty(findSelData?.item)) {
					// 无法找到已选中数据
					curSelData.value = {
						[props.map.key]: curSelDataKey.value,
						[props.map.label]: '该数据无权限或不存在',
						[props.map.children]: []
					}
					emits('noFindKey', {
						[props.map.key]: curSelDataKey.value,
					}, (val) => {
						curSelData.value = val
					})
					return
				}
				curSelData.value = findSelData.item
				return
			}
			// 多选curSelData初始化值赋值
			if (!!props.isMultiple) {
				curSelDataKey.value = props.modelValue ? uni.$xeu.clone(props.modelValue, true) : []
				curSelData.value = []
				if (uni.$snowy.tool.isEmpty(curSelDataKey.value)) {
					return
				}
				for (let item of curSelDataKey.value) {
					// 返回数据为空
					if (uni.$snowy.tool.isEmpty(allClickSelData.value)) {
						// 无法找到已选中数据
						let notFindSelDataItem = {
							[props.map.key]: item,
							[props.map.label]: '该数据无权限或不存在',
							[props.map.children]: []
						}
						emits('noFindKey', {
							[props.map.key]: item,
						}, (val) => {
							notFindSelDataItem = val
						})
						curSelData.value.push(notFindSelDataItem)
						continue;
					}
					const findSelDataItem = uni.$xeu.findTree(allClickSelData.value || [], i => {
						return item == i[props.map.key]
					})
					// 返回数据不为空，但找不到数据
					if (uni.$snowy.tool.isEmpty(findSelDataItem?.item)) {
						// 无法找到已选中数据
						let notFindSelDataItem = {
							[props.map.key]: item,
							[props.map.label]: '该数据无权限或不存在',
							[props.map.children]: []
						}
						emits('noFindKey', {
							[props.map.key]: item,
						}, (val) => {
							notFindSelDataItem = val
						})
						curSelData.value.push(notFindSelDataItem)
						continue;
					}
					curSelData.value.push(findSelDataItem?.item)
				}
				// curSelData.value = uni.$xeu.filterTree(allClickSelData.value, item => {
				// 	return curSelDataKey.value.includes(item[props.map.key])
				// })
			}
		})
	}
	setSelData()
	watch(() => props.modelValue, (newValue, oldValue) => {
		if (newValue !== oldValue) {
			setSelData()
		}
	}, {
		deep: false,
		immediate: false
	})
	// 点击输入框
	const tapInput = () => {
		// 重新初始化数据，防止数据更新
		popRef.value.open()
	}
	// 点击面包屑
	const clickDataCru = (item, index) => {
		curClickSelData.value = item[props.map.children]
		allClickSelData.value.splice(index + 1, allClickSelData.value.length - (index + 1))
	}
	// 选择或删除数据
	const selOrDelData = (item, index) => {
		if (!props.isMultiple) {
			if (item[props.map.key] != curSelDataKey.value) {
				selData(item, index)
			} else {
				delData(item, index)
			}
		} else {
			if (!curSelDataKey.value.includes(item[props.map.key])) {
				selData(item, index)
			} else {
				delData(item, index)
			}
		}
	}
	// 选择数据
	const selData = (item, index) => {
		if (!props.isMultiple) {
			curSelDataKey.value = item[props.map.key]
			curSelData.value = item
		} else {
			curSelDataKey.value.push(item[props.map.key])
			curSelData.value.push(item)
		}
	}
	// 移除数据
	const delData = (item, index) => {
		if (!props.isMultiple) {
			curSelDataKey.value = ""
			curSelData.value = {}
		} else {
			curSelDataKey.value.splice(curSelDataKey.value.findIndex(curSelDataKeyItem => curSelDataKeyItem === item[props.map.key]), 1);
			curSelData.value.splice(curSelData.value.findIndex(curSelDataItem => curSelDataItem[props.map.key] === item[props.map.key]), 1);
		}
	}
	// 点击数据
	const clickData = (item, index) => {
		if (uni.$xeu.isEmpty(item[props.map.children])) {
			return
		}
		curClickSelData.value = item[props.map.children]
		allClickSelData.value.push(item)
	}
	// 取消
	const cancel = () => {
		// 重置数据
		setSelData()
		popRef.value.close()
	}
	const confirm = () => {
		// 更新数据
		emits('update:modelValue', curSelDataKey.value)
		// 调用父组件方法
		emits('confirm', {
			curSelDataKey: curSelDataKey.value,
			curSelData: curSelData.value
		})
		popRef.value.close()
	}
</script>
<style lang="scss" scoped>
	@import '@/static/scss/index.scss';

	::v-deep .uni-row {
		@extend .snowy-flex-v-center;
	}

	.snowy-tree-picker {
		width: 100%;
	}

	.input-value {
		font-size: 28rpx;
		line-height: 30rpx;
		padding: 20rpx;
		border: 1px solid #EDEDED;
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
		background-color: #f7f7f7;
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