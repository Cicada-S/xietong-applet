<template>
	<view class="container" :style="{minHeight:$height()}">
		<image style="width: 300rpx;margin:auto;" @click="scanCode" src="@/static/img/scan.gif" mode="widthFix"></image>
		<zy-update theme="green" :autocheckupdate="true" :appstoreflag="false" :updateurl="update_url"></zy-update>
	</view>
</template>

<script>
	import ZyUpdate from '@/components/zy-upgrade/zy-upgrade.vue'
	export default {
		data() {
			return {
				update_url:this.$axios.interfaceUrl()+this.$api.checkVersion
			}
		},
		components:{
		    ZyUpdate
		},
		onLoad() {
			console.log(this.update_url)
			this.getLoginUser()
		},
		onShow() {
		
		},
		methods: {
			// 扫码核
			scanCode() {

				uni.scanCode({
					scanType: ["qrCode", "barCode"],
					success: (res) => {
						this.$axios.request(this.$api.getDevice, "GET", {
							gatherUuid: res.result
						}).then((val) => {
							if (val.data) {
								this.$next(`/pages/index/workOrderDetail?gatherUuid=${res.result}`)
							} else {
								this.$msg.toast("请扫设备码")
							}
						})
					},
					fail: (res) => {
						console.log(res);
					},
				})

			},
			getLoginUser() {
				this.$axios.request(this.$api.getLoginUser, "GET").then((val) => {
					uni.setStorageSync("role",val.data.roleCodeList)
				})
			}
		}
	}
</script>

<style lang="scss">

</style>