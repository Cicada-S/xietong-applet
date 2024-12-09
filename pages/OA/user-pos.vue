<template>
	<uni-popup ref="popRef" type="bottom" background-color="transparent" maskBackgroundColor="rgba(0, 0, 0, 0.6)">
		<view class="container">
			<view class="action">
				<view class="cal" @click="cancel"> 取消 </view>
				<view class="conf" @click="confirm"> 确定 </view>
			</view>
			<picker-view class="picker-view" v-if="picVisRef" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
				<picker-view-column>
					<view class="item" v-for="(item,index) in userPosList" :key="index">{{item.positionName}}</view>
				</picker-view-column>
			</picker-view>
		</view>
	</uni-popup>
</template>
<script>
	import { ref } from "vue"
	export default{
		data() {
			return{
				userPosList:[],
				curPosIndex:0,
				value:[0],
				picVisRef:null,
				indicatorStyle:'height: 100rpx;',
				popRef:null,
				subFormRef:null,
			}
		},
		methods:{
			bindChange(e) {
				this.curPosIndex = e.detail.value[0]
			},
			open(subForm, userPosData){
				this.subFormRef = subForm
				this.userPosList = userPosData
				// 开启picker
				this.$refs.picVisRef = true
				// 打开pop
				this.$refs.popRef.open()
			},
			cancel() {
				this.$refs.popRef.close()
			},
			confirm() {
				this.$emit(
					'confirm',
					{subForm: this.subFormRef, posInfo: this.userPosList[this.curPosIndex] },
					() => {
						// 关闭pop
						this.$refs.popRef.close()
						// 销毁picker
						this.picVisRef = false
					}
				)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.container {
		margin: 10rpx;
		border-radius: 10rpx;
		box-sizing: border-box;
		padding: 15rpx;
		background-color: white;

		.action {
			display: flex;
			justify-content: space-between;
			margin: 20rpx;
			font-size: 30rpx;

			.cal {
				color: #6a6a6a;
				font-weight: bold;
			}

			.conf {
				color: #5677fc;
				font-weight: bold;
			}
		}

		.picker-view {
			height: 400rpx;
			margin-top: 20rpx;

			.item {
				line-height: 100rpx;
				text-align: center;
			}
		}
	}
</style>