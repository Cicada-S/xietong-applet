<template>
	<view class="container" :style="{minHeight:$height()}">
		<view class="box">
			<u-form labelPosition="right" labelWidth="100" ref="uForm">
				<u-form-item label="编码" borderBottom border>
					<u-input v-model="formData.code" placeholder="不填由系统自动带出" border="none"></u-input>
				</u-form-item>
				<u-form-item label="产品名称" borderBottom border :required="true">
					<u-input v-model="formData.name" placeholder="请填写产品名称" border="none"></u-input>
				</u-form-item>
				<u-form-item label="产品类型" borderBottom border :required="true">
					<u-input v-model="formData.proTypeName" readonly placeholder="请选择" border="none">
						<template slot="suffix">
							<u-icon name="search" @click="() => this.$refs.tree._show()" color="#eaeaea" size="24"></u-icon>
						</template>
					</u-input>
				</u-form-item>
				<u-form-item label="往来单位" borderBottom border>
					<u-input v-model="formData.partnersSortName" readonly placeholder="请选择" border="none">
						<template slot="suffix">
							<u-icon name="search" @click="() => showPartnersSortNameModal = true" color="#eaeaea" size="24"></u-icon>
						</template>
					</u-input>
				</u-form-item>
				<u-form-item label="产品角色" borderBottom border>
					<checkbox-group @change="chekboxChange">
						<checkbox value="0">自制件</checkbox>
						<checkbox value="1">委外件</checkbox>
						<checkbox value="2">外购件</checkbox>
					</checkbox-group>
				</u-form-item>
				<u-form-item label="工艺路线" borderBottom border >
					<u-input v-model="formData.workRoute" readonly placeholder="请选择" border="none">
						<template slot="suffix">
							<u-icon name="search" @click="() => showWorkRouteModal = true" color="#eaeaea" size="24"></u-icon>
						</template>
					</u-input>
				</u-form-item>
				<u-form-item label="计量单位" borderBottom border>
					<u-input v-model="formData.unit" readonly placeholder="请填写计量单位" border="none">
						<template slot="suffix">
							<u-icon name="search" @click="() => showUnitModal = true" color="#eaeaea" size="24"></u-icon>
						</template>
					</u-input>
				</u-form-item>
				
				<u-form-item label="产品图片" border style="margin-bottom:30%;">
					<upload @upload="upload" :value="formData.reportFile"></upload>
				</u-form-item>
	
				<u-form-item label="备注" border style="margin-bottom:30%;">
					<u-textarea v-model="formData.remark" placeholder="请输入内容"></u-textarea>
				</u-form-item>
			</u-form>
	
		</view>
		<u-button @click="submit" :customStyle="{width:'80%',position:'fixed',left:'10%',bottom:'20px',zIndex:'999'}" type="primary" text="确定"></u-button>
		<tree ref="tree" :range="proTypeTree" rangeKey="name" @confirm="confirmProType" confirmColor="#4e8af7" />
		<u-popup :show="showUnitModal" mode="bottom" @close="() => showUnitModal = false" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto" @scrolltolower="() => this.$refs.unitModalRef.loadMore()">
					<unitModal type="radio" :value="formData.unit" ref="unitModalRef"></unitModal>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :customStyle="{width:'100%'}" @click="chooseUnit" text="确认" ></u-button>
			</view>
		</u-popup>
		
		<u-popup :show="showWorkRouteModal" mode="bottom" @close="() => showWorkRouteModal = false" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto" @scrolltolower="() => this.$refs.workRouteModalRef.loadMore()">
					<workRouteModal type="radio" :value="formData.workRouteId" ref="workRouteModalRef"></workRouteModal>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :customStyle="{width:'100%'}" @click="chooseWorkRoute" text="确认" ></u-button>
			</view>
		</u-popup>
		
		<u-popup :show="showPartnersSortNameModal" mode="bottom" @close="() => showPartnersSortNameModal = false" round="10" :closeable="true">
			<view class="modal-box">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto" @scrolltolower="() => this.$refs.partnersSortNameModalRef.loadMore()">
					<partnersSortNameModal type="radio" :value="formData.partnersSortName" ref="partnersSortNameModalRef"></partnersSortNameModal>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :customStyle="{width:'100%'}" @click="choosePartnersSortName" text="确认" ></u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import tree from "@/components/tree/tree.vue"
	import partnersSortNameModal from "@/components/partnersSortNameModal/partnersSortNameModal.vue"
	import workRouteModal from "@/pages/mes/workRoute/index.vue"
	import unitModal from "@/pages/mes/unit/index.vue"
	export default {
		data() {
			return {
				formData:{},
				selectedOption:[],
				showUnitModal:false,
				showWorkRouteModal:false,
				proTypeTree:[],
				partnersSortNameModal:false
			}
		},
		components: {
			tree,
			partnersSortNameModal,
			unitModal,
			workRouteModal
		},
		onLoad(options) {
			if(!options.result){
				this.formData = Object.assign(this.formData,options)
			}else{
				this.formData = Object.assign(this.formData,this.$utils.decrypt(options.result))
			}
			uni.setNavigationBarTitle({
				title:`${this.formData.id ? '编辑' : '新增'}产品`
			})
			
			this.$axios.request(this.$api.getProTypeTree,"GET").then((val) => {
				this.proTypeTree = val.data
			})
			
		},
		methods: {
			chekboxChange(e) {
			      this.selectedOption = e.detail.value;
				  console.log(this.selectedOption);
			    },
			confirmProType(e){
				let data = e[0]
				this.$set(this.formData,'proTypeId',data.id)
				this.$set(this.formData,'proTypeName',data.name)
			},
			confirmpartnersSort(e){
				let data = e[0]
				this.$set(this.formData,'partnersId',data.id)
				this.$set(this.formData,'partnersName',data.name)
			},
			chooseUnit(){
				if(this.$refs.unitModalRef.selectRows.length > 0){
					let arr = new Array()
					this.$refs.unitModalRef.selectRows.forEach((item,index) => {
						arr.push(item.name)
					})
					this.formData.unit = arr.join(",")
				}else{
					this.formData.unit = ""
				}
				this.showUnitModal = false
			},
			chooseWorkRoute(){
				if(this.$refs.workRouteModalRef.selectRows.length > 0){
					let nameArr = new Array()
					let idArr = new Array()
					this.$refs.workRouteModalRef.selectRows.forEach((item,index) => {
						nameArr.push(item.account)
						idArr.push(item.id)
					})
					this.formData.workRouteName = nameArr.join(",")
					this.formData.workRouteId = idArr.join(",")
				}else{
					this.formData.workRouteName = ""
					this.formData.workRouteId = ""
				}
				this.showWorkRouteModal = false
			},
			choosePartnersSortName(){
				if(this.$refs.partnersSortNameRef.selectRows.length > 0){
					let nameArr = new Array()
					let idArr = new Array()
					this.$refs.partnersSortNameRef.selectRows.forEach((item,index) => {
						nameArr.push(item.account)
						idArr.push(item.id)
					})
					this.formData.partnersName = nameArr.join(",")
					this.formData.partnersCode = idArr.join(",")
				}else{
					this.formData.partnersName = ""
					this.formData.partnersCode = ""
				}
				this.showPartnersSortNameModal = false
			},
			submit(){
				let url = this.$api.addPro
				if(this.formData.id){
					url = this.$api.editPro
				}
				this.$axios.request(url, "POST", this.formData).then((val) => {
					this.$msg.toastCallback("添加成功",() => {
						this.$backRefresh()
					})
				})
			}
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
