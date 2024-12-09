<template>
	<view>
		<!-- <image v-if="stateCode === 'ACTIVE'" :src="$store.getters.allEnv[$store.getters.envKey].baseUrl + prefixUrl('/mobile/') + 'flw/ACTIVE.png'" class="state-img" mode="aspectFill" />
		<image v-if="stateCode === 'SUSPENDED'" :src="$store.getters.allEnv[$store.getters.envKey].baseUrl + prefixUrl('/mobile/') +'flw/SUSPENDED.png'" class="state-img" mode="aspectFill" />
		<image v-if="stateCode === 'COMPLETED'" :src="$store.getters.allEnv[$store.getters.envKey].baseUrl + prefixUrl('/mobile/') +'flw/COMPLETED.png'" class="state-img" mode="aspectFill" />
		<image v-if="stateCode === 'END'" :src="$store.getters.allEnv[$store.getters.envKey].baseUrl + prefixUrl('/mobile/') +'flw/END.png'" class="state-img" mode="aspectFill" />
		<image v-if="stateCode === 'REVOKE'" :src="$store.getters.allEnv[$store.getters.envKey].baseUrl + prefixUrl('/mobile/') +'flw/REVOKE.png'" class="state-img" mode="aspectFill" />
		<image v-if="stateCode === 'REJECT'" :src="$store.getters.allEnv[$store.getters.envKey].baseUrl + prefixUrl('/mobile/') +'flw/REJECT.png'" class="state-img" mode="aspectFill" /> -->
	</view>
	
</template>
<script>
	import { prefixUrl } from "@/util/api-adaptive"
	export default{
		props:{
			stateCode: {
				type: String,
				default: ''
			}
		}
	}
</script>
<style lang="scss" scoped>
	.state-img {
		position: absolute;
		z-index: 10;
		right: 30rpx;
		opacity: 0.7;
		width: 150rpx;
		height: 150rpx;
	}
</style>