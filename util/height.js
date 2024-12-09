export function heights(){
	var h = ''
	uni.getSystemInfo({
		success: res => {
		h = res.windowHeight + 'px';
		}
	});
	return h
}