<template>
	<view class="container" :style="{minHeight:$height()}">
		<view class="box">
			<u-form labelPosition="right" labelWidth="100" ref="uForm">
				<u-form-item label="编号" borderBottom border>
					<u-input v-model="formData.code" placeholder="不填由系统自动带出" border="none"></u-input>
				</u-form-item>
				<u-form-item label="项目编号" borderBottom border>
					<u-input v-model="formData.projectCode" placeholder="请填写项目编号" border="none"></u-input>
				</u-form-item>

				<u-form-item label="客户" borderBottom border>
					<u-input v-model="formData.partnersName" readonly placeholder="请选择客户" border="none">
						<template slot="suffix">
							<u-icon name="search"@click="() => showPartnersNameModal = true" color="#eaeaea" size="24"></u-icon>
						</template>
					</u-input>
				</u-form-item>

				<u-form-item label="下单人" borderBottom border>
					<u-input v-model="formData.nextPersonName" readonly placeholder="请选择报工权限" border="none">
						<template slot="suffix">
							<u-icon name="search" @click="() => showUserModal = true" color="#eaeaea" size="24"></u-icon>
						</template>
					</u-input>
				</u-form-item>
				
				<u-form-item label="下单时间" borderBottom border>
					<u-input readonly v-model="formData.orderTime" placeholder="请选择下单时间" border="none">
						<view slot="suffix">
							<u-button type="primary" @click="chooseTime('orderTime')" size="mini" text="请选择"></u-button>
						</view>
					</u-input>
				</u-form-item>
				<u-form-item label="交货时间" borderBottom border>
					<u-input readonly v-model="formData.deliveryTime" placeholder="请选择交货时间" border="none">
						<view slot="suffix">
							<u-button type="primary" @click="chooseTime('deliveryTime')" size="mini" text="请选择"></u-button>
						</view>
					</u-input>
				</u-form-item>
				<u-form-item label="产品清单" borderBottom border :required="true">
					<view class="king-flex king-flex__column">
						<view class="search-item king-flex" style="width:50%;margin:10rpx 0px;">
							<u-button type="primary" size="small" @click="() => showProModal = true" text="新增"></u-button>
							<u-button type="error" size="small" :customStyle="{marginLeft:'10rpx'}" @click="del"
								text="删除"></u-button>
						</view>
						<u-table align="left">
							<u-tr>
								<u-th style="width:13%">选择</u-th>
								<u-th style="width:20%">产品名称</u-th>
								<u-th style="width:20%">单价</u-th>
								<u-th style="width:13%">数量</u-th>
								<u-th style="width:13%">备注</u-th>
						
							</u-tr>
							<u-checkbox-group placement="column" @change="changeCheckBox">
								<u-tr v-for="(item,index) in formData.orderDetailList" :key="index">
									<u-td style="width:13%">
										<u-checkbox :name="item.proName" :checked="selectRowKeys.includes(item.proName)" ></u-checkbox>
									</u-td>
									<u-td style="width:20%"><input :disabled="true" v-model="item.proName" type="text"></u-td>
									<u-td style="width:20%"><input v-model="item.unitPrice" type="text"></u-td>
									<u-td style="width:13%"><input v-model="item.num" type="text"></u-td>
									<u-td style="width:13%"><input v-model="item.remark" type="text"></u-td>
								</u-tr>
							</u-checkbox-group>
						
						</u-table>
					</view>
				</u-form-item>
				<u-form-item label="数量" borderBottom border :required="true">
					<u-input v-model="formData.totalNum" type="number" placeholder="请填写" @change="changetotalNum" border="none"></u-input>
				</u-form-item>
				<u-form-item label="总计" borderBottom border :required="true">
					<u-input v-model="formData.totalPrice" type="znumber" placeholder="请填写" @change="changetotalPrice" border="none"></u-input>
				</u-form-item>
				<u-form-item label="备注" border style="margin-bottom:30%;">
					<u-textarea v-model="formData.remark" placeholder="请输入内容"></u-textarea>
				</u-form-item>
			</u-form>

		</view>
		<u-button @click="submit" :customStyle="{width:'80%',position:'fixed',left:'10%',bottom:'20px',zIndex:'999'}" type="primary" text="确定"></u-button>
		<u-datetime-picker :show="show" v-model="time" mode="datetime" @close="closeTime" @confirm="confirmTime"></u-datetime-picker>
		
		<u-popup :show="showProModal" mode="bottom" @close="() => showProModal = false" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto" @scrolltolower="() => this.$refs.proList.loadMore()">
					<proListModal ref="proList" type="checkbox"></proListModal>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :customStyle="{width:'80%'}" @click="choosePro" text="确认" ></u-button>
			</view>
		</u-popup>
		<u-popup :show="showPartnersNameModal" mode="bottom" @close="() => showPartnersNameModal = false" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto" @scrolltolower="() => this.$refs.partnersNameModalRef.loadMore()">
					<partnersNameModal type="checkbox" ref="partnersNameModalRef"></partnersNameModal>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :customStyle="{width:'80%'}" @click="choosePartnersName" text="确认" ></u-button>
			</view>
		</u-popup>
		<u-popup :show="showUserModal" mode="bottom" @close="() => showUserModal = false" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto" @scrolltolower="() => this.$refs.nextPersonNameRef.loadMore()">
					<userModal type="checkbox" :value="formData.nextPersonName" ref="nextPersonNameRef"></userModal>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :customStyle="{width:'80%'}" @click="chooseNextPersonName" text="确认" ></u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import partnersNameModal from '@/pages/crm/cus/cusInfor/index.vue'
	import proListModal from '@/pages/mes/pro/index.vue'
	import userModal from '@/components/userModal/userModal.vue'
	import { nextTick } from "vue"
	export default {
		data() {
			return {
				
				formData:{
					orderDetailList: []
				},
				type:0,
				id:null,
				proList:[],
				showPartnersNameModal:false,
				selectRowKeys: [],
				showUserModal:false,
				selectedOption: '',
				show: false,
				timeField: "",
				time: uni.$u.date(new Date().getTime(), 'yyyy-mm-dd hh:MM')
				
			}
		},
		components:{
			partnersNameModal,
			userModal,

			proListModal,
		},
		onLoad(options) {
			if (options.id) 
			this.$axios.request(this.$api.getSaleOrderDetailRes,"GET").then((val) => {
				this.dynamicList = val.data
			})
			uni.setNavigationBarTitle({
				title:`${this.id ? '编辑' : '新增'}${this.type}`
			})
	
		},
		methods: {
			setNavigationTitle() {
			      let title = '';
			      if (this.type === 0) {
			        title = `${this.id? '编辑' : '新增'}销售订单`;
			      } else if (this.type === 1) {
			        title = `${this.id? '编辑' : '新增'}采购订单`;
			      }
			      uni.setNavigationBarTitle({
			        title
			      });
			    },
			radioChange(e) {
			      this.selectedOption = e.detail.value;
			      console.log(this.selectedOption);
			    },
				submit() {
					let url = this.$api.addSaleOrderDetail
					if(this.formData.id){
						url = this.$api.editSaleOrderDetail
					}
					this.$axios.request(url, "POST", this.formData).then((val) => {
						this.$msg.toastCallback("添加成功",() => {
							uni.$emit('refresh')
							this.$nextTick(() => {
								uni.navigateBack()
							})
						})
					})
				},
			load(){
				this.$axios.request(this.$api.getWorkOrder,"GET",{
					id:this.formData.workOrderId
				}).then((val) => {
					let params = {
						goodNum: 0,
						reportNum: 0,
						badNum: 0
					}
			this.formData = Object.assign(params,{
				workOrderId:val.data.id,
				proId:val.data.proId,
				proPlanCode:val.data.proPlanCode,
				proName:val.data.proName,
				proCode:val.data.proCode,
				proImage:val.data.proImage,
				workRouteName:val.data.workRouteName,
				orderTime:uni.$u.date(new Date().getTime(), 'yyyy-mm-dd 08:30:00'),
				deliveryTime:uni.$u.date(new Date().getTime(), 'yyyy-mm-dd 17:30:00')
			})
					this.sumWorkTime()
					this.listByWorkOrderIdOrAllStep(val.data.id)
				})
			},
			chooseTime(field) {
				this.timeField = field
				this.show = true
			},
			closeTime() {
				this.show = false
			},
			confirmTime(e) {
				this.show = false
				this.$set(this.formData, this.timeField, uni.$u.date(e.value, 'yyyy-mm-dd hh:MM:ss'))
				this.sumWorkTime()
			},
			sumWorkTime(){
				if (this.formData.orderTime && this.formData.deliveryTime) {
					let start = new Date(this.formData.orderTime).getTime()
					let end = new Date(this.formData.deliveryTime).getTime()
					this.formData.workTime = Math.floor((end - start) / 60000)
				}
			},
	choosePro(){
		this.showProModal = false
		let arr = new Array()
		this.$refs.proList.selectRows.forEach((item,index) => {
			arr.push({
				proName:item.name,
				proId:item.id,
				num:1,
				remark:""
			})
		})
		this.formData.orderDetailList = arr
	},
	del(){
		if(this.selectRowKeys.length == 0){
			this.$msg.toast("请选择")
			return
		}
		this.selectRowKeys.forEach((item,index) => {
			let idx = this.formData.orderDetailList.findIndex(pro => {
				if (pro.proId == item) {
					return true;
				}
			})
	
			this.formData.orderDetailList.splice(idx,1)
		})
	},
	changeCheckBox(e) {
		this.selectRowKeys = e
	},
			choosePartnersName(){
				if(this.$refs.partnersNameModalRef.selectRows.length > 0){
					let arr = new Array()
					this.$refs.partnersNameModalRef.selectRows.forEach((item,index) => {
						arr.push(item.name)
					})
					this.formData.partnersName = arr.join(",")
				}else{
					this.formData.partnersName = ""
				}
				this.showPartnersNameModal = false
			},
			chooseNextPersonName(){
				if(this.$refs.nextPersonNameRef.selectRows.length > 0){
					let nameArr = new Array()
					let idArr = new Array()
					this.$refs.nextPersonNameRef.selectRows.forEach((item,index) => {
						nameArr.push(item.account)
						idArr.push(item.id)
					})
					this.formData.nextPersonName = nameArr.join(",")
					this.formData.nextPerson = idArr.join(",")
				}else{
					this.formData.nextPersonName = ""
					this.formData.nextPerson = ""
				}
				this.showUserModal = false
			},

		},
		mounted() {
		  this.setNavigationTitle();
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		padding: 20px;
		padding-bottom: 100px;
	}

	.submit {
		.u-button {
			margin-top: 20px;
		}
	}
</style>
