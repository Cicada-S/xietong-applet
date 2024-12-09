<template>
	<tui-bottom-popup backgroundColor="transparent" :show="show" @close="close">
		<view class="snowy-shadow" v-if="show" style="margin-top: 10rpx;">
			<view class="snowy-flex-end">
				<icon type="clear" :size="20" color="#5677fc" @click="close"></icon>
			</view>
			<video class="video" :src="getSec" :autoplay="autoplay"></video>
		</view>
	</tui-bottom-popup>
</template>
<script>
	export default {
		props:{
			src: {
				type: String,
				default: ''
			},
			autoplay: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return{
				videoSrc:'',
				show:false,
				
			}
		},
		computed:{  
		    getSec(){   
		        return this.src || this.videoSrc
		    } 
		},
		methods:{
			open(url) {
				this.videoSrc = url
				this.show = true
			},
			close() {
				this.show = false
			}
		}
		
	}
</script>
<style scoped lang="scss">
	.video {
		width: 100vw;
	}
</style>