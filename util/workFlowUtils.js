// 根据自定义的此节点定义的，转换表单的隐藏、必填、禁用
export default {
	convFormFilid(formJson, fieldInfo) {
		// 递归遍历控件树
		const traverse = (array) => {
			array.forEach((element) => {
				if (element.type === 'grid' || element.type === 'tabs') {
					// 栅格布局 and 标签页
					element.columns.forEach((item) => {
						traverse(item.list)
					})
				} else if (element.type === 'card') {
					// 卡片布局 and  动态表格
					traverse(element.list)
				} else if (element.type === 'table') {
					// 表格布局
					element.trs.forEach((item) => {
						item.tds.forEach((val) => {
							traverse(val.list)
						})
					})
				} else {
					const type = element.type
					if ((type !== 'alert') & (type !== 'text') & (type !== 'divider') & (type !== 'html')) {
						const obj = fieldInfo.find((i) => i.key === element.model)
						if (obj) {
							element.options.hidden = obj.value === 'HIDE' // ? true : false
							element.options.disabled = obj.value === 'READ' //  ? true : false
						} else {
							uni.$snowy.modal.msgError('程序检测到功能字段配置发生了异常，依然能正常使用，请联系管理员进行流程重新配置部署！')
						}
					}
				}
			})
		}
		traverse(formJson.list)
		return formJson
	},
	// 掏出所有字段，返回列表
	getListField(data) {
		let result = []
		// 递归遍历控件树
		const traverse = (array) => {
			array.forEach((element) => {
				if (element.type === 'grid' || element.type === 'tabs') {
					// 栅格布局 and 标签页
					element.columns.forEach((item) => {
						traverse(item.list)
					})
				} else if (element.type === 'card') {
					// 卡片布局 and  动态表格
					traverse(element.list)
				} else if (element.type === 'table') {
					// 表格布局
					element.trs.forEach((item) => {
						item.tds.forEach((val) => {
							traverse(val.list)
						})
					})
				} else {
					const type = element.type
					// 排除一些 & (type !== 'batch')
					if ((type !== 'alert') & (type !== 'text') & (type !== 'divider') & (type !== 'html')) {
						result.push(element)
					}
				}
			})
		}
		traverse(data)
		return result
	},
	// 处理小诺后端返回的formJsonList
	handleSnowyFormJsonList(formJsonList, isReadForm) {
		console.log('formJsonList', formJsonList)
		// 顶级表名称
		let topTableName = ''
		// 字段
		let fieldConfigs = []
		// 掏出所有字段
		this.getListField(formJsonList).forEach((item, index) => {
			if (item.selectTableType === "parent") {
				topTableName = item.selectTable
			}
			const formField = this.handleSnowyServiceFormField(item, isReadForm)
			if (Object.keys(formField).length !== 0) {
				fieldConfigs.push(formField)
			}
			// 动态表格数据处理
			if (['batch'].includes(item.type)) {
				let batchObj = {
					type: item.type,
					name: item.key,
					label: item.label,
					options: {
						hidden: typeof(item.options.hidden) === 'boolean' ? item.options.hidden : false,
						disabled: typeof(isReadForm) === 'boolean' ? isReadForm : typeof(item.options.disabled) === 'boolean' ? item.options.disabled : false,
					},
					required: true,
					list: []
				}
				item.list.forEach(batchItem => {
					const batchFormField = this.handleSnowyServiceFormField(batchItem, isReadForm)
					if (Object.keys(batchFormField).length !== 0) {
						batchObj.list.push(batchFormField)
					}
				})
				fieldConfigs.push(batchObj)
			}
		})
		console.log('fieldConfigs', fieldConfigs)
		return {
			topTableName: topTableName,
			fieldConfigs: fieldConfigs
		}
	},
	// 处理字段
	handleSnowyServiceFormField(serviceFormField, isReadForm) {
		let resultObj = {}
		// 字段处理
		let isRequired = false
		if (serviceFormField.rules) {
			serviceFormField.rules.forEach((ruleItem, index) => {
				if (ruleItem.required) {
					isRequired = true
				}
				if (ruleItem.message) {
					ruleItem.errorMessage = ruleItem.message
				}
			})
		}
		if (['input', 'textarea', 'number', ].includes(serviceFormField.type)) {
			resultObj = {
				type: serviceFormField.type,
				name: serviceFormField.key,
				label: serviceFormField.label,
				options: {
					defaultValue: serviceFormField.options.defaultValue,
					hidden: typeof(serviceFormField.options.hidden) === 'boolean' ? serviceFormField.options.hidden : false,
					disabled: typeof(isReadForm) === 'boolean' ? isReadForm : typeof(serviceFormField.options.disabled) === 'boolean' ? serviceFormField.options.disabled : false,
					placeholder: serviceFormField.options.placeholder,
				},
				required: isRequired,
				rules: serviceFormField.rules
			}
		}
		if (['radio', ].includes(serviceFormField.type)) {
			resultObj = {
				type: serviceFormField.type,
				name: serviceFormField.key,
				label: serviceFormField.label,
				options: {
					defaultValue: serviceFormField.options.defaultValue,
					hidden: typeof(serviceFormField.options.hidden) === 'boolean' ? serviceFormField.options.hidden : false,
					disabled: typeof(isReadForm) === 'boolean' ? isReadForm : typeof(serviceFormField.options.disabled) === 'boolean' ? serviceFormField.options.disabled : false,
					placeholder: serviceFormField.options.placeholder,
					map: {
						value: 'value',
						text: 'label'
					},
					options: serviceFormField.options.options,
					isMultiple: false,
				},
				required: isRequired,
				rules: serviceFormField.rules
			}
		}
		if (['checkbox', ].includes(serviceFormField.type)) {
			resultObj = {
				type: serviceFormField.type,
				name: serviceFormField.key,
				label: serviceFormField.label,
				options: {
					defaultValue: serviceFormField.options.defaultValue,
					hidden: typeof(serviceFormField.options.hidden) === 'boolean' ? serviceFormField.options.hidden : false,
					disabled: typeof(isReadForm) === 'boolean' ? isReadForm : typeof(serviceFormField.options.disabled) === 'boolean' ? serviceFormField.options.disabled : false,
					placeholder: serviceFormField.options.placeholder,
					map: {
						value: 'value',
						text: 'label'
					},
					options: serviceFormField.options.options,
					isMultiple: true,
				},
				required: isRequired,
				rules: serviceFormField.rules
			}
		}
		if (['select', ].includes(serviceFormField.type)) {
			resultObj = {
				type: serviceFormField.type,
				name: serviceFormField.key,
				label: serviceFormField.label,
				options: {
					defaultValue: serviceFormField.options.defaultValue,
					hidden: typeof(serviceFormField.options.hidden) === 'boolean' ? serviceFormField.options.hidden : false,
					disabled: typeof(isReadForm) === 'boolean' ? isReadForm : typeof(serviceFormField.options.disabled) === 'boolean' ? serviceFormField.options.disabled : false,
					placeholder: serviceFormField.options.placeholder,
					map: {
						key: 'value',
						label: 'label'
					},
					options: serviceFormField.options.options,
					isMultiple: serviceFormField.options.multiple
				},
				required: isRequired,
				rules: serviceFormField.rules
			}
		}
		if (['date', ].includes(serviceFormField.type)) {
			resultObj = {
				type: serviceFormField.type,
				name: serviceFormField.key,
				label: serviceFormField.label,
				options: {
					range: serviceFormField.options.range,
					showTime: serviceFormField.options.showTime,
					defaultValue: serviceFormField.options.defaultValue,
					rangeDefaultValue: serviceFormField.options.rangeDefaultValue,
					placeholder: serviceFormField.options.placeholder,
					rangePlaceholder: serviceFormField.options.rangePlaceholder,
					hidden: typeof(serviceFormField.options.hidden) === 'boolean' ? serviceFormField.options.hidden : false,
					disabled: typeof(isReadForm) === 'boolean' ? isReadForm : typeof(serviceFormField.options.disabled) === 'boolean' ? serviceFormField.options.disabled : false,
					clearable: serviceFormField.options.clearable,
				},
				required: isRequired,
				rules: serviceFormField.rules
			}
		}
		if (['time', ].includes(serviceFormField.type)) {
			resultObj = {
				type: serviceFormField.type,
				name: serviceFormField.key,
				label: serviceFormField.label,
				options: {
					defaultValue: serviceFormField.options.defaultValue,
					hidden: typeof(serviceFormField.options.hidden) === 'boolean' ? serviceFormField.options.hidden : false,
					disabled: typeof(isReadForm) === 'boolean' ? isReadForm : typeof(serviceFormField.options.disabled) === 'boolean' ? serviceFormField.options.disabled : false,
					placeholder: serviceFormField.options.placeholder,
					clearable: serviceFormField.options.clearable,
				},
				required: isRequired,
				rules: serviceFormField.rules
			}
		}
		if (['rate', ].includes(serviceFormField.type)) {
			resultObj = {
				type: serviceFormField.type,
				name: serviceFormField.key,
				label: serviceFormField.label,
				options: {
					defaultValue: serviceFormField.options.defaultValue,
					hidden: typeof(serviceFormField.options.hidden) === 'boolean' ? serviceFormField.options.hidden : false,
					disabled: typeof(isReadForm) === 'boolean' ? isReadForm : typeof(serviceFormField.options.disabled) === 'boolean' ? serviceFormField.options.disabled : false,
				},
				required: isRequired,
				rules: serviceFormField.rules
			}
		}
		if (['slider', ].includes(serviceFormField.type)) {
			resultObj = {
				type: serviceFormField.type,
				name: serviceFormField.key,
				label: serviceFormField.label,
				options: {
					defaultValue: serviceFormField.options.defaultValue,
					hidden: typeof(serviceFormField.options.hidden) === 'boolean' ? serviceFormField.options.hidden : false,
					disabled: typeof(isReadForm) === 'boolean' ? isReadForm : typeof(serviceFormField.options.disabled) === 'boolean' ? serviceFormField.options.disabled : false,
					step: serviceFormField.options.step,
					min: serviceFormField.options.min,
					max: serviceFormField.options.max,
				},
				required: isRequired,
				rules: serviceFormField.rules
			}
		}
		if (['switch', ].includes(serviceFormField.type)) {
			resultObj = {
				type: serviceFormField.type,
				name: serviceFormField.key,
				label: serviceFormField.label,
				options: {
					defaultValue: serviceFormField.options.defaultValue,
					hidden: typeof(serviceFormField.options.hidden) === 'boolean' ? serviceFormField.options.hidden : false,
					disabled: typeof(isReadForm) === 'boolean' ? isReadForm : typeof(serviceFormField.options.disabled) === 'boolean' ? serviceFormField.options.disabled : false,
				},
				required: isRequired,
				rules: serviceFormField.rules
			}
		}
		if (['uploadFile'].includes(serviceFormField.type)) {
			resultObj = {
				type: serviceFormField.type,
				name: serviceFormField.key,
				label: serviceFormField.label,
				options: {
					defaultValue: serviceFormField.options.defaultValue,
					hidden: typeof(serviceFormField.options.hidden) === 'boolean' ? serviceFormField.options.hidden : false,
					disabled: typeof(isReadForm) === 'boolean' ? isReadForm : typeof(serviceFormField.options.disabled) === 'boolean' ? serviceFormField.options.disabled : false,
				},
				required: isRequired,
				rules: serviceFormField.rules
			}
		}
		if (['uploadImg'].includes(serviceFormField.type)) {
			resultObj = {
				type: serviceFormField.type,
				name: serviceFormField.key,
				label: serviceFormField.label,
				options: {
					defaultValue: serviceFormField.options.defaultValue,
					hidden: typeof(serviceFormField.options.hidden) === 'boolean' ? serviceFormField.options.hidden : false,
					disabled: typeof(isReadForm) === 'boolean' ? isReadForm : typeof(serviceFormField.options.disabled) === 'boolean' ? serviceFormField.options.disabled : false,
				},
				required: isRequired,
				rules: serviceFormField.rules
			}
		}
		if (['xnUserSelector', ].includes(serviceFormField.type)) {
			resultObj = {
				type: "userSelector",
				name: serviceFormField.key,
				label: serviceFormField.label,
				options: {
					defaultValue: serviceFormField.options.defaultValue,
					hidden: typeof(serviceFormField.options.hidden) === 'boolean' ? serviceFormField.options.hidden : false,
					disabled: typeof(isReadForm) === 'boolean' ? isReadForm : typeof(serviceFormField.options.disabled) === 'boolean' ? serviceFormField.options.disabled : false,
					placeholder: serviceFormField.options.placeholder,
					options: serviceFormField.options.options,
					isMultiple: !serviceFormField.options.radioModel
				},
				required: isRequired,
				rules: serviceFormField.rules
			}
		}
		if (['xnOrgSelector', ].includes(serviceFormField.type)) {
			resultObj = {
				type: "orgSelector",
				name: serviceFormField.key,
				label: serviceFormField.label,
				options: {
					defaultValue: serviceFormField.options.defaultValue,
					hidden: typeof(serviceFormField.options.hidden) === 'boolean' ? serviceFormField.options.hidden : false,
					disabled: typeof(isReadForm) === 'boolean' ? isReadForm : typeof(serviceFormField.options.disabled) === 'boolean' ? serviceFormField.options.disabled : false,
					placeholder: serviceFormField.options.placeholder,
					options: serviceFormField.options.options,
					isMultiple: !serviceFormField.options.radioModel
				},
				required: isRequired,
				rules: serviceFormField.rules
			}
		}
		if (['xnPosSelector', ].includes(serviceFormField.type)) {
			resultObj = {
				type: "posSelector",
				name: serviceFormField.key,
				label: serviceFormField.label,
				options: {
					defaultValue: serviceFormField.options.defaultValue,
					hidden: typeof(serviceFormField.options.hidden) === 'boolean' ? serviceFormField.options.hidden : false,
					disabled: typeof(isReadForm) === 'boolean' ? isReadForm : typeof(serviceFormField.options.disabled) === 'boolean' ? serviceFormField.options.disabled : false,
					placeholder: serviceFormField.options.placeholder,
					options: serviceFormField.options.options,
					isMultiple: !serviceFormField.options.radioModel
				},
				required: isRequired,
				rules: serviceFormField.rules
			}
		}
		if (['xnRoleSelector', ].includes(serviceFormField.type)) {
			resultObj = {
				type: "roleSelector",
				name: serviceFormField.key,
				label: serviceFormField.label,
				options: {
					defaultValue: serviceFormField.options.defaultValue,
					hidden: typeof(serviceFormField.options.hidden) === 'boolean' ? serviceFormField.options.hidden : false,
					disabled: typeof(isReadForm) === 'boolean' ? isReadForm : typeof(serviceFormField.options.disabled) === 'boolean' ? serviceFormField.options.disabled : false,
					placeholder: serviceFormField.options.placeholder,
					options: serviceFormField.options.options,
					isMultiple: !serviceFormField.options.radioModel
				},
				required: isRequired,
				rules: serviceFormField.rules
			}
		}
		if (['editor', ].includes(serviceFormField.type)) {
			resultObj = {
				type: serviceFormField.type,
				name: serviceFormField.key,
				label: serviceFormField.label,
				options: {
					defaultValue: serviceFormField.options.defaultValue,
					hidden: typeof(serviceFormField.options.hidden) === 'boolean' ? serviceFormField.options.hidden : false,
					disabled: typeof(isReadForm) === 'boolean' ? isReadForm : typeof(serviceFormField.options.disabled) === 'boolean' ? serviceFormField.options.disabled : false,
				},
				required: isRequired,
				rules: serviceFormField.rules
			}
		}
		return resultObj
	},
	// 取节点（用到按钮权限跟字段），并且给节点set一个json，也就是我们的审批记录
	getChildNode(modelJson, activityId, dataList) {
		let result = {}
		let traverse = (obj) => {
			// obj.properties.commentList = []
			if (obj.type === 'exclusiveGateway' || obj.type === 'parallelGateway') {
				// 网关下分2步走
				if (obj.conditionNodeList) {
					obj.conditionNodeList.forEach((item) => {
						traverse(item)
					})
				}
				if (obj.childNode) {
					traverse(obj.childNode)
				}
			} else {
				if (obj.id === activityId) {
					result = obj
				} else {
					// 这里追加记录
					// if (dataList) {
					// 	dataList.forEach((item) => {
					// 		// 给对应的节点
					// 		if (item.activityId === obj.id) {
					// 			obj.properties.commentList.push(item)
					// 		}
					// 	})
					// }
					// 再穿下去
					if (obj.childNode) {
						traverse(obj.childNode)
					}
				}
			}
		}
		// 传入流程的这个
		traverse(modelJson)
		return result
	},
}