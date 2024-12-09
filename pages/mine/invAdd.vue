<template>
	<view class="container" :style="{minHeight:$height()}">
		<view class="box">
			<u-form labelPosition="right" labelWidth="100" ref="uForm">
				<u-form-item label="单据" borderBottom border>
					<u-input v-model="formData.code" placeholder="不填由系统自动带出" border="none"></u-input>
				</u-form-item>
				<u-form-item label="来源编号" borderBottom border :required="true">
					<u-input v-model="formData.resourceId" placeholder="请填写单据" border="none"></u-input>
				</u-form-item>

				<u-form-item label="工序" borderBottom border>
					<u-input v-model="workStepName" readonly placeholder="请选择工序" border="none">
						<template slot="suffix">
							<u-icon name="search" @click="showStepModal" color="#eaeaea" size="24"></u-icon>
						</template>
					</u-input>
				</u-form-item>

				<u-form-item label="仓库" borderBottom border :required="true">
					<u-input v-model="wareHouseName" readonly placeholder="请选择仓库" border="none">
						<template slot="suffix">
							<u-icon name="search" color="#eaeaea"  @click="showWareHouse" size="24"></u-icon>
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
								<u-th style="width:61%">产品名称</u-th>
								<u-th style="width:13%">数量</u-th>
								<u-th style="width:13%">备注</u-th>
						
							</u-tr>
							<u-checkbox-group placement="column" @change="changeCheckBox">
								<u-tr v-for="(item,index) in formData.invDetailList" :key="index">
									<u-td style="width:13%">
										<u-checkbox :name="item.proId" :checked="selectRowKeys.includes(item.proId)" ></u-checkbox>
									</u-td>
									<u-td style="width:61%"><input :disabled="true" v-model="item.proName" type="text"></u-td>
									<u-td style="width:13%"><input v-model="item.num" type="text"></u-td>
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
		
		<u-popup :show="stepShow" mode="bottom" @close="() => stepShow = false" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto">
					<stepModal @change="changeWorkStep" :value="formData.workStepId" ref="stepModalRef" type="checkbox"></stepModal>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :customStyle="{width:'80%'}" @click="() => stepShow = false" text="确认" ></u-button>
			</view>
		</u-popup>
		
		
		
	</view>
</template>

<script>
	import wareHouseModal from '@/components/wareHouseModal/wareHouseModal.vue'
	import stepModal from '@/components/stepModal/stepModal.vue'
	import proListModal from '@/pages/mes/pro/index.vue'
import { nextTick } from "vue"
	export default {
		data() {
			return {
				workStepName: '',
				stepShow:false,
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
			stepModal,
			proListModal
		},
		onLoad(options) {
			if(!options.result){
				this.formData = Object.assign(this.formData,options)
			}else{
				this.formData = Object.assign(this.formData,this.$utils.decrypt(options.result))
				this.workStepName = this.formData.workStepName
				this.wareHouseName = this.formData.wareHouseName
			}
			uni.setNavigationBarTitle({
				title:`${this.formData.id ? '编辑' : '新增'}${this.invDetailType[this.formData.actType]}`
			})
	
		},
		methods: {
			changeWorkStep(e) {
				this.formData.workStepId = e.id
				this.workStepName = e.name
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
			showStepModal(){
				this.stepShow = true
			},
			closeStepModal() {
				this.stepShow = false
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