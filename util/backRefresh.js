export function backRefresh() {
	uni.$emit('refresh')
	let pages = getCurrentPages()
	let prevPage = pages[pages.length - 2]
	if (prevPage.$vm.$refs.unitModalRef) {
		prevPage.$vm.$refs.unitModalRef.refresh()
	}
	this.$nextTick(() => {
		uni.navigateBack()
	})
}