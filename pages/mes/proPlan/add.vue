<template>
	<view class="container" :style="{minHeight:$height()}">
		<view class="box">
			<u-form labelPosition="right" labelWidth="100" ref="uForm">
				<u-form-item label="单据" borderBottom border>
					<u-input v-model="formData.code" placeholder="不填由系统自动带出" border="none"></u-input>
				</u-form-item>
				<u-form-item label="项目编号" borderBottom border :required="true">
					<u-input v-model="formData.projectCode" placeholder="请填写单据" border="none"></u-input>
				</u-form-item>
				
				<u-form-item label="客户" borderBottom border>
					<u-input v-model="cusName" readonly placeholder="请选择客户" border="none">
						<template slot="suffix">
							<u-icon name="search" @click="showcusModal" color="#eaeaea" size="24"></u-icon>
						</template>
					</u-input>
				</u-form-item>

				<u-form-item label="生产计划分类" borderBottom border>
					<u-input v-model="proPlanCategoryName" readonly placeholder="请选择生产计划分类" border="none">
						<template slot="suffix">
							<u-icon name="search" @click="showproPlanCategoryModal" color="#eaeaea" size="24"></u-icon>
						</template>
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
								<u-th style="width:13%">产品名称</u-th>
								<u-th style="width:13%">工单编号</u-th>
								<u-th style="width:13%">计划产量</u-th>
								<u-th style="width:13%">标准小时产量</u-th>
								<u-th style="width:13%">生产批号</u-th>
								<u-th style="width:13%">下单时间</u-th>
								<u-th style="width:13%">交货时间</u-th>
								<u-th style="width:13%">备注</u-th>
						
							</u-tr>
							<u-checkbox-group placement="column" @change="changeCheckBox">
								<u-tr v-for="(item,index) in formData.invDetailList" :key="index">
									<u-td style="width:13%">
										<u-checkbox :name="item.proId" :checked="selectRowKeys.includes(item.proId)" ></u-checkbox>
									</u-td>
									<u-td style="width:13%"><input :disabled="true" v-model="item.proName" type="text"></u-td>
									<u-td style="width:13%"><input :disabled="true" v-model="item.proId" type="text"></u-td>
									<u-td style="width:13%"><input v-model="item.num" type="text"></u-td>
									<u-td style="width:13%"><input v-model="item.hournum" type="text"></u-td>
									<u-td style="width:13%"><input v-model="item.planID" type="text"></u-td>
									<u-td style="width:13%"><input v-model="item.remark" type="text"></u-td>
								</u-tr>
							</u-checkbox-group>
						
						</u-table>
					</view>
				</u-form-item>

				<u-form-item label="备注" border style="margin-bottom:30%;">
					<u-textarea v-model="formData.remark" placeholder="请输入内容"></u-textarea>
				</u-form-item>
			</u-form>

		</view>
		<u-button @click="submit" :customStyle="{width:'80%',position:'fixed',left:'10%',bottom:'20px',zIndex:'999'}"
			type="primary" text="确定"></u-button>
		
		
		
		<u-popup :show="wareHouseShow" mode="bottom" @close="() => wareHouseShow = false" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto">
					<wareHouseModal :value="formData.wareHouseId" @change="changeWareHouse" ref="wareHouseModalRef" type="checkbox"></wareHouseModal>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :customStyle="{width:'80%'}" @click="() => wareHouseShow = false" text="确认" ></u-button>
			</view>
		</u-popup>
		
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
		
		<u-popup :show="proPlanCategoryShow" mode="bottom" @close="() => proPlanCategoryShow = false" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto">
					<proPlanCategoryModal @change="changeproPlanCategory" :value="formData.proPlanCategoryId" ref="proPlanCategoryModalRef" type="checkbox"></proPlanCategoryModal>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :customStyle="{width:'80%'}" @click="() => proPlanCategoryShow = false" text="确认" ></u-button>
			</view>
		</u-popup>
		
		<u-popup :show="cusShow" mode="bottom" @close="() => cusShow = false" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto">
					<cusModal @change="changeCusInfor" :value="formData.cusId" ref="cusModalRef" type="checkbox"></cusModal>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :customStyle="{width:'80%'}" @click="() => cusShow = false" text="确认" ></u-button>
			</view>
		</u-popup>
		
		
		
	</view>
</template>

<script>
	import wareHouseModal from '@/components/wareHouseModal/wareHouseModal.vue'
	import cusModal from '@/pages/crm/cus/cusInfor/index.vue'
	import proPlanCategoryModal from '@/pages/mes/proPlanCategory/index.vue'
	import proListModal from '@/pages/mes/pro/index.vue'
import { nextTick } from "vue"
	export default {
		data() {
			return {
				proPlanCategoryName: '',
				cusShow:false,
				proPlanCategoryShow:false,
				wareHouseName: '',
				selectRowKeys: [],
				wareHouseShow:false,
				showProModal:false,
				invDetailType: [
					'采购入库单明细',
					'退料入库单明细',
					'退货入库单明细',
					'到料入库单明细',
					'调拨入库单明细',
					'完工入库单明细',
					'其它入库单明细',
					'发货出库单明细',
					'退货出库单明细',
					'领料出库单明细',
					'其它出库单明细',
				],
				proList:[],
				formData: {
					invDetailList: []
				},

				time: uni.$u.date(new Date().getTime(), 'yyyy-mm-dd hh:MM')
			}
		},
		components: {
			wareHouseModal,
			proPlanCategoryModal,
			cusModal,
			proListModal
		},
		onLoad(options) {
			if(!options.result){
				this.formData = Object.assign(this.formData,options)
			}else{
				this.formData = Object.assign(this.formData,this.$utils.decrypt(options.result))
				this.proPlanCategoryName = this.formData.proPlanCategoryName
				this.wareHouseName = this.formData.wareHouseName
			}
			uni.setNavigationBarTitle({
				title:`${this.formData.id ? '编辑' : '新增'}生产计划单`
			})
	
		},
		methods: {
			changeproPlanCategory(e) {
				this.formData.proPlanCategoryId = e.id
				this.proPlanCategoryName = e.name
			},
			changeCusInfor(e) {
				this.formData.cusId = e.id
				this.cusName = e.name
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
				this.formData.invDetailList = arr
			},
			del(){
				if(this.selectRowKeys.length == 0){
					this.$msg.toast("请选择")
					return
				}
				this.selectRowKeys.forEach((item,index) => {
					let idx = this.formData.invDetailList.findIndex(pro => {
						if (pro.proId == item) {
							return true;
						}
					})
			
					this.formData.invDetailList.splice(idx,1)
				})
			},
			changeCheckBox(e) {
				this.selectRowKeys = e
			},
			close() {
				this.wareHouseShow = false
			},
			showWareHouse(){
				this.wareHouseShow = true
			},
			showproPlanCategoryModal(){
				this.proPlanCategoryShow = true
			},
			showcusModal(){
				this.cusShow = true
			},
			closeproPlanCategoryModal() {
				this.proPlanCategoryShow = false
			},
			changeWareHouse(e) {
				this.formData.wareHouseId = e.id
				this.wareHouseName = e.name
			},
			submit() {
				let url = this.$api.addInv
				if(this.formData.id){
					url = this.$api.editInv
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