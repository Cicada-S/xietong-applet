<template>
	<view class="crumb">
		<view class="text" :class="index === crumbData.length - 1 ? 'other' : 'current'" v-for="(item, index) in crumbData" :key="index" @click="clickCruItem(item, index)">
			{{ item.name + (index === crumbData.length - 1 ? '' : ' | ') }}
		</view>
	</view>
</template>
<script setup>
	const emits = defineEmits(['clickCruItem'])
	const props = defineProps({
		crumbData: {
			type: Array,
			default: () => []
		}
	})
	const clickCruItem = (item, index) => {
		emits('clickCruItem', { item: item, index: index })
	}
</script>

<style lang="scss" scoped>
	.crumb {
		white-space: nowrap;
		overflow-x: scroll;
		padding: 20rpx;
		.text {
			display: inline-block;
			margin-left: 10rpx;
			text-align: center;
		}
		.current {
			color: $snowy-primary;
		}
		.other {
			color: #8799a3;
		}
	}
</style>
