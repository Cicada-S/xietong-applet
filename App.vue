<script>
	import axios from 'util/request.js'
	export default {
		onLaunch: function() {
			// #ifdef MP-WEIXIN
			if (wx.canIUse('getUpdateManager')) {
				const updateManager = wx.getUpdateManager()
				updateManager.onCheckForUpdate(function(res) {
					console.log(res)
					if (!res.hasUpdate) return;
					updateManager.onUpdateReady(function() {
						updateManager.applyUpdate()
					})
					updateManager.onUpdateFailed(function() {
						wx.showModal({
							title: '新版本更新失败',
							content: '请在微信主界面下拉删除当前小程序，重新从公众号进入即可'
						})
					})
				})
			} else {
				wx.showModal({
					title: '提示',
					content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
				})
			}
			// #endif
			console.log('App Launch')
		},
		onShow: function() {
			// axios.request(this.$api.initApp, "GET", {
			// 	lat: 0,
			// 	lng: 0,
			// 	version: '1.0.0'
			// }).then((val) => {
			// 	uni.setStorageSync("initAppData", val.data)
			// 	this.$store.commit('setInitAppData', val.data)
			// })
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	@import "common/flex.scss";

	/*每个页面公共css */
	/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
	@font-face {
	  font-family: 'iconfont';  /* Project id 4335473 */
	  src: url('//at.alicdn.com/t/c/font_4335473_tvss5nufqeq.woff2?t=1700209477815') format('woff2'),
	       url('//at.alicdn.com/t/c/font_4335473_tvss5nufqeq.woff?t=1700209477815') format('woff'),
	       url('//at.alicdn.com/t/c/font_4335473_tvss5nufqeq.ttf?t=1700209477815') format('truetype');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		/* #ifndef APP-NVUE */
		-webkit-font-smoothing: antialiased;
		-webkit-text-stroke-width: 0.2px;
		-moz-osx-font-smoothing: grayscale;
		/* #endif */
	}

	.container {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		// background-color: #eaeaea5e;
	}
	
	.modal-buttom{
		position: absolute;bottom:30rpx;left:0;width:98%;padding:0px 1%;
	}
	.modal-box{
		display: flex !important;flex-direction: column;margin-top: 6VH;margin-bottom: 8VH;overflow-x: auto;height: 80VH;
	}
	.search-box {
		position: fixed;
		// top: 0;
		z-index: 999;
		background-color: #FFFFFF;
		width:100%;
		.search-item{
			padding:0px 3%;
			width: 94%;
			padding-top: 10rpx;
			/deep/ .u-button{
				margin-right:10rpx !important;
			}
			/deep/ .u-button:last-child{
				margin-right:0rpx !important;
			}
		}
	}
</style>
<style lang="scss">
	@import '@/static/scss/index.scss';
</style>