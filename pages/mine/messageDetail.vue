<template>
	<view class="container" :style="{minHeight:$height()}">
		<u-table align="left" style="padding-bottom:150px;">
			<u-tr>
				<u-th style="width:30%">主题</u-th>
				<u-td style="width:70%">{{detail.subject}}</u-td>

			</u-tr>
			<u-tr>
				<u-th style="width:30%">发送人</u-th>
				<u-td style="width:70%">{{detail.createUserName}}</u-td>
			</u-tr>
			<u-tr>
				<u-th style="width:30%">发送时间</u-th>
				<u-td style="width:70%">{{detail.createTime}}</u-td>
			</u-tr>
			<u-tr>
				<u-th style="width:100%">内容</u-th>
			</u-tr>
			<u-tr>
				<u-td style="width:100%">{{detail.content}}</u-td>
			</u-tr>
			<u-tr>
				<u-th style="width:100%">查收情况</u-th>
			</u-tr>

			<u-tr>
				<u-th style="width:30%">姓名</u-th>
				<u-th style="width:20%">是否已读</u-th>
				<u-th style="width:50%">阅读时间</u-th>
			</u-tr>
			<u-tr v-for="(item,index) in detail.receiveInfoList" :key="index">
				<u-td style="width:30%">{{item.receiveUserName}}</u-td>
				<u-td style="width:20%">{{item.read ? "已读" : "未读"}}</u-td>
				<u-td style="width:50%">{{item.updateTime||''}}</u-td>
			</u-tr>

		</u-table>
		<u-button @click="send" :customStyle="{width:'80%',position:'fixed',right:'10%',bottom:'30px',zIndex:'999'}"
			type="primary" text="回复"></u-button>

		<u-popup :show="show" mode="center" :round="5" @close="close" @open="open" :closeable="true"
			:customStyle="{width:'90%'}">
			<view style="padding:40rpx;">
				<u-form labelPosition="top" labelWidth="100" ref="uForm">
					<u-form-item label="主题" borderBottom border :required="true">
						<u-input v-model="formData.subject" placeholder="请填写主题" border="none"></u-input>
					</u-form-item>
					<u-form-item label="正文" border style="margin-bottom:30%;">
						<u-textarea v-model="formData.content" placeholder="请输入正文"></u-textarea>
					</u-form-item>
					<u-form-item label="接收人" border style="margin-bottom:30%;">
						<u-checkbox-group v-model="formData.receiverIdList" placement="row">
							<u-checkbox :customStyle="{marginBottom: '8px',marginRight: '8px'}" v-for="(item, index) in formData.receiverIdList" :key="index"
								:label="userList[item]" :name="item">
							</u-checkbox>
						</u-checkbox-group>
					</u-form-item>
					<u-button @click="$next(`/pages/mine/userList`)" :customStyle="{width:'20%',marginLeft:'0px'}" type="primary" size="mini" text="选择人员"></u-button>
				</u-form>
				<u-button @click="submit" :customStyle="{width:'20%',marginRight:'10px'}" type="primary" text="发送"></u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				detail: {},
				show: false,
				userList:{},
				formData: {
					receiverIdList:[],
					category:"BIZ"
				}
			}
		},
		onLoad(options) {
			this.id = options.id
			
			uni.$on('choose', (val) => {
				if (val) {
					console.log(this.formData.receiverIdList)
					let userIds = this.formData.receiverIdList.length == 0 ? val : this.formData.receiverIdList.concat(val)
					this.formData.receiverIdList = Array.from(new Set(userIds))
				}
			})
			this.getMessageDetail()
			this.getUserList()
		},
		onShow() {
			
		},
		
		methods: {
			getUserList(){
				this.$axios.request(this.$api.getUserList,"GET").then((val) => {
					let obj = {}
					val.data.forEach((item,index) => {
						obj[item.id] = item.account
					})
					this.userList = obj
				})
			},
			submit(){
				this.$axios.request(this.$api.sendMessage,"POST",this.formData).then((val) => {
					this.$msg.toastCallback("发送成功",() => {
						uni.reLaunch({
							url:`/pages/mine/execptRecordsList`
						})
					})
				})
			},
			send() {
				this.show = true
			},
			getMessageDetail() {
				this.$axios.request(this.$api.getMessageDetail, "GET", {
					id: this.id
				}).then((val) => {
					this.detail = val.data
					val.data.receiveInfoList.forEach((item,index) => {
						this.formData.receiverIdList.push(item.receiveUserId)
					})
				})
			},
			open() {
				console.log('open');
			},
			close() {
				this.show = false
				console.log('close');
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 3%;
	}
	
	.u-checkbox-group{
		flex-wrap: wrap;
	}
</style>