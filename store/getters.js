const getters = {
	envKey: state => state.global.envKey,
	allEnv: state => state.global.allEnv,
	curEnv: state => state.global.allEnv[state.global.envKey],
	tenantDomain: state => state.global.tenantDomain,
	homeConfigs: state => state.global.homeConfigs,
	token: state => state.global.token,
	userMobileMenus: state => state.global.userMobileMenus,
	userInfo: state => state.global.userInfo,
	sysBaseConfig: state => state.global.sysBaseConfig,
	dictTypeTreeData: state => state.global.dictTypeTreeData,
	refreshKey: state => state.global.refreshKey,
	refreshFlag: state => state.global.refreshFlag,
	refreshParam: state => state.global.refreshParam,
}
export default getters