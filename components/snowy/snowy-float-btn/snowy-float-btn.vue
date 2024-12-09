<template>
	<view class="floating-button" @click="handleButtonClick">
		<slot>
			<uni-icons type="plusempty" color="#ffffff" :size="20"></uni-icons>
		</slot>
	</view>
</template>
<script setup>
	const emits = defineEmits(['click'])
	const handleButtonClick = () => {
		emits('click');
	}
</script>
<style lang="scss" scoped>
	.floating-button {
		position: fixed;
		bottom: 20px;
		right: 20px;
		width: 50px;
		height: 50px;
		background-color: #5677fc;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
		transition: background-color 0.3s, transform 0.3s;
		cursor: pointer;
	}

	.floating-button:hover {
		background-color: #2979ff;
		transform: scale(1.1);
	}
</style>