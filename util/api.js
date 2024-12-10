var api = {
	//登陆
	login: '/webapp/auth/b/doLogin',
	getLoginUser: '/webapp/auth/b/getLoginUser',
	getUserRes: '/bizapp/biz/user/page', //获取所有用户
	getUserList: '/bizapp/biz/user/list', //获取所有用户
	getOrgTree: '/webapp/sys/org/tree', //获取部门
	getDictTree: '/webapp/dev/dict/tree',

	getUserMenu: '/webapp/sys/userCenter/loginMenu',//获取当前用户菜单

	getDevice: '/deviceapp/device/device/detailByGatherUuid',

	getWorkStepList: '/bizapp/biz/workStep/list', //工序列表
	getWorkStepListDynamic: '/bizapp/biz/workStep/pageApi',//工序列表
	getWorkStepRes: '/bizapp/biz/workStep/page', //工序分页
	getWorkStep: '/bizapp/biz/workStep/detail', //工序详情
	addWorkStep: '/bizapp/biz/workStep/add',//工序新增
	editWorkStep: '/bizapp/biz/workStep/edit',//工序编辑
	delWorkStep: '/bizapp/biz/workStep/delete',//工序删除

	getWorkOrder: '/bizapp/biz/workOrder/detail', //工单详情
	getWorkOrderList: '/bizapp/biz/workOrder/list',//工单列表
	getWorkOrderRes: '/bizapp/biz/workOrder/page',//工单分页
	addWorkOrder: '/bizapp/biz/workOrder/add',//工单新增
	editWorkOrder: '/bizapp/biz/workOrder/edit',//工单编辑
	delWorkOrder: '/bizapp/biz/workOrder/delete',//工单编辑
	listByWorkOrderIdOrAllStep: '/bizapp/biz/workTask/listByWorkOrderIdOrAllStep',//获取当前工单的工序任务，如果没有 就获取所有的工序


	taskStart: '/bizapp/biz/workTask/batchStart', //开始任务
	scanEwmStartTask: '/bizapp/biz/workTask/scanEwmStartTask', //扫码开启产线任务
	getTaskList: '/bizapp/biz/workTask/listByWorkOrderId', //任务列表

	getTaskListByProId: '/bizapp/biz/workTask/listByProId', //任务列表
	getTaskPage: '/bizapp/biz/workTask/page', //任务分页
	editWorkTask: '/bizapp/biz/workTask/edit',
	delWorkTask: '/bizapp/biz/workTask/delete',

	getListByWorkRouteId: '/bizapp/biz/workStepRoute/listByWorkRouteId',//通过工艺路线ID获取工序

	getWorkRouteRes: '/bizapp/biz/workRoute/page',//工艺路线分页
	addWorkRoute: '/bizapp/biz/workRoute/add',//工艺路线新增
	editWorkRoute: '/bizapp/biz/workRoute/edit',//工艺路线编辑
	delWorkRoute: '/bizapp/biz/workRoute/delete',//工艺路线编辑

	proReportAdd: '/bizapp/biz/workReport/proReportAdd',//产品报工
	proReportEdit: '/bizapp/biz/workReport/proReportEdit',//编辑产品报工
	getProReport: '/bizapp/biz/workReport/detail',//产品报工详情
	getProReportPage: '/bizapp/biz/workReport/page',//产品报工列表

	batchApproval: '/bizapp/biz/workReport/batchApproval',//报工审批

	proPlanAdd: '/bizapp/biz/proPlan/add',//生产计划新增
	proPlanEdit: '/bizapp/biz/proPlan/edit',//编辑生产计划
	getProPlan: '/bizapp/biz/proPlan/detail',//生产计划详情
	getProPlanPage: '/bizapp/biz/proPlan/page',//生产计划列表


	workReportAdd: '/bizapp/biz/workReport/add', //添加报工
	workReportBatchAdd: '/bizapp/biz/workReport/batchAdd', //添加报工
	getWorkReportDynamic: '/bizapp/biz/workReport/dynamicFieldConfigList',//工单报工动态字段

	getWorkReportPage: '/bizapp/biz/workReport/page', //报工分页


	getProTypeTree: '/bizapp/biz/proType/tree',//产品类型

	getProPage: '/bizapp/biz/pro/page',//产品
	getProList: '/bizapp/biz/pro/list',//产品列表
	addPro: '/bizapp/biz/pro/add',//新增
	editPro: '/bizapp/biz/pro/edit',//编辑
	delPro: '/bizapp/biz/pro/delete',//删除



	getTenantByName: '/tenapp/ten/storage/getTenantByName',//通过企业名称获取租户信息

	checkVersion: '/webapp/dev/appVersionLog/checkAppVersion',//检测APP升级

	getExecptTypeRes: '/bizapp/biz/execpTtype/page',//异常类型分页

	getExecptReportRes: '/bizapp/biz/execptReport/page',//异常上报分页

	getExecptRecordsRes: '/bizapp/biz/execptRecords/page',//异常记录
	addExecptRecords: '/bizapp/biz/execptRecords/add',//添加异常上报

	getExecptReportList: '/bizapp/biz/execptReport/list',//异常上报列表

	getMessageDetail: '/webapp/dev/message/detail',//获取消息详情
	sendMessage: '/webapp/dev/message/send',//发送消息

	getUnReadList: '/webapp/sys/index/message/list',//获取站内信未读消息

	getMessageRes: '/webapp/sys/userCenter/loginUnreadMessagePage',//获取站内信分页数据

	getInvDetailRes: '/bizapp/biz/invDetail/page',//获取物流明细
	addInv: '/bizapp/biz/inv/add',//添加仓库明细
	editInv: '/bizapp/biz/inv/edit',//编辑仓库明细
	getInv: '/bizapp/biz/inv/detail',//仓库详情
	delInv: '/bizapp/biz/inv/delete',//删除
	approvalErrInv: '/bizapp/biz/inv/approvalErr',//弃审
	approvalOkInv: '/bizapp/biz/inv/approvalOk',//审核 

	getWareHouseTree: '/bizapp/biz/wareHouse/tree',//仓库树状数据

	getUnitRes: '/bizapp/biz/unit/page',//计量单位分页
	addUnit: '/bizapp/biz/unit/add',//计量单位新增
	editUnit: '/bizapp/biz/unit/edit',//计量单位编辑
	delUnit: '/bizapp/biz/unit/delete',//计量单位删除

	getBadItemRes: '/bizapp/biz/badItem/page',//不良品项分页
	addBadItem: '/bizapp/biz/badItem/add',//不良品项新增
	editBadItem: '/bizapp/biz/badItem/edit',//不良品项编辑
	delBadItem: '/bizapp/biz/badItem/delete',//不良品项删除

	getBadQualityRes: '/bizapp/biz/badQuality/page',//不良溯源分页
	addBadQuality: '/bizapp/biz/badQuality/add',//不良溯源新增
	editBadQuality: '/bizapp/biz/badQuality/edit',//不良溯源编辑
	delBadQuality: '/bizapp/biz/badQuality/delete',//不良溯源删除


	getGroupStepRes: '/bizapp/biz/groupStep/page',//组合工序分页
	addGroupStep: '/bizapp/biz/groupStep/add',//组合工序新增
	editGroupStep: '/bizapp/biz/groupStep/edit',//组合工序编辑
	delGroupStep: '/bizapp/biz/groupStep/delete',//组合工序删除

	getProQualityRes: '/bizapp/biz/proQuality/page',//质量溯源分页
	addProQuality: '/bizapp/biz/proQuality/add',//质量检测新增
	editProQuality: '/bizapp/biz/proQuality/edit',//质量编辑
	delProQuality: '/bizapp/biz/proQuality/delete',//质量删除

	getTestStandardRes: '/bizapp/biz/testStandard/page',//分页
	addTestStandard: '/bizapp/biz/testStandard/add',//新增
	ediTtestStandard: '/bizapp/biz/testStandard/edit',//编辑
	delTestStandard: '/bizapp/biz/testStandard/delete',//删除

	getTestInstrumentRes: '/bizapp/biz/testInstrument/page',//分页
	addTestInstrument: '/bizapp/biz/testInstrument/add',//新增
	ediTtestInstrument: '/bizapp/biz/testInstrument/edit',//编辑
	delTestInstrument: '/bizapp/biz/testInstrument/delete',//删除

	getTestTypeRes: '/bizapp/biz/testType/list',//分页
	addTestType: '/bizapp/biz/testType/add',//新增
	ediTtestType: '/bizapp/biz/testType/edit',//编辑
	delTestType: '/bizapp/biz/testType/delete',//删除

	getTestItemRes: '/bizapp/biz/testItem/page',//分页
	addTestItem: '/bizapp/biz/testItem/add',//新增
	ediTtestItem: '/bizapp/biz/testItem/edit',//编辑
	delTestItem: '/bizapp/biz/testItem/delete',//删除

	getTestFormulaRes: '/bizapp/biz/testFormula/page',//分页
	addTestFormula: '/bizapp/biz/testFormula/add',//新增
	editTestFormula: '/bizapp/biz/testFormula/edit',//编辑
	delTestFormula: '/bizapp/biz/testFormula/delete',//删除	

	getTestStepFirstRes: '/bizapp/biz/test/page',//分页
	addTestStepFirst: '/bizapp/biz/testStepFirst/add',//新增
	editTestStepFirst: '/bizapp/biz/testStepFirst/edit',//编辑
	delTestStepFirst: '/bizapp/biz/testStepFirst/delete',//删除	


	getTestStepLastRes: '/bizapp/biz/test/page',//分页
	addTestStepLast: '/bizapp/biz/testStepLast/add',//新增
	editTestStepLast: '/bizapp/biz/testStepLast/edit',//编辑
	delTestStepLast: '/bizapp/biz/testStepLast/delete',//删除	

	getTestStepLoopRes: '/bizapp/biz/test/page',//分页
	// addTestStepLoop: '/bizapp//biz/test/add',//新增
	addTestStepLoop: '/bizapp/biz/testStepLoop/add',//新增
	addTestStepLoop2: '/bizapp/biz/test/add',//新增
	editTestStepLoop: '/bizapp/biz/testStepLoop/edit',//编辑
	delTestStepLoop: '/bizapp/biz/testStepLoop/delete',//删除	

	getTestInvOutRes: '/bizapp/biz/test/page',//分页
	addTestInvOut: '/bizapp/biz/pro/page',//新增
	editTestInvOut: '/bizapp/biz/testInvOut/edit',//编辑
	delTestInvOut: '/bizapp/biz/testInvOut/delete',//删除	

	getTestInvInRes: '/bizapp/biz/test/page',//分页
	addTestInvIn: '/bizapp/biz/testInvIn/add',//新增
	editTestInvIn: '/bizapp/biz/testInvIn/edit',//编辑
	delTestInvIn: '/bizapp/biz/testInvIn/delete',//删除	

	getSaleOrderDetailRes: '/bizapp/biz/orderDetail/page',//分页
	getSaleOrderDetail: '/bizapp/biz/order/detail', // 详情
	addSaleOrderDetail: '/bizapp/biz/order/add',//新增
	editSaleOrderDetail: '/bizapp/biz/order/edit',//编辑
	delSaleOrderDetail: '/bizapp/biz/orderDetail/delete',//删除	

	getPuorOrderDetailRes: '/bizapp/biz/orderDetail/page',//分页
	addPuorOrderDetail: '/bizapp/biz/order/add',//新增
	editPuorOrderDetail: '/bizapp/biz/order/edit',//编辑
	delPuorOrderDetail: '/bizapp/biz/orderDetail/delete',//删除	


	getPartnersSortTree: '/bizapp/biz/partnersSort/tree',//合作伙伴

	getPartners: '/bizapp/biz/partners/page/',

	getCusSortRes: '/bizapp/biz/partnersSort/page',//分页
	addCusSort: '/bizapp/biz/cusSort/add',//新增
	editCusSort: '/bizapp/biz/partnersSort/edit',//编辑
	delCusSort: '/bizapp/biz/partnersSort/delete',//删除	

	getCusInforRes: '/bizapp/biz/partnersSort/page',//分页
	addCusInfor: '/bizapp/biz/partnersSort/add',//新增
	editCusInfor: '/bizapp/biz/partnersSort/edit',//编辑
	delCusInfor: '/bizapp/biz/partnersSort/delete',//删除	

	getSuppSortRes: '/bizapp/biz/partnersSort/page',//分页
	addSuppSort: '/bizapp/biz/partnersSort/add',//新增
	editSuppSort: '/bizapp/biz/partnersSort/edit',//编辑
	delSuppSort: '/bizapp/biz/partnersSort/delete',//删除	


	getSuppDataRes: '/bizapp/biz/partnersSort/page',//分页
	addSuppData: '/bizapp/biz/partnersSort/add',//新增
	editSuppData: '/bizapp/biz/partnersSort/edit',//编辑
	delSuppData: '/bizapp/biz/partnersSort/delete',//删除	

	getCheckBillRes: '/bizapp/biz/checkBill/page',//分页
	addCheckBill: '/bizapp/biz/checkBill/add',//新增
	editCheckBill: '/bizapp/biz/checkBill/edit',//编辑
	delCheckBill: '/bizapp/biz/checkBill/delete',//删除	

	getPmManageRes: '/bizapp/biz/orderDetail/page',//分页
	addPmManage: '/bizapp/biz/pmManage/add',//新增
	editPmManage: '/bizapp/biz/pmManage/edit',//编辑
	delPmManage: '/bizapp/biz/pmManage/delete',//删除

	getOrderDetailRes: '/bizapp/biz/orderDetail/page',//获取物流明细


	getCostTypeRes: '/bizapp/biz/costType/page',//分页
	addCostType: '/bizapp/biz/costType/add',//新增
	editCostType: '/bizapp/biz/costType/edit',//编辑
	delCostType: '/bizapp/biz/costType/delete',//删除


	getCostRecordsRes: '/bizapp/biz/costRecords/page',//分页
	addCostRecords: '/bizapp/biz/costRecords/add',//新增  
	editCostRecords: '/bizapp/biz/costRecords/edit',//编辑
	delCostRecords: '/bizapp/biz/costRecords/delete',//删除

	getProPlanCategoryRes: '/bizapp/biz/proPlanCategory/page',//分页
	addProPlanCategory: 'bizapp/biz/proPlanCategory/add',//新增  
	ediProPlanCategory: '/bizapp/biz/proPlanCategory/edit',//编辑
	delProPlanCategory: '/bizapp/biz/proPlanCategory/delete',//删除


	addExecptReport: '/bizapp/biz/execptReport/add',//新增
	editExecptReport: '/bizapp/biz/execptReport/edit',//编辑
	delExecptReport: '/bizapp/biz/execptReport/delete',//删除

	getCostReportRes: '/bizapp/biz/costRecords/report'

}

export default api
