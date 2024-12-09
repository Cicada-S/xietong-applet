<template>
	<view class="container-icon" :style="{ backgroundColor: backgroundColor }">
		<uni-icons 
			:backgroundColor="backgroundColor" 
			:customPrefix="customPrefix" 
			:type="type" 
			:size="size" 
			:color="color">
		</uni-icons>
	</view>
</template>

<script setup>
	export default {
		props:{
			backgroundColor: {
				type: String,
				required: false
			},
			customPrefix: {
				type: String,
				required: false
			},
			type: {
				type: String,
				required: false
			}, 
			size: {
				type: String, 
				required: false
			},
			color: { 
				type: String,
				required: false
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container-icon {
		width: 80rpx;
		height: 80rpx;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 1upx 4upx 5upx rgba(72, 22, 174, 0.3);
	}
</style>
