<template>
	<view class="container" :style="{minHeight:$height()}">
		<view class="banner">
			<image src="@/static/img/banner.png" mode="widthFix"></image>
		</view>
		<view class="tip">欢迎使用协同云工单</view>
		<view class="login king-align__center king-flex__column">
			<u-input v-model="formData.companyName" placeholder="请输入企业名称" shape="circle">
				<template slot="prefix">
					<u-icon name="home-fill" color="#2979ff" size="28"></u-icon>
				</template>
			</u-input>
			<u-input v-model="formData.account" placeholder="请输入帐号" shape="circle">
				<template slot="prefix">
					<u-icon name="account-fill" color="#2979ff" size="28"></u-icon>
				</template>
			</u-input>
			<u-input v-model="formData.password" :password="!passwordRule" placeholder="请输入密码" shape="circle">
				<template slot="prefix">
					<u-icon name="lock-fill" color="#2979ff" size="28"></u-icon>
				</template>
				<template slot="suffix">
					<u-icon v-if="passwordRule" @click="lookPassword" name="eye-fill" color="#2979ff"
						size="28"></u-icon>
					<u-icon v-else name="eye-off" @click="lookPassword" color="#2979ff" size="28"></u-icon>
				</template>
			</u-input>

			<u-button type="primary" @click="login" text="登陆"></u-button>

		</view>
		<view class="footer">
			<image src="@/static/img/footer.png" mode="widthFix"></image>
		</view>

	</view>
</template>

<script>
	import smCryptoUtil from 'util/smCrypto'
	export default {
		data() {
			return {
				passwordRule: false,
				formData: {
					account: "admin",
					password: "xtcx123456",
					companyName: "苏州协同创芯数字科技有限公司"
				}
			}
		},
		onLoad() {
			//保存帐号密码
			let account = uni.getStorageSync("accountSetting")
			if (account) {
				this.formData = account
			}
			
			
		},
		methods: {
			lookPassword() {
				this.passwordRule = !this.passwordRule
			},
			lookAllMenu(data = [], arr = []) {
				data.forEach((item, index) => {
					arr.push(item.path);
					if (item.children && item.children.length) {
						this.lookAllMenu(item.children, arr);
					}

				})
				return arr;
			},
			getDictList() {
				this.$axios.request(this.$api.getDictTree).then((val) => {
					uni.setStorageSync("dictList", val.data)
				})
			},
			login() {
				uni.removeStorageSync("domain")
				if (this.formData.companyName == '') {
					this.$msg.toast("请输入企业名称")
					return
				}
				if (this.formData.account == '') {
					this.$msg.toast("请输入帐号")
					return
				}
				if (this.formData.password == '') {
					this.$msg.toast("请输入密码")
					return
				}
				let params = {
					account: this.formData.account,
					password: smCryptoUtil.doSm2Encrypt(this.formData.password)
				}

				this.$axios.request(this.$api.getTenantByName, "GET", {
					name: this.formData.companyName
				}).then((val) => {
					if (val.data) {
						uni.setStorageSync("domain", val.data.domain)
						this.getDictList()
						this.$axios.request(this.$api.login, "POST", params).then((val) => {
							uni.setStorageSync("token", val.data)
							uni.setStorageSync("accountSetting", this.formData)
							this.$axios.request(this.$api.getUserMenu, "GET").then((menu) => {
								let menuAllList = this.lookAllMenu(menu.data)
								uni.setStorageSync("menu", menuAllList)
								this.$msg.toastSwitch("登陆成功", "/pages/index/index")
							})

						})
					} else {
						this.$msg.toast("找不到该企业")
					}
				})

			}
		}
	}
</script>

<style lang="scss">
	.login {
		width: 80%;
		margin: 20px auto;
	}

	.banner {
		width: 100%;

		image {
			width: 100%;
		}
	}

	.login-text {
		font-size: 24px;
		margin: 40rpx auto;
		color: #3f8ff5;
		font-weight: 500;
		text-align: center;
	}

	.tip {
		font-size: 18px;
		margin: 20rpx auto;
		color: #3c9cff;
		font-weight: bold;
		text-align: center;
	}

	.customStyle {
		border-color: 1px solid #3f8ff5;
		width: 96%;
		margin-bottom: 20px;
	}

	.u-input {
		border-color: 1px solid #3f8ff5;
		width: 96%;
		margin-bottom: 20px;
	}

	.u-button {
		margin-top: 30px;
		border-radius: 100px !important;
	}

	.footer {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 200rpx;

		image {
			width: 100%;
		}
	}

	/deep/ .u-button {
		margin-top: 10px !important;
	}
</style>