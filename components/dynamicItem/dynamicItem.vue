<template>
	<view>
		<u-form-item :label="item.label" borderBottom border :required="item.required == 0 ? false : true" v-for="(item,index) in list" :key="index">
			<view v-if="item.type == 'input'" style="width:100%;">
				<u-input v-model="extJson[item.name]" :placeholder="item.placeholder" border="none"></u-input>
			</view>
			<view v-if="item.type == 'pageSelect'"  style="width:100%;">
				<u-input v-model="extJson[item.name]" readonly :placeholder="item.placeholder" border="none">
					<view slot="suffix">
						<u-button type="primary" size="mini" text="请选择" @click="openModal(item)"></u-button>
					</view>
				</u-input>
			</view>
			<view v-if="item.type == 'select' && item.selectOptionType == 'DICT'"  style="width:100%;">
				<picker mode="selector" :range="$utils.dictList(item.dictTypeCode)" range-key="label" @change="changeSelect($event,item.name,$utils.dictList(item.dictTypeCode))">
					<u-input v-model="extJson[item.name]" readonly :placeholder="item.placeholder" border="none">
						<view slot="suffix">
							<u-button type="primary" size="mini" text="请选择"></u-button>
						</view>
					</u-input>
				</picker>
				
			</view>
		
		</u-form-item>
		
		
		<u-popup :show="show" mode="bottom" @close="() => show = false" round="10" :closeable="true">
			<view class="modal-box" style="width:90%;margin-left:5%;">
				<scroll-view class="scroll" style="height:100%;" scroll-y="auto" @scrolltolower="() => loadMore()">
					<view v-if="curItem.isMultiple == 0">
						<u-radio-group placement="column" iconPlacement="right" v-model="result">
							<u-radio v-for="(item,index) in dataList" :key="index" :customStyle="{marginBottom: '8px'}" :label="`${item.name}`" :name="item.name">
							</u-radio>
						</u-radio-group>
					</view>
					<view v-if="curItem.isMultiple == 1">
						<u-checkbox-group placement="column" iconPlacement="right" v-model="result">
							<u-checkbox v-for="(item,index) in dataList" :key="index" :customStyle="{marginBottom: '8px'}" :label="`${item.name}`" :name="item.name">
							</u-checkbox>
						</u-checkbox-group>
					</view>
					<u-empty v-if="dataList.length == 0" :icon="$utils.imagePath('/assets/img/data.png')" mode="data"></u-empty>
				</scroll-view>
			</view>
			<view class="king-align__center modal-buttom">
				<u-button type="primary" :customStyle="{width:'80%'}" @click="choose" text="确认" ></u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name:"dynamicItem",
		data() {
			return {
				list:[],
				result:"",
				dataList:[],
				curItem:{},
				page: 1,
				show:false,
				extJson:{
					
				}
			};
		},
		props: {
			value: {
				type: String,
				default: "{}"
			},
			//关联值
			association:{
				type: String,
				default: ""
			},
			dynamicList:{
				type: Array,
				default:[]
			}
		},
		mounted() {
			this.list = this.dynamicList
			this.extJson = JSON.parse(this.value || "{}")
		},
		watch:{
			dynamicList(e){
				this.list = e
			}
		},
		created() {
			
		},
		methods:{
			changeSelect(obj,field,list){
				this.$set(this.extJson,field,list[obj.detail.value].value)
			},
			openModal(item){
				this.curItem = item
				this.result = ""
				this.page = 1
				this.show = true
				this.getListRes()
				
				
			},
			openModalTree(item){
				this.curItem = item
				this.result = ""
				this.page = 1
				this.getListRes()
				this.$refs.tree._show()
				
				
			},
			
			//上拉加载
			loadMore() {
				if (this.page == 1) {
					return
				}
				if (this.more == 'loadmore') {
					this.getListRes()
				}
			},
			
			choose(){
				this.$set(this.extJson,this.curItem.name,this.result)
				this.show = false
			},
			confirmTree(e){
				if(e.length > 0){
					let arr = new Array()
					e.forEach((item,index) => {
						arr.push(item.name)
					})
					this.$set(this.extJson,this.curItem.name,arr.join(","))
				}else{
					this.$set(this.extJson,this.curItem.name,"")
				}
			},
			getListRes(){
				let url = this.curItem.selOptionApiUrl.replace("/api/","/")
				this.more = 'loading'
				let params = {
					current: this.page,
					size: 50,
					sortField: "id",
					sortOrder: "descend"
				}
				
				this.$axios.request(url, "GET", params).then((val) => {
					uni.stopPullDownRefresh();
					this.dataList = this.page == 1 ? val.data.records : this.dataList.concat(val.data.records)
					if (this.page / 1 < val.data.total / 50) {
						this.more = 'loadmore';
						this.page++
					} else {
						this.more = 'nomore';
					}
					
				
				})
			}
		}
	}
</script>

<style lang="scss">

</style>