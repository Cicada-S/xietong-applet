<template>
	<view>
		<tui-time-axis>
			<tui-timeaxis-item backgroundColor="transparent" v-for="(node,index) in resultNodeData" :key="index">
				<template v-slot:node>
					<uni-icons type="person-filled" size="25" :color="getIconColor(node)"></uni-icons>
				</template>
				<template v-slot:content>
					<view>
						<!--头部标题-->
						<view v-if="node.title && node.type !== 'parallelGateway' && node.type !== 'exclusiveGateway'"
							class="st-title snowy-flex-v-center" :class="{
								'is-required': node.properties.participateInfo[0].key === 'CUSTOM' && (!node.userInfo || node.userInfo.length === 0)
							}">
							{{ node.title }}
						</view>
						<!--并行路由/条件路由-->
						<view v-if="node.type === 'parallelGateway' || node.type === 'exclusiveGateway'">
							<uni-data-checkbox mode="tag" v-model="node.checkedValue"
								:localdata="node.conditionNodeList" :map="{
									text:'title',
									value:'id'
								}" @change="(evt) => handleRadioChange(node, evt)">
							</uni-data-checkbox>
						</view>
						<view v-if="node.properties.participateInfo[0].key === 'CUSTOM'" style="margin-top: 45rpx;">
							<snowy-user-picker v-if="node.properties.participateInfo[0].extJson.selectType === 'USER'"
								:model-value="node.userInfo" dataType="array" :map="{key: 'id', label: 'name'}"
								@getOptData="selectorFunction.user.getOptData" :isPage="true"
								@getSelData="selectorFunction.user.getSelData"
								@confirm="({curSelDataKey, curSelData}) => handleChange(node, curSelDataKey)"
								@update="e => node.userInfo = e">
							</snowy-user-picker>
							<snowy-sel-picker v-if="node.properties.participateInfo[0].extJson.selectType === 'ROLE'"
								:searchEnabled="true" :model-value="node.userInfo" dataType="array"
								:map="{key: 'id', label: 'name'}" @getOptData="selectorFunction.role.getOptData"
								:isPage="true" @getSelData="selectorFunction.role.getSelData"
								@confirm="({curSelDataKey, curSelData}) => handleChange(node, curSelDataKey)"
								@update="e => node.userInfo = e">
							</snowy-sel-picker>
							<snowy-sel-picker v-if="node.properties.participateInfo[0].extJson.selectType === 'ORG'"
								:searchEnabled="true" :model-value="node.userInfo" dataType="array"
								:map="{key: 'id', label: 'name'}" @getOptData="selectorFunction.org.getOptData"
								:isPage="true" @getSelData="selectorFunction.org.getSelData"
								@confirm="({curSelDataKey, curSelData}) => handleChange(node, curSelDataKey)"
								@update="e => node.userInfo = e">
							</snowy-sel-picker>
							<snowy-sel-picker
								v-if="node.properties.participateInfo[0].extJson.selectType === 'POSITION'"
								:searchEnabled="true" :model-value="node.userInfo" dataType="array"
								:map="{key: 'id', label: 'name'}" @getOptData="selectorFunction.pos.getOptData"
								:isPage="true" @getSelData="selectorFunction.pos.getSelData"
								@update="e => node.userInfo = e">
							</snowy-sel-picker>
						</view>
					</view>
				</template>
			</tui-timeaxis-item>
			<tui-timeaxis-item backgroundColor="transparent">
				<template v-slot:node>
					<uni-icons type="smallcircle" size="25" color="#5677fc"></uni-icons>
				</template>
				<template v-slot:content>
					<view>
						<view class="st-title">
							结束
						</view>
					</view>
				</template>
			</tui-timeaxis-item>
		</tui-time-axis>
	</view>
</template>
<script>
	import CallbackState from "@/enum/callback-state"
	import taskApi from '@/api/flw/task-api'
	import userCenterApi from '@/api/sys/user-center-api'
	export default {
		props: {
			modelDesignData: {
				type: Object,
				default: () => {}
			},
			orgTreeApi: {
				type: Function
			},
			userPageApi: {
				type: Function
			},
			orgPageApi: {
				type: Function
			},
			positionPageApi: {
				type: Function
			},
			rolePageApi: {
				type: Function
			}
		},
		data() {
			return {
				rootNodeData: [],
				resultNodeData: [],
				resultNodeDataBk: [],
				selectedNodeId: null,
				parentIds: [],
				selectorFunction: {
					// 用户
					user: {
						getOptData: async ({
							pageNo,
							pageSize,
							keyword
						}, callback) => {
							// const parameter = { current: pageNo, size: pageSize, searchKey: keyword }
							// const data = await taskApi.taskUserSelector(parameter)
							// callback({ state: CallbackState.SUCCESS, data: data?.records })
						},
						getSelData: async (curSelDataKey, callback) => {
							if (this.$snowy.tool.isNotEmpty(curSelDataKey)) {
								const data = await userCenterApi.userCenterGetUserListByIdList({
									idList: [curSelDataKey]
								})
								callback({
									state: CallbackState.SUCCESS,
									data: data[0]
								})
							}
						}
					},
					// 组织
					org: {
						getOptData: async ({
							pageNo,
							pageSize,
							keyword
						}, callback) => {
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
							if (this.$snowy.tool.isNotEmpty(curSelDataKey)) {
								this.$axios.request('/flwapp/sys/userCenter/getOrgListByIdList', "POST", {
									idList: [curSelDataKey]
								}).then((res) => {
									callback({ state: 'success', data: res.data[0] })
								})
								// const data = await userCenterApi.userCenterGetOrgListByIdList({
								// 	idList: [curSelDataKey]
								// })
								// callback({ state: CallbackState.SUCCESS, data: data[0] })
							}
						}
					},
					// 职位
					pos: {
						getOptData: async ({
							pageNo,
							pageSize,
							keyword
						}, callback) => {
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
							if (this.$snowy.tool.isNotEmpty(curSelDataKey)) {
								this.$axios.request('/flwapp/sys/userCenter/getPositionListByIdList', "POST", {
									idList: [curSelDataKey]
								}).then((res) => {
									callback({ state: 'success', data: res.data[0] })
								})
								// const data = await userCenterApi.userCenterGetPositionListByIdList({
								// 	idList: [curSelDataKey]
								// })
								// callback({ state: CallbackState.SUCCESS, data: data[0] })
							}
						}
					},
					// 角色
					role: {
						getOptData: async ({
							pageNo,
							pageSize,
							keyword
						}, callback) => {
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
							if (this.$snowy.tool.isNotEmpty(curSelDataKey)) {
								this.$axios.request('/flwapp/sys/userCenter/getRoleListByIdList', "POST", {
									idList: [curSelDataKey]
								}).then((res) => {
									callback({ state: 'success', data: res.data[0] })
								})
								// const data = await userCenterApi.userCenterGetRoleListByIdList({
								// 	idList: [curSelDataKey]
								// })
								// callback({ state: CallbackState.SUCCESS, data: data[0] })
							}
						}
					},
				}
			}
		},
		watch: {
			modelDesignData(newValue, oldValue) {
				if (newValue !== oldValue) {
					this.initData(this.$xeu.clone(this.modelDesignData))
				}
			}
		},
		methods: {
			initData(rootNode) {
				// resultNodeDataBk.value = []
				rootNode.parentId = null
				this.rootNodeData = rootNode
				// 递归给节点添加parentId
				this.handleParent(rootNode)
				this.renderData(rootNode)
				this.resultNodeData = this.resultNodeDataBk
			},
			findNodeById(node, id) {
				if (node.id === id) {
					return node
				}
				for (let i = 0; i < (node.conditionNodeList || []).length; i++) {
					const found = this.findNodeById(node.conditionNodeList[i], id)
					if (found) {
						return found
					}
				}
				if (node.childNode) {
					return this.findNodeById(node.childNode, id)
				}
				return null
			},
			findParentIds(node, id, parents = []) {
				if (node.checkedValue === id) {
					return parents
				}
				if (node.childNode) {
					const result = this.findParentIds(node.childNode, id, [...parents, node.id])
					if (result) return result
				}
				if (node.conditionNodeList) {
					for (let conditionNode of node.conditionNodeList) {
						const result = this.findParentIds(conditionNode, id, [...parents, conditionNode.id])
						if (result) return result
					}
				}
				return null
			},
			async handleRadioChange(node, evt) {
				this.selectedNodeId = evt.detail.value
				node.checkedValue = evt.detail.value
				this.resultNodeDataBk = []
				// 循环找到所有父节点
				this.parentIds = this.findParentIds(this.rootNodeData, evt.detail.value)
				await this.$nextTick()
				this.renderData(rootNodeData.value)
				this.resultNodeData = this.resultNodeDataBk
			},
			renderData(sourceData) {
				if (sourceData?.conditionNodeList?.length > 0) {
					let conditionNodeListElement = null
					sourceData.conditionNodeList.forEach((item) => {
						if (this.parentIds?.findIndex((pItem) => pItem === item.id) !== -1 || this
							.selectedNodeId === item.id) {
							sourceData.checkedValue = item.id
							conditionNodeListElement = item
						}
					})
					if (!conditionNodeListElement) {
						conditionNodeListElement = sourceData.conditionNodeList.find((item) => item.id === sourceData
							.checkedValue)
					}
					this.renderData(conditionNodeListElement)
				}
				// 自定义节点
				if (sourceData.properties.participateInfo[0]?.key === 'CUSTOM') {
					const parentNode = this.resultNodeDataBk.find((item) => item.id === sourceData.parentId)
					if (parentNode?.type !== 'exclusiveGateway' && parentNode?.conditionNodeList.length > 0) {
						const node = parentNode?.conditionNodeList?.find((item) => item.id === parentNode.checkedValue)
						const obj = {
							id: node.id + '-custom',
							parentId: node.id,
							title: node.title,
							properties: node.properties,
							type: node.type,
							userInfo: node.properties.participateInfo[0]?.extJson?.customSelectedValue || []
						}
						this.resultNodeDataBk.push(obj)
					}
				}
				// 子节点
				if (sourceData?.childNode && sourceData?.childNode.id) {
					if (sourceData?.childNode?.type !== 'startEvent') {
						this.resultNodeDataBk.push(sourceData.childNode)
					}
					this.renderData(sourceData.childNode)
				}
			},
			handleParent(rootNode) {
				if (rootNode.childNode && Object.keys(rootNode.childNode).length > 0) {
					rootNode.childNode.parentId = rootNode.id
					if (rootNode.childNode.properties.participateInfo[0]?.key === 'CUSTOM') {
						rootNode.childNode.properties.participateInfo[0].title = rootNode.childNode.title
					}
					this.handleParent(rootNode.childNode)
				}
				if (rootNode.conditionNodeList) {
					if (rootNode.conditionNodeList[0]) {
						rootNode.checkedValue = rootNode.conditionNodeList[0]?.id
					}
					rootNode.conditionNodeList.forEach((item) => {
						item.parentId = rootNode.id
						this.handleParent(item)
					})
				}
			},
			extractCustomNodes(node, accumulator = []) {
				if (node.properties.participateInfo[0]?.key === 'CUSTOM') {
					accumulator.push(node)
				}
				if (node?.conditionNodeList?.length > 0) {
					node.conditionNodeList.forEach((item) => {
						this.extractCustomNodes(item, accumulator)
					})
				}
				// 子节点
				if (node.childNode && Object.keys(node.childNode).length > 0) {
					this.extractCustomNodes(node.childNode, accumulator)
				}
				return accumulator
			},
			getDataInfo() {
				let customNodeList = extractCustomNodes(this.rootNodeData).map((node) => {
					const parentNode = this.findNodeById(this.rootNodeData, node.parentId)
					return {
						id: node.id,
						label: parentNode.type !== 'parallelGateway' ? `${parentNode.title} - ${node.title}` : node
							.title,
						type: node.properties.participateInfo[0]?.extJson?.selectType,
						value: node.properties.participateInfo[0]?.extJson?.customSelectedValue || []
					}
				})
				// 校验自选条件下是否已选择
				let isValidate = customNodeList.every((node) => node.value && node.value.length > 0)
				if (!isValidate) {
					for (let i = 0; i < customNodeList.length; i++) {
						if (!customNodeList[i].value || customNodeList[i].value.length === 0) {
							return this.$snowy.modal.alert(
								`【${customNodeList[i].label}】未选择${this.getTypeName(customNodeList[i].type)}`)
						}
					}
				} else {
					return customNodeList
				}
			},
			getIconColor(node) {
				switch (node.type) {
					case 'startTask':
						return 'rgb(87, 106, 149)'
					case 'endTask':
						return '#dbdcdc'
					case 'userTask':
						return 'rgb(255, 148, 62)'
					case 'serviceTask':
						return 'rgb(50, 150, 250)'
					default:
						return 'var(--primary-color)'
				}
			},
			getTypeName(type) {
				switch (type) {
					case 'ROLE':
						return '角色'
					case 'ORG':
						return '机构'
					case 'USER':
						return '人员'
					case 'POSITION':
						return '职位'
					default:
						return ''
				}
			},
			handleChange(node, curSelDataKey) {
				let nodeData = {}
				if (node.id.indexOf('custom') > -1) {
					nodeData = this.findNodeById(this.rootNodeData, node.parentId)
				} else {
					nodeData = this.findNodeById(this.rootNodeData, node.id)
				}
				let {
					properties: {
						participateInfo: [firstInfo] = []
					} = {}
				} = nodeData || {}
				firstInfo.extJson.customSelectedValue = curSelDataKey
			},

		}
	}
</script>
<style lang="scss" scoped>
	.is-required {
		position: relative;

		&::before {
			color: #ff4d4f;
			// font-size: 14rpx;
			font-family: SimSun, sans-serif;
			line-height: 1.2;
			content: '*';
			position: absolute;
			left: -20rpx;
			top: 0;
			width: 10rpx;
			height: 1rpx;
		}
	}

	.st-title {
		padding: 5rpx;
		font-size: 30rpx;
		color: #333;
	}
</style>