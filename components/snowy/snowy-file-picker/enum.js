export const ID_DATA_TYPE = {
	// '["11","22"]'
	idArrJsonStr: {
		code: "jsonStr",
	},
	idStr: {
		code: "idStr",
		separation: ','
	},
	urlStr: {
		code: "urlStr",
		separation: ','
	},
	idArr: {
		code: "idArr",
	},
	urlArr: {
		code: "urlArr",
	},
	objArr: {
		code: "objArr",
	},
}
export const ID_DATA_TYPE_OPTS = [...Object.values(ID_DATA_TYPE)]
export const CALLBACK_STATE = {
	SUCCESS: 'success',
	ERROR: 'error'
}